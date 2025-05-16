---
title: Buenas Practicas en programación web XHTML
date: 2010-06-04
description: Una guía detallada sobre las mejores prácticas en programación web utilizando XHTML, destacando sus ventajas, reglas y diferencias clave con HTML.
author: Francisco Javier Félix Belmonte
image: 'buenas-practicas-en-programacion-web-xhtml'
category: 'blog'
tags: [xhtml, clean code]
isDraft: false
---

### Las principales ventajas del XHTML sobre el HTML son

1. Se pueden incorporar elementos de
   distintos [espacios de nombres](https://es.wikipedia.org/w/index.php?title=Espacio_de_nombres&amp;action=edit&amp;redlink=1) [XML](https://es.wikipedia.org/wiki/XML) (
   como [MathML](https://es.wikipedia.org/wiki/MathML)
   y [Scalable Vector Graphics](https://es.wikipedia.org/wiki/Scalable_Vector_Graphics)).
2. Un navegador no necesita implementar [heurísticas](https://es.wikipedia.org/wiki/Heur%C3%ADstica) para detectar qué
   quiso poner el autor, por lo que el [parser](https://es.wikipedia.org/wiki/Parser) puede ser mucho más sencillo.
3. Como es XML se pueden utilizar fácilmente herramientas creadas para procesamiento de documentos XML genéricos (
   editores, [XSLT](https://es.wikipedia.org/wiki/XSLT), etc.).

### Lista de reglas que diferencian XHTML 1.0 de [HTML](https://es.wikipedia.org/wiki/HTML) 4.01

Muchas de estas diferencias vienen con el cambio de ser una aplicación [SGML](https://es.wikipedia.org/wiki/SGML) a ser
una aplicación del más estricto [XML](https://es.wikipedia.org/wiki/XML):

- Los elementos vacíos deben cerrarse siempre:
    - Incorrecto: `<br>`
    - Correcto: `<br></br>` o `<br/>` o `<br />`
      Nota: Cualquiera de las tres formas es válida en XHTML. Para compatibilidad debe usarse `<br />`

- Los elementos no vacíos también deben cerrarse siempre:
    - Incorrecto: `<p>Primer párrafo<p>Segundo párrafo`
    - Correcto: `<p>Primer párrafo</p><p>Segundo párrafo</p>`

- Los elementos anidados deben tener un correcto orden de apertura/cierre (el que se abre último, debe cerrarse
  primero).
    - Incorrecto: `<em><strong>Texto</em></strong>`
    - Correcto: `<em><strong>Texto</strong></em>`
    - Ya se sabe. No vale por ejemplo `<font size="2"><b>texto</font></b>`, sino `<font size="2"><b>texto</b></font>`
    - Un elemento que no sea formador de un bloque en el flujo del documento, no puede contener un elemento formador de
      bloque. `<font size="2"><center>texto</center></font>` es inválido.

| Elementos block-line (formadores de bloque):                                       |
|------------------------------------------------------------------------------------|
| p           dir             dl          noframes menu        isindex         table |
| blockquote ul          ol              center      address h1-h6       fieldset    |
| pre         hr di                                                                  |

- Los valores de los atributos deben siempre ir encerrados entre comillas (simples o dobles)
    - Incorrecto: `<td rowspan=3>`
    - Correcto: `<td rowspan="3">`
    - Correcto: `<td rowspan='3'>`

- Los nombres de elementos y atributos deben ir en minúsculas.
    - Incorrecto: `<DIV Align="center">Hola Mundo</DIV>`
    - Correcto: `<div align="center">Hola Mundo</div>`

- No está permitida la minimización de atributos (se usa el nombre del atributo como valor)
    - Incorrecto: `<textarea readonly>Solo-lectura</textarea>`
    - Correcto: `<textarea readonly="readonly">Solo-lectura</textarea>`
    - Aquí hay una lista de los elementos que podían usarse minimizados, tal como deben incluirse en xhtml:

```xhtml
compact="compact"
checked="checked"
declare="declare"
readonly="readonly"
disabled="disabled"
selected="selected"
defer="defer"
ismap="ismap"
nohref="nohref"
noshade="noshade"
nowrap="nowrap"
multiple="multiple"
noresize="noresize"
```

- Los atributos desaprobados en HTML 4.01 no forman parte de XHTML.
    - Incorrecto: `<font color="#0000FF">Blue text</font>`
    - Correcto: `<span style="color: #0000FF;">Blue text</span>`

- El atributo *name* declarado no recomendado en xhtml, el atributo *name* queda en desuso, recomendándose en su lugar
  el atributo *id* de los siguientes elementos "*a*, *applet*, *form*, *frame*, *iframe*, *img* y *map*".
    - `<img src="dibujo.gif" id="dibujo1" />`

- Es necesaria la declaración de tipo de documento. En xhtml debemos declarar explícitamente el tipo de documento de que
  se trate; por ejemplo, para xhtml 1.0 transicional:
    - `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "DTD/xhtml1-transitional.dtd">`
    - `<html xmlns="https://www.w3.org/1999/xhtml">`
    - Además, en xhtml debemos escribir explícitamente las etiquetas html, head, body con sus correspondientes parejas (
      en html, los navegadores presumían su existencia si no se escribían)

- Prohibiciones de elementos
    - *a* no puede contener otro *a*
    - *pre* no puede contener *img*, *object*, *big*, *small*, *sub* o *sup*
    - *button* no puede contener *input*, *select*, *textarea*, *label*, *button*, *form*, *fieldset*, *iframe* o
      *isindex*
    - *label* no puede contener otro *label*
    - *form* no puede contener otro *form*

- Los atributos no pueden empezar o terminar con espacios
    - Incorrecto: `<font color=" #0000FF ">Blue text</font>`
    - Correcto: `<font color="#0000FF">Blue text</font>`

- Separar forma y contenido
    - Las etiquetas en xhtml definen el contenido; no se usan simplemente para dar una apariencia al texto. las
      cabeceras h1-h6 deben usarse para resaltar información importante (proporcionalmente al número de la cabecera) y
      no como elemento tipográfico. Los párrafos deben separarse consistentemente. Y como siempre, el uso de hojas de
      estilo en cascada es recomendado.
    - Se recomienda eliminar el uso de *font* y de *div* en su lugar usar hojas de estilo.

### Reglas para DTDs estrictos

- El texto no debe ser insertado directamente en el cuerpo (dentro de la etiqueta "body").
    - Incorrecto: `<body>Texto plano</body>`
    - Correcto: `<body><span>Texto plano</span></body>`

- No se deben insertar elementos de bloque dentro de elementos de línea.
    - Incorrecto: `<em><h2>Título</h2></em>`
    - Correcto: `<h2><em>Título</em></h2>`

### Referencias

1. [https://www.w3.org/TR/xhtml1/#xhtml](https://www.w3.org/TR/xhtml1/#xhtml) Sección 'What is XHTML?' en *XHTML™ 1.0 The
   Extensible HyperText Markup Language (Second Edition)* A Reformulation of HTML 4 in XML 1.0 *W3C Recommendation 26
   January 2000, revised 1 August 2002*
2. [OneStat Website Statistics and website metrics—Press Room](https://www.onestat.com/html/aboutus_pressbox40_browser_market_firefox_growing.html)
3. [World Wide Web Consortium (W3C) Members](https://www.w3.org/Consortium/Member/List)
4. [https://hixie.ch/advocacy/xhtml](https://hixie.ch/advocacy/xhtml)

### Fuentes

1. [https://es.wikipedia.org/wiki/XHTML](https://es.wikipedia.org/wiki/XHTML)
2. [https://www.ignside.net/man/html/a_xhtml.php](https://www.ignside.net/man/html/a_xhtml.php)
