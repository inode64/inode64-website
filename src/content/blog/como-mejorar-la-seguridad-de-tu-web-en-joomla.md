---
title: Como mejorar la seguridad de tu web en Joomla
date: 2011-12-11
description: Consejos prácticos para mejorar la seguridad de tu sitio web en Joomla, protegiéndolo contra ataques y vulnerabilidades comunes.
author: Francisco Javier Félix Belmonte
image: "como-mejorar-la-seguridad-de-tu-web-en-joomla"
category: "joomla"
tags: [seguridad, joomla, geoip]
isDraft: false
---

Muchas veces caemos en la falsa sensación de que los ataques de seguridad y el malware son algo lejano, pero nada más
lejos de la realidad. Los hackers no paran de mejorar sus métodos de infección y buscan constantemente sitios
vulnerables para instalar programas de envío de SPAM, capturar contraseñas, infectar navegadores, etc., tanto en **CMS**
como Joomla, Wordpress, Drupal, como en software desarrollado a medida. Existen unas reglas básicas que podemos seguir
para limitar que nuestro website sea blanco de ataques.

- **Contraseñas**

Es obvio, pero las contraseñas deben tener un alto nivel de complejidad y no ser fácilmente adivinables a través de
diccionarios. También es importante cambiarlas periódicamente, no hace falta que sea cada semana, pero al menos cada 6
meses.

- **Limitar el acceso a /administrator/**

Existen sistemas para bloquear por IP, países o regiones, y así, en caso de que la contraseña de acceso al backend caiga
en malas manos, no pueda ser utilizada inmediatamente. Esto nos da tiempo para cambiarla y limitar el daño.

- **Refactorización**

Limpiar y eliminar componentes, módulos y plugins no necesarios. Esto nos ayudará a limitar la aparición de agujeros de
seguridad a lo largo del tiempo y simplificar las actualizaciones.

- **Actualizar**

Instalar siempre las últimas actualizaciones. Esto no garantiza seguridad al 100%, pero eliminará el código antiguo
conocido por ser vulnerable.

- **Bloquear el acceso al sitio**

Si tu negocio es local, regional o de un solo país, puedes bloquear el acceso desde otros países. De esta manera,
limitas el acceso a tu web a aquellos países que son relevantes para tu negocio, mejorando la calidad de tráfico y
reduciendo cargas innecesarias.

- **Comentarios**

Si no vas a tener una web social, desactiva los comentarios, la impresión, el reenvío por email, etc. Si decides
habilitar los comentarios, activa un sistema de CAPTCHA para evitar el SPAM.

- **Envío de correo SMTP**

Por razones de seguridad, lo mejor es crear una cuenta de correo para cada website y configurar Joomla o cualquier otro
CMS para usar el envío de correos a través de una conexión segura (TLS o SSL) con autenticación. Esto elimina el envío
de correos mediante el comando `mail` de PHP, que es una de las formas en que los atacantes envían SPAM desde tu
servidor.

- **Registro de usuarios**

Es habitual encontrar el registro de nuevos usuarios habilitado, pero si tu web no es de E-Commerce o no es necesario,
desactívalo para no dar acceso adicional a los hackers. Para desactivarlo:

- **Joomla 1.5**: Ve a "Sitio" > "Configuración Global" > "Sistema" y pon "No" en la opción "Permitir el registro de
  usuarios".
- **Joomla 2.5 y posteriores**: Ve a "Gestor de usuarios" > "Opciones" y desactiva la opción "Permitir el registro de
  usuarios".
