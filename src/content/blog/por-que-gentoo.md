---
title: ¿Por qué debes elegir Gentoo para tus servidores?
date: 2013-04-26
description: Exploramos las ventajas de usar Gentoo en servidores, destacando su flexibilidad, optimización y control en actualizaciones y dependencias.
author: Francisco Javier Félix Belmonte
image: '/images/blog/post/por-que-gentoo.webp'
category: 'blog'
tags: [gentoo, benchmark]
isDraft: false
---

Nosotros usamos en todos nuestros servidores **Gentoo**, aunque no es una distribución sencilla, tiene grandes ventajas si se consigue dominar, entre ellas destacamos:

- Un ciclo de actualizaciones *sobre la marcha*, que nos permite actualizarlos de forma lineal, cuando nosotros queremos o realmente hace falta por motivos de seguridad o alguna nueva funcionalidad. Y no esperar años y luego tener que cruzar los dedos para que todos los servicios funcionen correctamente. Incluso podemos bloquear para que no se actualicen ciertos componentes del sistema e igualmente el resto del sistema completo puede ir evolucionando.
- Permite de forma sencilla crear tu propio repositorio y tener un sistema de compilación donde replicar los cambios al resto de servidores, antes también realizábamos *rpms* personalizados, pero no es tan cómodo y práctico como un *ebuild*.
- Optimizar el sistema para un determinado procesador y hardware.
- Simplificar las dependencias y protocolos no necesarios, evitamos así posibles errores de programación, vulnerabilidades y reducir el uso de memoria.