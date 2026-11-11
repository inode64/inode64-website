---
title: "PGO y LTO en PHP 8.4 y 8.5: cuánto rendimiento se gana al compilarlo en Gentoo"
date: 2026-11-11
description: "Medimos 24 compilaciones de PHP 8.4 y 8.5 con GCC y Clang. Los ebuilds de nuestro overlay ganan un 2 % en WordPress, Symfony y Joomla con USE=\"lto pgo\"; con un perfil entrenado con las propias aplicaciones, alrededor del 5 %."
author: Francisco Javier Félix Belmonte
image: "php-pgo-lto-gentoo"
category: "blog"
tags: [PHP, Gentoo, rendimiento, PGO, LTO, overlay, software libre]
isDraft: false
---

En **INODE64 hemos añadido a los ebuilds de PHP 8.4 y 8.5 de nuestro overlay de Gentoo dos flags USE nuevas, `lto` y `pgo`**. Antes de publicarlas quisimos saber cuánto aportan de verdad, así que compilamos 24 variantes de PHP 8.4.27 y 8.5.12 con GCC 16.2 y Clang 23.1 y las medimos con WordPress, Symfony, Joomla, una pequeña aplicación propia y 21 microbenchmarks.

El resumen: la mejora existe y es modesta. Con `USE="lto pgo"`, los ebuilds ganan alrededor de un 6 % en cargas de CPU y un 2 % en aplicaciones web. Entrenando el perfil con las propias aplicaciones se llega a un 5 % en ellas, y eso un ebuild genérico no puede hacerlo. Los ebuilds están en [dev-lang/php de nuestro overlay público](https://github.com/inode64/inode64-overlay/tree/main/dev-lang/php).

## Qué hacen LTO y PGO

- **LTO** (_link-time optimization_) retrasa la optimización hasta el enlazado, cuando el compilador ve el programa entero y puede, por ejemplo, integrar funciones definidas en otro fichero.
- **PGO** (_profile-guided optimization_) compila primero un binario instrumentado, lo ejecuta con una carga de entrenamiento y vuelve a compilar con ese perfil. El código que se ejecutó mucho se optimiza para velocidad y se agrupa; el que no se ejecutó, para tamaño.

## Cómo lo hemos medido

Las pruebas se hicieron en un Ryzen 5 7600X con Gentoo. La referencia de todas las cifras es PHP 8.4.27 compilado con GCC y `-O3 -march=native`, sin LTO ni PGO.

Cada aplicación se mide con `php-cgi -T`, con OPcache activo y sin JIT: WordPress 6.2 y la demo de Symfony del banco de pruebas de php-src, y Joomla 6.2 instalado desde el paquete oficial. Las cargas se agrupan en CPU, memoria (árboles binarios, arrays, cadenas, recolector de basura y objetos) y aplicaciones (las tres anteriores y nuestra mini-app); «global» pondera los tres grupos por igual. El proceso se fija a una CPU, con el gobernador `performance`, y cada sesión repite entre cinco y diez rondas con el orden de las variantes barajado. Las cifras son medias geométricas de la velocidad relativa.

## Lo que dan los ebuilds

Estos son los resultados de una sesión de diez rondas con los ebuilds ya revisados, que son los publicados:

| Compilación | CPU | Memoria | Aplicaciones | Global |
| --- | ---: | ---: | ---: | ---: |
| PHP 8.4, ebuild con `lto pgo` | +5,9 % | +4,2 % | +2,2 % | +4,1 % |
| PHP 8.5, ebuild con `lto pgo` | +6,5 % | +7,3 % | +2,1 % | +5,3 % |
| PHP 8.4, perfil con tests y aplicaciones | +7,4 % | +4,7 % | +5,2 % | +5,7 % |
| PHP 8.5, perfil con tests y aplicaciones | +8,0 % | +7,0 % | +4,4 % | +6,5 % |
| PHP 8.5, ebuild con Clang y ThinLTO | +3,1 % | −5,7 % | +1,9 % | −0,3 % |

Las dos filas centrales no son ebuilds: son el techo que medimos, con un perfil entrenado con la suite de tests de PHP más WordPress, Symfony y Joomla.

Conviene leer la tabla con dos precauciones. La columna de memoria depende mucho de una sola carga de cadenas que oscila entre −14 % y +14 % de un binario de GCC a otro, así que las cifras firmes son las de CPU y aplicaciones. Y recompilar la misma receta con PGO mueve cada carga hasta un 2,5 %, aunque el global de dos compilaciones idénticas coincide (0,0 %, con un intervalo de −0,3 % a +0,3 %).

La ventaja se mantiene con la máquina llena: con doce procesos `php-cgi` a la vez, Symfony sirve en torno a un 2 % más de peticiones por segundo con los ebuilds, lo mismo que con un solo proceso.

LTO por sí solo aporta poco: +1,2 % en aplicaciones y +2,7 % en CPU, a cambio de un binario un 13 % mayor (de 18,67 a 21,10 MiB de código). Con el perfil, lo que el entrenamiento no ejecutó se optimiza para tamaño y el binario vuelve a encogerse: el del ebuild de 8.4 ocupa 18,28 MiB.

## Más tests no dan más velocidad

La hipótesis de partida era que cuantos más tests se usen para entrenar, mejor queda el binario. Compilamos la misma receta con varios entrenamientos distintos:

| Entrenamiento | Duración | CPU | Aplicaciones |
| --- | ---: | ---: | ---: |
| 13 directorios de la suite (11 377 tests) | 101 s | +6,6 % | +2,0 % |
| Suite completa (18 568 tests) | 211 s | +6,8 % | +2,1 % |
| Solo WordPress, Symfony y Joomla | 7 s | +5,9 % | +5,6 % |
| Suite completa y las tres aplicaciones | 214 s | +7,9 % | +5,5 % |

**La hipótesis no se cumple.** La suite completa ejecuta un 63 % más de tests y las aplicaciones quedan igual. La explicación más probable es que los tests añadidos cubren extensiones y casos límite que una aplicación web apenas toca; el código que sí ejecuta (la VM, las tablas hash, las cadenas, OPcache, PDO) ya salía caliente con los 13 directorios.

**Lo que mueve las aplicaciones es entrenar con aplicaciones.** Siete segundos de WordPress, Symfony y Joomla rinden más en ellas que tres minutos y medio de tests. El perfil generaliza: se entrena con páginas distintas de las medidas, y dejando Joomla fuera del entrenamiento Joomla gana igualmente un 3,8 %, frente al 1,4 % de la suite sola. Una aplicación sintética, en cambio, no sirve de sustituta: nuestra mini-app se aceleraba a sí misma un 7,3 % sin trasladar nada a WordPress ni a Joomla.

## La VM, mejor sin perfil

Con GCC, la máquina virtual de PHP (`Zend/zend_execute.c`) es una única función enorme con un salto por opcode. Darle el perfil la empeora: la CPU baja de +7,9 % a +2,8 % y `Zend/bench.php` pasa de +2,8 % a −30,5 %. Creemos que el perfil la reordena según la mezcla de opcodes del entrenamiento y cualquier programa con otra mezcla lo paga. Por eso el ebuild compila la VM a `-O2` y sin perfil, y también fuera de LTO, porque usa variables de registro globales que GCC no admite ahí.

Con JIT el reparto cambia poco en las aplicaciones, porque su tiempo se va en el runtime en C: con el perfil de tests y aplicaciones, PHP 8.5 mantiene +4,4 % en WordPress, +3,6 % en Symfony y +4,0 % en Joomla.

## PHP 8.5 y Clang

PHP 8.5 compilado igual que la referencia queda un 1,0 % por encima en aplicaciones y un 1,6 % en global: una mejora pequeña.

El cambio grande es para Clang. En 8.4, un PHP compilado con Clang quedaba un 15,8 % por debajo del de GCC. PHP 8.5 añade una VM nueva, TAILCALL, en la que cada manejador de opcode es una función que salta a la siguiente con una llamada de cola obligatoria. Con ella Clang iguala a GCC en CPU (+0,0 %) y en aplicaciones (+0,6 %), aunque sigue por debajo en las cargas de memoria (−6,5 %).

Aun así, en el ebuild Clang solo recibe LTO, por tres limitaciones que encontramos:

- **PGO con la suite de tests no funciona.** El runtime de perfiles de LLVM fusiona todos los procesos en un fichero compartido y la suite lanza miles en paralelo: el perfil acaba truncado o corrupto. El ebuild ignora `pgo` con Clang y lo avisa.
- **LTO completo no enlaza en 8.5**; ThinLTO sí, y es lo que usa el ebuild.
- **LTO sin AVX2 nativo rompe el enlazador** de LLVM 23.1.4 en un fichero de mbstring, que el ebuild compila sin LTO.

## Un perfil que se perdía por el camino

El hallazgo más útil no estaba en los flags. El ebuild de Gentoo compila cada SAPI (cli, cgi, fpm…) en su propio árbol, y el Makefile de PHP pasa al compilador rutas absolutas. GCC identifica las funciones `static` por la ruta de su fichero fuente, así que el perfil entrenado en el árbol cli no casaba con ninguna función `static` de los árboles cgi y fpm: justo los binarios que sirven las webs se compilaban, en buena parte, sin perfil.

Se veía en el tamaño del código: `php` tenía 18,02 MiB y `php-cgi` 18,53 MiB, cuando en el resto de variantes `php-cgi` es algo menor. Ahora el ebuild compila con rutas relativas al árbol, se detiene si queda alguna absoluta, y los tres binarios salen parejos: 18,28, 18,24 y 18,37 MiB.

## Cómo activarlo

Con nuestro overlay añadido, basta una línea en `package.use`:

```text
dev-lang/php lto pgo
```

Algunas cosas a tener en cuenta:

- `pgo` necesita GCC, una compilación nativa y la flag `cli`; en 8.4 también `opcache`, que en 8.5 ya forma parte del binario. Entrena con la suite completa de tests, con OPcache y sin JIT; si falla más de un test de cada veinte, avisa y compila sin perfil en lugar de usar uno malo.
- La compilación se alarga: en el 7600X, con doce hilos, el ebuild de 8.4 tardó 9 minutos y 42 segundos, de los que 3 minutos y 28 segundos son el entrenamiento.
- Sin `lto` ni `pgo`, los ebuilds compilan lo mismo que los de Gentoo, con una excepción: `-Ofast` pasa a `-O3` y se filtran `-ffast-math` y `-ffinite-math-only`, que rompen el tratamiento de NaN e Inf en PHP.
- Probamos 13 combinaciones de compilador, LTO, PGO, JIT y OPcache con 18 ejecuciones completas de la suite de PHP, sin fallos nuevos respecto a la compilación sin LTO ni PGO. Todo en amd64 con glibc: no hemos probado musl, otras arquitecturas, Apache, embed ni ZTS.

Los ebuilds son [`php-8.4.27`](https://github.com/inode64/inode64-overlay/blob/e2ed21b2b93a9912527b8ee05f108f1bcdf12c3a/dev-lang/php/php-8.4.27.ebuild) y [`php-8.5.12`](https://github.com/inode64/inode64-overlay/blob/e2ed21b2b93a9912527b8ee05f108f1bcdf12c3a/dev-lang/php/php-8.5.12.ebuild).

## ¿Merece la pena?

Un 2 % en aplicaciones no cambia el dimensionamiento de un servidor, pero cuesta diez minutos de compilación y nada en ejecución. El margen que queda está en el entrenamiento: quien pueda entrenar el perfil con sus propias aplicaciones obtiene más del doble que con cualquier suite de tests, por grande que sea.

Publicamos los ebuilds y estas medidas para que otros administradores de Gentoo puedan revisarlos, repetirlos y aprovecharlos. Puedes seguir su evolución en [nuestro overlay de Gentoo](https://github.com/inode64/inode64-overlay/tree/main/dev-lang/php).
