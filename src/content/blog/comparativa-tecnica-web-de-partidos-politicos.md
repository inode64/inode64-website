---
title: Comparativa técnica web de partidos políticos
date: 2011-11-01
description: Una comparativa técnica de las páginas web de los principales partidos políticos de España, analizando latencia, tiempos de renderizado y conclusiones clave.
author: Francisco Javier Félix Belmonte
image: 'comparativa-tecnica-web-de-partidos-politicos'
category: 'blog'
tags: [partidos políticos, web]
isDraft: false
---

Esta es una mera comparativa de los principales partidos políticos de España por orden de aparición en la [Wikipedia](http://es.wikipedia.org/wiki/Anexo:Partidos_pol%C3%ADticos_de_Espa%C3%B1a). No están todos, pero sí los más representativos. Tampoco dispongo de más tiempo para realizar el estudio del resto.

Primero realizamos un test de latencia usando el `ping` como herramienta. Existen algunos partidos políticos que bloquean el tráfico ICMP y no aparecen en la gráfica:

<!-- ![latencia partidos politicos](images/stories/partidos/latencia.png) -->

Luego evaluamos el tiempo de renderizado (en segundos) de la página web sin carga de imágenes ni otros objetos. Esto nos permite emular el funcionamiento de un rastreador tipo Google y aproximarnos a la eficiencia del servidor / lenguaje:

<!-- ![render web partidos politicos](images/stories/partidos/render.png) -->

### CONCLUSIONES

1. ONO es más rápido que Telefónica.
2. Como norma general, la latencia es buena. Esto ayudará a una carga de elementos más rápida, con excepción de *Unión Progreso y Democracia*.
3. Existen muchas webs alojadas en Francia (OVH).
4. La renderización de algunas webs es lenta, lo que puede colapsarlas fácilmente si aumenta el número de usuarios concurrentes, haciendo que muchos desistan y abandonen la navegación.

> **NOTA**: Los resultados pueden cambiar con el tiempo. No es mi intención desprestigiar el trabajo realizado por los administradores web.
