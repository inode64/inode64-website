---
title: Virtuemart 1.5, las cookies, el SEO y sus implicaciones
date: 2012-10-24
description: Descubre cómo un ajuste en Virtuemart 1.5 puede afectar negativamente al SEO de tu sitio web, generando problemas de indexación y URLs duplicadas.
author: Francisco Javier Félix Belmonte
image: 'virtuemart-15-las-cookies-y-el-seo'
category: 'joomla'
tags: [virtuemart, cookies, seo]
isDraft: false
---

En *Virtuemart* 1.5.xx existe un parámetro que viene activado por defecto y que rompe y entorpece la correcta indexación de la web por parte de los buscadores, con el consiguiente decremento de las visitas y ventas.

El susodicho parámetro es "**¿Activar el chequeo de Cookies?**", que se encuentra en la configuración de *Virtuemart* en el apartado "*Ajustes del núcleo*". Si se encuentra activado, modifica la respuesta que obtienen los buscadores haciéndoles creer que cada vez que acceden existe un problema, devolviendo el código de error del apache **303** y generando una nueva *URL*, como en el siguiente ejemplo:

```bash
"GET /index.php?page=shop.ask&flypage=flypage.tpl&product_id=1202&category_id=186&option=com_virtuemart&Itemid=2 HTTP/1.1" 303 20 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +https://www.google.com/bot.html)"
"GET /index.php?page=shop.ask&flypage=flypage.tpl&product_id=1202&category_id=186&option=com_virtuemart&Itemid=2&vmcchk=1&Itemid=2 HTTP/1.1" 200 15603 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +https://www.google.com/bot.html)"
```

Donde, al estar activa, se incluye la variable **vmcchk** y repite de nuevo el **Itemid**, generando *URLs* repetidas y haciendo pensar a Google que se intenta engañarle creando páginas duplicadas, lo cual también consume recursos innecesarios.
