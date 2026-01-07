---
title: Requerir contraseña para apagar o reiniciar el equipo en Gentoo
date: 2010-06-27
description: Aprende cómo configurar Gentoo para requerir la contraseña de administrador al apagar o reiniciar el equipo, mejorando la seguridad del sistema.
author: Francisco Javier Félix Belmonte
image: "requerir-contrasena-para-apagar-o-reiniciar-el-equipo-en-gentoo"
category: "blog"
tags: [passwords, gentoo]
isDraft: false
---

En [Gentoo](https://www.gentoo.org), por defecto no está activa la restricción de pedir la contraseña del administrador
para apagar o reiniciar el equipo desde GDM o el escritorio.

---

Para activarlo, simplemente tenemos que editar los siguientes ficheros:

- `/usr/share/polkit-1/actions/org.freedesktop.consolekit.policy`
- `/usr/share/polkit-1/actions/org.freedesktop.devicekit.power.policy`

Y cambiar la línea:

```xml
<allow_active>yes</allow_active>
```

por:

```xml
<allow_active>auth_admin_keep</allow_active>
```
