---
title: Virtuemart, Paypal y PHP en Proxy inverso (Reverse Proxy)
date: 2014-07-19
description: Aprende a configurar Virtuemart y Paypal en entornos con Proxy inverso, optimizando el rendimiento y solucionando errores comunes en la programación PHP.
author: Francisco Javier Félix Belmonte
image: 'virtuemart-paypal-y-la-programacion-php-en-un-entorno-de-proxy-inverso-reverse-proxy'
category: 'Joomla'
tags: [cache, proxy, php, joomla, virtuemart, paypal, squid]
isDraft: false
---

## ¿Por qué no sirve REMOTE_ADDR con un proxy inverso?

Normalmente en un servidor web normal del tipo apache, nginx o similares para descubrir desde cuál IP nos están accediendo a la web, con obtener el valor de la variable de estándar 'REMOTE_ADDR' nos dará el valor correcto. Pero esto no siempre es cierto, puede suceder que se haya implementado en el servidor una caché para mejorar el rendimiento y el posicionamiento SEO por reducir el tiempo de respuesta, activando un Proxy inverso (Reverse Proxy) o un balanceador de carga con Keepalived, con esto logramos que las páginas o archivos más utilizados sean almacenados en una caché en memoria mejorando sustancialmente el tiempo de respuesta, nosotros utilizamos SQUID como cache para dicho propósito, pero existen otras igualmente efectivas como varnish o incluso nginx.

## Detectar la IP real del cliente en PHP

Con modificar nuestra programación PHP con estas simples líneas podemos controlar también cuando la IP pasa a través de un PROXY.

```php
<?php
    if(!empty($_SERVER['HTTP_CLIENT_IP']))
    {
      echo $_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
    {
      echo $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
      echo $_SERVER['REMOTE_ADDR'];
    }
?>
```

## Problema con Paypal y VirtueMart 2.0

Existen casos especiales como en virtuemart 2.0 que el sistema de pago Paypal genera un error por detectar de forma incorrecta la IP de origen:

Error code 506. Possible fraud. Error with REMOTE IP ADDRESS = 127.0.0.1.
The remote address of the script posting to this notify script does not match a valid PayPal ip address.

## Solución aplicada por INODE64

En INODE64 hemos realizado un pequeño parche que soluciona este problema. Ya lo hemos reportado en el foro, pero la versión 2.6.6 aún no lo tiene aplicado.

🛠️ Puedes descargar el parche aquí: `paypal_proxy.diff` (2.9 kB)
