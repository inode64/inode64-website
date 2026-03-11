---
title: "Nuevo proyecto en GitHub: kernel-config para optimizar y configurar el kernel Linux"
date: 2026-03-11
description: Publicamos kernel-config, un script en Bash para depurar, ajustar y mantener de forma reproducible la configuración de kernels Linux personalizados.
author: Francisco Javier Félix Belmonte
image: "kernel-config"
category: "blog"
tags: [Linux, kernel, Gentoo, GitHub, Bash, optimización]
isDraft: false
---

En _inode64_ hemos publicado un nuevo proyecto en GitHub: [**kernel-config**](https://github.com/inode64/kernel-config), una herramienta pensada para simplificar la **optimización y configuración del kernel de Linux** cuando ya partimos de un `.config` existente.

El objetivo no es generar un kernel desde cero, sino ofrecer una forma **pragmática y repetible** de limpiar opciones que no aportan valor en un sistema concreto y ajustar parámetros habituales según el tipo de máquina o carga de trabajo.

## ¿Qué hace `kernel-config`?

El proyecto se distribuye como un script Bash, `kernel-config.sh`, que trabaja sobre un árbol de fuentes del kernel ya preparado y sobre un fichero `.config` editable. A partir de ahí puede:

- eliminar opciones de depuración, trazas, selftests, soporte legacy o subsistemas no utilizados
- ajustar perfiles orientados a **servidor**, **escritorio** o **tiempo real**
- conservar solo el soporte de CPU, GPU, firmware o plataforma que realmente necesitamos
- activar características del kernel que suelen requerir aplicaciones concretas como Docker, QEMU, Samba, NFS, WireGuard u Open vSwitch
- autodetectar rasgos del host como proveedor de CPU, UEFI, TPM, NUMA, IOMMU o número de CPUs visibles

Como paso final, la herramienta ejecuta `make olddefconfig`, lo que ayuda a **normalizar dependencias** y dejar la configuración lista para revisión y compilación.

## Por qué nos parece útil

En entornos Linux donde se compilan kernels personalizados, la configuración tiende a crecer con el tiempo: quedan opciones antiguas, controladores que ya no se usan y símbolos habilitados "por si acaso". Eso complica el mantenimiento y hace más difícil repetir una configuración afinada en otro equipo.

`kernel-config` nace precisamente para reducir ese ruido y convertir ese ajuste manual en un proceso más consistente. Es especialmente interesante para:

- servidores con perfiles de hardware bien definidos
- equipos Gentoo o similares donde el kernel forma parte del mantenimiento habitual
- hosts de virtualización o sistemas con necesidades muy concretas de red, almacenamiento o seguridad

## Ejemplo de uso

Un ejemplo sencillo sería:

```bash
./kernel-config.sh --kernel-srcdir /usr/src/linux --optimization-profile server
```

O bien combinar perfiles y autodetección:

```bash
APPLICATIONS="docker,wireguard,qemu" \
IOMMU_SUPPORT=auto \
NR_CPUS=auto \
./kernel-config.sh /usr/src/linux
```

El script crea además una copia de seguridad con marca temporal del `.config` anterior, de forma que sea fácil comparar los cambios antes de compilar.

## Proyecto abierto y en evolución

El repositorio, creado públicamente el **10 de marzo de 2026**, está licenciado bajo **AGPL-3.0** y ya incluye documentación de uso, parámetros soportados y ejemplos reales de ejecución. La intención es seguir ampliándolo con más perfiles, detecciones y ajustes útiles para distintos escenarios Linux.

Si trabajas habitualmente con kernels personalizados y quieres echarle un vistazo, el proyecto está disponible aquí:

<https://github.com/inode64/kernel-config>
