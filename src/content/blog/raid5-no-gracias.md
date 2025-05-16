---
title: RAID5, No gracias. Riesgos y desventajas del sistema
date: 2013-03-16
description: Exploramos los riesgos y desventajas del RAID5 basándonos en un caso real, y analizamos alternativas más seguras como RAID6 o RAID1.
author: Francisco Javier Félix Belmonte
image: 'raid5-no-gracias'
category: 'blog'
tags: [linux, almacenamiento]
isDraft: false
---

Recientemente, un servidor antiguo (*5 años*) de un cliente con 5 discos de 750 GB en *RAID5* había empezado a dar
problemas de errores en un disco. Lo sustituimos por otro nuevo de 1 TB y empezamos a reconstruir el RAID. Después de 5
horas y al 98%, empieza a fallar otro disco duro y el RAID se queda en *spare*. Intentamos volver a reconstruirlo con el
mismo resultado. Al final tuvimos que intentar regenerar los sectores defectuosos con una herramienta de las
utilidades [Hiren's](https://www.hirensbootcd.org/download/) para poder reconstruir, y luego copiar todos los datos a un
nuevo *RAID1* con 2 discos de 3 TB. Ahora hemos mejorado la velocidad y la seguridad de los datos almacenados.

Como vemos, el *RAID5* tiene algunos problemas que bien se pueden subsanar con
el [RAID6](https://es.wikipedia.org/wiki/RAID), que tiene 2 discos de *CRC*, pero a menos que se instalen más de 5 discos
no sale a cuenta.

Como resumen, los puntos débiles del [RAID5](https://es.wikipedia.org/wiki/RAID) son:

- Solo puede fallar un disco; a mayor cantidad de discos, más probabilidad de tener problemas.
- Si se usa por software, se puede saturar el bus de datos en casos de una gran cantidad de escrituras, ya que cada dato
  debe almacenarse en todos los discos.
- Con el paso de los años, se incrementa la posibilidad de fallos en los discos, especialmente durante la
  reconstrucción, que requiere leer todos los discos.
