---
title: PHP 5.6 y las conexiones seguras SSL / TLS
date: 2016-12-04
description: Análisis de cómo PHP 5.6 mejora la seguridad en SSL/TLS al activar la verificación de certificados y posibles soluciones a problemas derivados.
author: Francisco Javier Félix Belmonte
image: 'php-5-6-y-las-conexiones-seguras-ssl-tls'
category: 'security'
tags: [php, ssl, seguridad, certificados]
isDraft: false
---

## Introducción

A partir de PHP 5.6, todas las conexiones seguras **SSL/TLS** activan por defecto la verificación del nombre del host en
el certificado. Esto garantiza que la conexión es realmente segura y no puede ser interceptada por un ataque "man in the
middle" (MITM).

Este cambio mejora la seguridad en transacciones bancarias, el intercambio de información sensible, correos electrónicos
y plataformas de venta online, ya que se verifica que el servidor al que nos conectamos es legítimo y no un impostor.

## Impacto del cambio en PHP 5.6

Si bien esta mejora incrementa la seguridad, también puede generar problemas en aplicaciones mal configuradas. Por
ejemplo, el envío de correos electrónicos a través de SMTPS puede fallar si el certificado del servidor no coincide
exactamente con el dominio usado en la conexión.

Antes, era común conectarse a un servidor SMTP mediante `localhost`. Sin embargo, dado que la verificación del
certificado es estricta, ahora es necesario utilizar el nombre real del servidor, por ejemplo: `kvm9.srvdr.com`.

Este cambio también afecta conexiones seguras como **STARTTLS, FTPS, HTTPS y MYSQLS**, por lo que es fundamental revisar
la configuración y asegurarse de que los certificados sean válidos.

## Problemas comunes y soluciones

Si tu aplicación deja de funcionar debido a esta verificación, considera las siguientes soluciones:

1. **Actualizar los certificados:** La mejor opción es asegurarse de que los certificados sean válidos y estén
   correctamente configurados.
2. **Configurar correctamente los nombres de host:** Evita usar `localhost` en conexiones seguras y usa el nombre de
   dominio real del servidor.
3. **Parche temporal (no recomendado):** Mientras gestionas un certificado válido, puedes desactivar la verificación de
   certificados en tu código:

   ```php
   $context = stream_context_create([
       "ssl" => [
           "verify_peer" => false,
           "allow_self_signed" => true
       ]
   ]);
   ```

   ⚠ **Advertencia:** Desactivar la verificación reduce la seguridad y deja la conexión vulnerable a ataques MITM.

4. **Añadir certíficado raíz manualmente:** Si no puedes obtener un certificado válido, puedes añadir manualmente los
   certificados CA en la configuración global de PHP, editando `openssl.cafile` en `php.ini`.

## Recursos adicionales

- Documentación oficial de PHP sobre
  SSL/TLS: [https://php.net/manual/en/context.ssl.php](https://php.net/manual/en/context.ssl.php)
- Roadmap de versiones de PHP: [https://www.php.net/supported-versions.php](https://www.php.net/supported-versions.php)
