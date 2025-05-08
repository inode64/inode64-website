---
title: Joomla 1.5 y el nuevo error de correo electrónico TLS
date: 2012-09-10
description: Solución al problema de envío de correos en Joomla 1.5 al usar TLS, explicando el error y cómo configurarlo correctamente con SSL.
author: Francisco Javier Félix Belmonte
image: '/images/blog/post/joomla-15-y-el-error-de-mail-tls.webp'
category: 'joomla'
tags: [joomla, php, mail]
isDraft: false
---

En la versión de Joomla 1.5 se usa para enviar el correo electrónico el script [phpmailer](http://phpmailer.worxware.com/) 2.0.4 del 2009. Esta versión en concreto no funciona si se selecciona en la Configuración global la opción _TLS_ en **SMTP Security**. Por otra parte, los grandes ISP (Google, Outlook, etc.) obligan a usar encriptación para enviar emails autenticados, con lo cual aparece en la pantalla del navegador el mensaje de Joomla:

**¡Error SMTP! No puedo conectar al hospedaje SMTP.**

Tanto desde el frontend como desde el backend.

La solución consiste en activar la seguridad **SSL** y poner el puerto **465**.

Realmente el problema es la forma en que phpmailer usa la conexión del socket:

```bash
fsockopen("ssl://smtp.gmail.com", 465, $errNum, $errStr, 30); // Correcto
fsockopen("tls://smtp.gmail.com", 587, $errNum, $errStr, 30); // Error SSL3_GET_RECORD
```

Mira [este ejemplo más descriptivo](http://stackoverflow.com/questions/5294751/using-gmails-outgoing-smtp-from-php-using-tls) de la correcta implementación _TLS_.