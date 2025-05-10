---
title: Como montar una imagen KVM con ntfs3g
date: 2011-12-15
description: Aprende cómo montar una imagen de máquina virtual KVM con el sistema de archivos NTFS utilizando la herramienta ntfs-3g, ideal para recuperación de datos y mantenimiento.
author: Francisco Javier Félix Belmonte
image: '/images/blog/post/como-montar-una-imagen-kvm-con-ntfs3g.webp'
category: 'blog'
tags: [kvm, ntfs3g, maquinas virtuales]
isDraft: false
---

Cuando estamos trabajando con máquinas virtuales Windows desde [KVM](http://www.linux-kvm.org/), alguna vez nos vemos en la necesidad de acceder al sistema de archivos dentro de la máquina virtual sin que dicha máquina esté en funcionamiento, para una limpieza de virus, recuperar archivos, etc.

Existe un pequeño truco que es simplemente con la herramienta [ntfs-3g](http://www.ntfs-3g.org/) montar la imagen (porque la imagen incluye la tabla de particiones) a partir del sector donde empieza realmente el sistema de archivos.

```bash
mount -t ntfs-3g -o loop,offset=$((63*512)) <imagen>.img /mnt/winxp
```

Acordaros de tener apagado el sistema de archivos o solo usarlo de lectura porque si está montado y se realizan cambios podría pasar un desastre.
