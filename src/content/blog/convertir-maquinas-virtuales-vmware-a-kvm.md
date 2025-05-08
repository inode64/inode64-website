---
title: Convertir maquinas virtuales VMware a KVM
date: 2011-11-07
description: Aprende cómo convertir máquinas virtuales de VMware a KVM, solucionando problemas comunes y mejorando el rendimiento con herramientas y pasos detallados.
author: Francisco Javier Félix Belmonte
image: '/images/blog/post/convertir-maquinas-virtuales-vmware-a-kvm.webp'
category: 'blog'
tags: [maquinas virtuales, kvm, vmware]
isDraft: false
---

Cuando se migran máquinas Windows, por alguna razón que desconozco, Windows memoriza con cuál controladora IDE/ATA fue instalado y no permite arrancar en caso de algún cambio de hardware, produciendo el típico pantallazo azul de la muerte. La solución pasa por realizar unos cambios en el registro para aceptar varias controladoras, según la documentación oficial de Microsoft:

👉 [https://support.microsoft.com/kb/324764](https://support.microsoft.com/kb/324764)

O bien usar la utilidad [MergeIDE](https://inode64.com), que automatiza el proceso.

---

### Pasos para la conversión:

1. Desinstalar las VMware Tools.
2. Ejecutar en el disco C: la herramienta **MergeIDE**.
3. Apagar la máquina virtual.
4. Convertir la imagen VMware a formato RAW:

   ```bash
   qemu-img convert -O raw vmware.vmdk qemu.img
   ```

   En caso de estar dividida en partes de 2 GB, antes ejecutar:

   ```bash
   vmware-vdiskmanager -r vmware.vmdk -t 0 vmware-copy.vmdk
   ```

5. Ejecutar la máquina en **KVM** e instalar los drivers **VirtIO** desde:

   👉 [http://alt.fedoraproject.org/pub/alt/virtio-win/latest/images/bin/](http://alt.fedoraproject.org/pub/alt/virtio-win/latest/images/bin/)

   Esto mejorará el rendimiento del sistema virtualizado.