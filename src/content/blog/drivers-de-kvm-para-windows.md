---
title: Guía instalar los Drivers de KVM en Máquinas Virtuales Windows
date: 2012-02-29
description: Aprende cómo instalar y utilizar los drivers de KVM para mejorar el rendimiento de máquinas virtuales Windows, con una guía detallada y enlaces útiles.
author: Francisco Javier Félix Belmonte
image: 'drivers-de-kvm-para-windows'
category: 'blog'
tags: [kvm, windows, maquinas virtuales]
isDraft: false
---

Una vez que tengamos nuestro Windows virtualizado con **KVM**, necesitamos descargar los drivers desde:

👉 [http://alt.fedoraproject.org/pub/alt/virtio-win/latest/images/bin/](http://alt.fedoraproject.org/pub/alt/virtio-win/latest/images/bin/)

Estos drivers mejoran el rendimiento. El único problema es que para las versiones anteriores a **Windows XP** no hay soporte.

La siguiente tabla muestra los diferentes controladores disponibles para cada versión de Windows:

| Versión    | Descripción                                           |
|------------|-------------------------------------------------------|
| Wxp        | Controlador de disco para Windows XP 32bits           |
| Wnet       | Controlador de disco para Win2003                     |
| Wlh        | Controlador de disco para Win2008                     |
| Win7       | Controlador de disco y RED para Windows 7             |
| Win8       | Controlador de disco y RED para Windows 8             |
| XP         | Controlador de RED para Windows XP                    |
| Vista      | Controlador de RED para Windows Vista/2008            |
