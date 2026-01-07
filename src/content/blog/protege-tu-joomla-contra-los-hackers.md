---
title: Protege eficazmente tu Joomla contra los hackers
date: 2013-05-12
description: Aprende cómo proteger tu sitio Joomla contra ataques de hackers mediante técnicas de seguridad y un script en bash que limita la escritura en archivos clave.
author: Francisco Javier Félix Belmonte
image: "protege-tu-joomla-contra-los-hackers"
category: "joomla"
tags: [joomla, seguridad]
isDraft: false
---

Después de realizar un website con _Joomla_, si el cliente no necesita añadir nuevas funcionalidades o no puede
actualizar los módulos, componentes o plugins porque se ha quedado desactualizada, suele suceder que empiezan a
encontrarse numerosas vulnerabilidades que son aprovechadas para acceder al código, manipularlo, enviar emails, mostrar
otros productos, infectar a los visitantes o atacar a otras webs.

Ante este panorama, si el cliente no está dispuesto a realizar cambios y a realizar una pequeña inversión en
subsanarlos, nos vemos abocados a recibir todo tipo de ataques.

Para solucionar este problema existen varias soluciones. Una de ellas, fácilmente aplicable, es proteger el espacio web
contra escritura, ya que muchos ataques se basan en modificar los ficheros `index.php`, `template.php`, `footer.php`,
etc. Con añadir solamente la escritura en las zonas donde sea necesario para el correcto funcionamiento de Joomla,
solucionamos muchos quebraderos de cabeza.

Hemos realizado un pequeño script en **bash** que tiene en cuenta las versiones de _Joomla_ 1.0 hasta la 3.1 y los
habituales componentes que escriben en partes especiales, como _docman_, _akeeba_, _virtuemart 1.5.x_, _sef404_,
_extplorer_, _breezingforms_.
Con esto, el cliente podrá continuar trabajando con su web añadiendo nuevos artículos, recibiendo información de los
formularios, etc., pero no podrá instalar nada nuevo ni modificar archivos _css_ ni _php_. En caso necesario, se tendría
que habilitar la escritura en esos archivos, pero limitándola para que a los atacantes les cueste más y desistan,
intentando atacar a otra web menos protegida.

```bash
# Aquí iría el script real, insertado manualmente por el autor
```

### Mejoras suplementarias

- Si el cliente no necesita añadir ninguna imagen nueva, también se puede proteger todo el directorio `/images`.
- Como existen infinidad de módulos, componentes y configuraciones, en caso de encontrar algún componente que no
  funcione, enviadnos para incluirlo.
