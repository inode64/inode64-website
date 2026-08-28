---
title: "llama.cpp con ROCm 10 en una Radeon AI PRO R9700: medir antes de tocar"
date: 2026-08-27
description: Cómo migramos nuestro servidor de inferencia local a ROCm 10 en Gentoo, por qué la generación cayó un 30 % (los HIP graphs) y qué sirvió y qué no para recuperar y superar el rendimiento anterior.
author: Francisco Javier Félix Belmonte
image: "llama-cpp-rocm-10-radeon-r9700"
category: "blog"
tags: [Linux, Gentoo, ROCm, AMD, llama.cpp, IA, rendimiento, overlay, llvm 23]
isDraft: false
---

En _inode64_ tenemos un servidor de inferencia local con **llama.cpp** sobre una **Radeon AI PRO R9700** (RDNA4, gfx1201, 32 GB de VRAM) en Gentoo, sirviendo un modelo de 27B parámetros cuantizado a Q6_K (~22 GB) con 98k de contexto. Esta semana lo migramos de ROCm 7.2.4 a **ROCm 10.0.0** con los ebuilds de nuestro [overlay](https://github.com/inode64/inode64-overlay), y la migración vino con sorpresa: la generación de texto cayó un 30 %.

Este artículo cuenta el proceso completo: el benchmark que montamos para no discutir a ciegas, lo que aprendimos sobre los parámetros del servidor, el diagnóstico de la regresión, y una lista, con datos, de todo lo que **no** sirvió. Al final ROCm 10 quedó por delante de 7.2 en todas las métricas.

## Primero, un benchmark reproducible

Antes de tocar nada escribimos un script pequeño en Python, sin dependencias, que ataca el endpoint nativo `/completion` de `llama-server`. La clave es que llama.cpp devuelve en cada respuesta un objeto `timings` con los tokens por segundo medidos por el propio servidor, separando el procesado del prompt de la generación:

```python
data = post_completion(url, {
    "prompt": prompt, "n_predict": 128,
    "temperature": 0,
    "cache_prompt": False,   # sin esto, la KV cache falsea las repeticiones
})
t = data["timings"]
t["prompt_per_second"], t["predicted_per_second"]
```

Cada ejecución corre cinco pruebas (generación greedy, generación con el sampling del chat, una tarea de copia de texto, generación tras un prompt largo, y latencia hasta el primer token por streaming), repite cada una 3 o 5 veces, y **añade una línea con etiqueta a un fichero de texto**. Ese fichero, con 40 ejecuciones al final del día, es lo que permitió comparar y volver atrás sin memoria selectiva.

Dos reglas que aprendimos a golpes: la generación con sampling tiene mucha varianza (la salida cambia en cada run), así que las decisiones se toman con las pruebas deterministas; y **nunca medir con una compilación en paralelo**. Una de nuestras medidas quedó invalidada porque había un `emerge` a 12 hilos de fondo.

## Ronda 1: parámetros del servidor

Con la configuración original (ROCm 7.2.4) ya salieron cosas interesantes barriendo flags de `llama-server`:

| Cambio | Generación (tok/s) | Comentario |
|---|---|---|
| Sin decodificación especulativa | 23,8 | El modelo trae una cabeza MTP; usarla (`--spec-type draft-mtp`) es **+68 %** |
| MTP, draft máximo 2 / 3 / 4 / 6 | 40,1 / 40,1 / 35,6 / 32,3 | Drafts largos se descartan demasiado; 3 es el óptimo |
| `--spec-draft-p-min 0.5` | +5 % con contexto largo | Sin coste |
| `--spec-type draft-mtp,ngram-mod` | copia: 54 → 144 | Dispara las tareas que repiten texto ya presente (reescribir código, citar) sin penalizar el resto |
| KV cache q8_0 | −1 tok/s, −3,3 GB de VRAM | La palanca si falta memoria |
| ubatch 512 / 2048 | igual | |

Un detalle sobre `ngram-mod` que conviene saber al medirlo: guarda memoria entre peticiones, así que un benchmark que repite el mismo prompt lo favorece. Nuestro dato honesto de «copia en frío» es 63 tok/s frente a 54.

## La migración a ROCm 10 en Gentoo

Los paquetes de ROCm usan `SLOT="0/<major.minor>"`, de modo que pasar de 7.2.4 a 10.0.0 es un cambio de subslot en 17 paquetes a la vez, y todos los consumidores instalados (`rocBLAS`, `hipBLAS`, el propio `llama-cpp`) los exigen en el subslot antiguo. El `emerge -uDN world` no consigue planificar esa migración simultánea, descarta `hip` y acaba proponiendo un `hip-7.1.0` del árbol oficial que solo admite LLVM 20; el error de `llvm_slot_20` que se ve es un síntoma, no la causa. `--backtrack=100` no ayuda.

La solución fue pedir la pila entera de golpe, añadiendo los átomos al comando de actualización:

```bash
emerge -vuDN world --complete-graph=y --with-bdeps=y --keep-going \
  =dev-util/hip-10.0.0 =dev-libs/rocr-runtime-10.0.0 =dev-libs/rocm-core-10.0.0 \
  =sci-libs/rocBLAS-10.0.0 =sci-libs/hipBLAS-10.0.0 =sci-libs/rocWMMA-10.0.0 \
  =dev-libs/rocm-opencl-runtime-10.0.0 =dev-util/rocminfo-10.0.0
```

Resuelve limpio con 0 backtracks. Solo falló `llvm-runtimes/openmp-23.1.0`, y por el sandbox: `offload-arch --only=nvptx` intenta escribir el nombre del hilo en `/proc/self/task/*/comm`. Un `package.env` con `SANDBOX_PREDICT="/proc"` para ese paquete lo arregla.

## La regresión: de 40 a 30 tokens por segundo

Con todo instalado, `llama-cpp` recompilado contra ROCm 10 y LLVM 23, el benchmark dio esto:

| | ROCm 7.2.4 (llvm22) | ROCm 10.0.0 (llvm23) |
|---|---------------------|----------------------|
| Generación con sampling | 37,7                | 27,5                 |
| Tras un prompt de 1600 tokens | 46,3 (±0,1)         | 26,9 (±1,9)          |
| Latencia primer token | 0,30 s              | 0,51 s               |
| Copia | 144                 | 232                  |
| Procesado de prompt | 595                 | 615                  |

Dos pistas en esa tabla: la generación token a token era mucho más lenta **e inestable** (±1,9 donde antes había ±0,1), mientras que todo lo que va por lotes (copia, procesado de prompt) iba _mejor_. Eso no es un kernel lento, es latencia entre kernels.

Para descartar que fuese el código de llama.cpp (el rebuild había cogido cuatro commits nuevos), fijamos el commit anterior con `EGIT_OVERRIDE_COMMIT_GGML_ORG_LLAMA_CPP` en un `package.env`: misma regresión. Era el runtime.

La primera variable de entorno que probamos fue la buena:

```bash
GGML_CUDA_DISABLE_GRAPHS=1 llama-server ...
```

Generación de vuelta a 39–41 tok/s, contexto largo a **47,9 (±0,1)** y latencia a 0,32 s. Los **HIP graphs** (`GGML_HIP_GRAPHS`, activados por defecto en llama.cpp) con el runtime de ROCm 10 eran el problema.

### Por qué

El CHANGELOG de CLR que viene en el propio tarball de ROCm 10 lo explica: entre HIP 7.11 y 7.13 (nuevo respecto a 7.2) el runtime estrenó un ejecutor de graphs «segmentado» que reparte los nodos entre **cuatro streams** con sincronización cruzada. Para el grafo lineal de un paso de decodificación eso es puro overhead. CLR expone variables para el motor de graphs, y `DEBUG_HIP_GRAPH_CLASSIC_PATH=1` (forzar la ruta clásica) recupera casi todo, 46,5 tok/s, pero sigue por debajo de simplemente no usar graphs. `DEBUG_HIP_FORCE_GRAPH_QUEUES=1` no cambia nada. En agosto de 2026 no hay issue ni PR en llama.cpp sobre esto, ni una versión de ROCm posterior a 10.0.0.

Lo fijamos como USE flags en el ebuild del overlay en lugar de como variable de entorno: `hip-graphs` (desactivado por defecto) y `vmm` (activado; `GGML_HIP_NO_VMM=OFF` aporta un 1–2 % extra). De paso retiramos el flag `wmma` y la dependencia de `rocWMMA`: la opción `GGML_HIP_ROCWMMA_FATTN` ya no existe en llama.cpp, RDNA3/4 usan WMMA nativo.

## Lo que no sirvió (y por qué era previsible)

La pregunta natural después es «¿y con `-Ofast`, LTO, PGO, Graphite?». Antes de probar, medimos dónde se va el tiempo. Durante la generación un hilo de `llama-server` está al 99 % de CPU; lo muestreamos con `eu-stack` y las seis muestras cayeron dentro de `libhsa-runtime64`/`libamdhip64`, esperando a la GPU, nunca en código de ggml. La GPU, mientras, al 14 % de uso y 66 W de 300 W. La generación está limitada por **ancho de banda de VRAM**: 22 GB de pesos por token a ~640 GB/s son ~29 tok/s de techo sin especulación; sin MTP medimos 23,8, un 82 %. Con ese perfil, nada que aceleres en el host puede moverse.

Los datos lo confirmaron, todo dentro del ruido de medida:

| Prueba | Resultado |
|---|---|
| `-Ofast` (+Graphite, que clang descarta) en llama-cpp | Idéntico a `-O3`; salida greedy byte a byte igual |
| `hip`, `rocr-runtime`, `roct` compilados con `-O3` | Sin efecto |
| LTO / PGO | El código de GPU ya se enlaza con `ld.lld --lto-CGO3`; el host no está en el camino crítico |
| `GGML_CUDA_FORCE_CUBLAS` | Procesado de prompt de 600 a **180** tok/s: los kernels MMQ ganan a rocBLAS de calle en Q6_K |
| `rocm-smi --setperflevel high` | **Peor** (pp 515, copia 184): en RDNA4 «high» fija un perfil que no llega al boost dinámico de `auto` |
| Gobernador de CPU `performance` | Sin efecto |
| `--backend-sampling`, `HIP_FORCE_DEV_KERNARG=1`, `HSA_ENABLE_INTERRUPT=0` | Sin efecto |

La única palanca grande que queda es leer menos bytes por token: Q5_K_M o Q4_K_M darían un 15–35 % más a cambio de calidad.

## Limpiar los ebuilds

ROCm 10 pasó a monorepos (`rocm-systems`, `rocm-libraries`, `llvm-project`) y muchos `sed` de los ebuilds, escritos contra los tarballs antiguos, podían haber dejado de coincidir en silencio (`sed` no falla cuando no encuentra el patrón). Para auditarlos sin fiarnos de la vista: desempaquetar con `ebuild unpack`, md5 de todo el árbol, `ebuild prepare`, y diff de cada fichero modificado contra el tarball original. Un `sed` cuyo fichero destino sale intacto es un no-op, se mire como se mire.

De 16 ebuilds, 8 tenían `sed` muertos. El más serio: en `roct-thunk-interface`, `S` apunta a `projects/rocr-runtime` y los dos `sed` editaban el `CMakeLists.txt` equivocado, con lo que **`libhsakmt` se estaba instalando estática** y con versión 1.0.0 sin que nadie lo notara. Otros eran backports de la API de llvm-22 que ya están en las fuentes, patrones que perdieron un espacio, o rutas que ya no existen. Todo está en el overlay.

## Resultado final

| Tokens/s | ROCm 7.2.4 | ROCm 10 recién migrado | **ROCm 10 final** |
|---|---|---|---|
| Generación greedy | 40,7 | 26,8 | **42,4** |
| Generación con sampling | 37,7 | 27,5 | **43,5** |
| Copia / repetición | 144 | 232 | **228** |
| Tras prompt de 1600 tokens | 46,3 | 26,9 | **48,6** |
| Procesado de prompt | 595 | 615 | **616** |
| Latencia primer token | 0,30 s | 0,51 s | **0,30 s** |

ROCm 10 con `USE=-hip-graphs vmm` y los kernels WMMA nativos queda por delante de 7.2 en todo, con la copia un 58 % más rápida. Y lo que más valor nos deja no es el número, sino el fichero de resultados: la próxima actualización de ROCm o de llama.cpp se juzga en un minuto, con la misma etiqueta y las mismas cinco pruebas, sin discusiones de memoria.
