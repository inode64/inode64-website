---
title: Metodo de pago Virtual Ruralvía en Virtuemart con SERMEPA
date: 2012-01-04
description: Aprende cómo configurar el método de pago Virtual Ruralvía en Virtuemart utilizando el sistema SERMEPA, con instrucciones detalladas y código adaptado.
author: Francisco Javier Félix Belmonte
image: '/images/blog/post/metodo-de-pago-virtual-ruralvia-en-virtuemart-con-sermepa.webp'
category: 'joomla'
tags: [pagos virtuales, serpema, ruralvía]
isDraft: false
---

Partiendo del código de [SERMEPA webempresa](http://www.webempresa.com/blog/item/307-configuracion-de-la-pasarela-de-pago-sermepa-en-virtuemart.html), seguimos los pasos de instalación y el código proporcionado, y cuando creamos el módulo de pago en Virtuemart lo cambiamos por este adaptado a los requerimientos especiales de Ruralvía que, aunque use el sistema SERMEPA, han realizado modificaciones en los parámetros enviados y la forma de generar la clave encriptada en sha1.

Dentro del **Administrator** vamos a **Virtuemart > Formas de pago** y añadimos una nueva con tipo "**HTML-Form based (e.g. PayPal)**" y con **Nombre para clase de pago** a `ps_payment`. Luego, en la pestaña de **Configuración**, pegamos el nuevo código.

```php
// Código PHP adaptado para Ruralvía
```

[Descargar ruralvia.php (1.99 kB)](https://inode64.com)