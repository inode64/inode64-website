---
title: Envió de mensajes desde PHP internacionalizado
date: 2010-06-04
description: Aprende cómo enviar correos electrónicos internacionalizados en PHP utilizando `mb_send_mail()` y mejores prácticas para garantizar compatibilidad y soporte multilenguaje.
author: Francisco Javier Félix Belmonte
image: 'envio-de-mensajes-desde-php-internacionalizado'
category: 'blog'
tags: [php, emails, clean code]
isDraft: false
---

Cuando creamos una aplicación en PHP que necesite enviar correos electrónicos de forma internacionalizada, nos
encontramos con algunos desafíos comunes:

- Codificación de caracteres (UTF-8, ISO-8859-1, etc.).
- Compatibilidad con distintos clientes de correo.
- Idioma del contenido del mensaje según la preferencia del usuario.

---

### Solución propuesta

Una solución eficiente es usar la función `mb_send_mail()` de PHP, que permite manejar codificaciones multibyte y
establecer correctamente los encabezados.

Ejemplo básico:

```php
$to = 'usuario@ejemplo.com';
$subject = 'Bienvenido a nuestro sitio';
$message = '¡Gracias por registrarte!';
$headers = "From: no-responder@miweb.com\r\n" .
           "Content-Type: text/plain; charset=UTF-8\r\n";

mb_language("uni");
mb_internal_encoding("UTF-8");

mb_send_mail($to, $subject, $message, $headers);
```

---

### Recomendaciones

- Siempre usar `UTF-8` como codificación por defecto.
- Validar que el servidor tenga habilitado `mbstring`.
- Probar los mensajes en múltiples clientes de correo (Gmail, Outlook, Thunderbird...).
- Incluir versiones `text/plain` y `text/html` para mejorar la compatibilidad.

---

### Referencias

- [MIME - Wikipedia](http://es.wikipedia.org/wiki/MIME)
- [Envío de emails desde PHP usando varios métodos](http://www.phpbsd.net/2007/02/04/envio-de-emails-desde-php-usando-varios-metodos-pear-mail_mime-mail-y-error_log/)
