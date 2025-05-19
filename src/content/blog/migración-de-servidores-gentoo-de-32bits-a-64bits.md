---
title: Migración de Servidores Gentoo de 32Bits a 64Bits
date: 2014-12-05
description: Una guía detallada sobre cómo migrar servidores Gentoo de 32 bits a 64 bits, optimizando el rendimiento y aprovechando al máximo el hardware moderno.
author: Francisco Javier Félix Belmonte
image: "migración-de-servidores-gentoo-de-32bits-a-64bits"
category: "seguridad"
tags: [gentoo, server]
isDraft: false
---

Cuando llevas tiempo administrando servidores Linux te sucede que algunos clientes, por antigüedad, tienen aún una
instalación de 32 bits que no llegó a actualizarse, o se mejoró el hardware con nuevos procesadores con soporte de 64
bits. Para poder gestionar más de tres gigabytes de memoria y mejorar el rendimiento, es necesario actualizarlo a 64
bits para sacar el mayor provecho al hardware.

En el proceso de migración de un sistema **Gentoo** de 32 bits a 64 bits existen varias formas de realizarlo. Nosotros
creamos un _chroot_ con todo el sistema desde cero y luego vamos copiando la configuración. Esto nos permite actualizar
el servidor sin apenas tiempo de desconexión.

### Pasos previos

- Actualizar el portage, emerge e instalar el último _kernel_ estable:

```bash
emerge --sync
emerge -1 portage
emerge gentoo-sources
```

### Creando el compilador de 64 bits (Cross Compiler)

El primer proceso en la migración a 64 bits es la instalación de un compilador que permita generar código para otra
plataforma. Para ello, necesitamos las utilidades de `crossdev`.

```bash
emerge -1 crossdev
mkdir /usr/local/portage
```

Añadimos en `/etc/make.conf` o `/etc/portage/make.conf`:

```bash
PORTDIR_OVERLAY="/usr/local/portage"
```

Y compilamos el compilador y su entorno:

```bash
crossdev -S -s1 --target x86_64-pc-linux-gnu
```

### Compilación del kernel

Compilamos el kernel y lo activamos en nuestro gestor de arranque (**grub** / **lilo**):

```bash
make ARCH=x86_64 oldconfig
make ARCH=x86_64 CROSS_COMPILE=x86_64-pc-linux-gnu-
```

Activamos también "**IA32 Emulation**" y ajustamos los cambios pertinentes del nuevo kernel, udev u otros.

Reiniciamos la máquina y ya tendremos el kernel de 64 bits funcionando con el resto de aplicaciones de 32 bits.

### Entorno chroot 64 bits

Descargamos el [stage3 apropiado](https://distfiles.gentoo.org/releases/amd64/autobuilds/current-stage3/) y creamos un
entorno en `/mnt/64bits`.

Creamos un directorio en `/mnt/64bits` y descomprimimos el stage3 actual. Luego, con `chroot /mnt/64bits`, instalamos
los programas necesarios y copiamos la configuración del sistema actual.

Recordar activar los nuevos valores del sistema en `make.conf`:

```bash
CHOST="x86_64-pc-linux-gnu"
CFLAGS="-O2 -march=native -pipe"
```

```bash
cp /etc/locale.gen /mnt/64bits/etc/
cp /etc/localtime /mnt/64bits/etc/
mount -o bind /dev /mnt/64bits/dev
mount -o bind /proc /mnt/64bits/proc
mount -o bind /sys /mnt/64bits/sys
mount -o bind /usr/portage /mnt/64bits/usr/portage
chroot /mnt/64bits
source /etc/profile
```

Una vez instalados todos los programas requeridos, reiniciamos el equipo y lo arrancamos con un sistema de rescate
como [SystemRescueCD](https://www.sysresccd.org/SystemRescueCd_Homepage).

Movemos los directorios anteriores del sistema a `/mnt/32bits` por si tenemos que realizar una marcha atrás, y movemos
el sistema de 64 bits a su ubicación normal. Luego, con reiniciar, es suficiente para tener todo el sistema a 64 bits
con apenas tiempos de parada.

### Referencias

- [Migration from x86 to x86_64](https://www.odi.ch/weblog/posting.php?posting=572)
- [Notes on an in-place migration from Gentoo/i686 to multilib Gentoo/x86_64](https://www.parp.homeunix.net/articles/migration.html)
