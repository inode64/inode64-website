---
title: Sistemas SBS 2008 y las contraseñas de SQL
date: 2012-01-30
description: Solución al problema de acceso a MSSQL en Small Business Server 2008 tras el cambio o caducidad de la contraseña del administrador.
author: Francisco Javier Félix Belmonte
image: 'sbs-2008-y-las-contrasenas-de-sql'
category: 'blog'
tags: [sbs, sql, passwords]
isDraft: false
---

Cuando instalas un **Small Business Server 2008** de Microsoft con la configuración por defecto, el acceso al **MSSQL** por alguna extraña razón deja de funcionar, bien cuando la contraseña del administrador caduca o es cambiada.

Esto suele ser un problema, porque solo cuando reinicias el servidor y compruebas que no ha arrancado el servidor de SQL —y tampoco en el visor de sucesos muestra un error muy descriptivo— puedes empezar a entender qué sucede y cómo solucionarlo.

Es algo similar a lo que ocurría con **SBS 2000** cuando cambiabas la IP de la interfaz de red: aunque modificabas la IP correctamente, luego había que ir al administrador de SQL y reconfigurarlo con las nuevas IPs.
