---
title: Como es atacado un sistema Joomla (1ª Parte)
date: 2012-06-03
description: Descubre cómo los atacantes explotan vulnerabilidades en Joomla y aprende a proteger tu web corporativa con consejos prácticos y ejemplos reales.
author: Francisco Javier Félix Belmonte
image: "como-es-atacado-un-joomla"
category: "blog"
tags: [Joomla, ataques, seguridad]
isDraft: false
---

Es habitual que la seguridad pase a un segundo plano en el mantenimiento de la web corporativa de una empresa y se
argumentan las típicas excusas:

- Nunca nos pasará.
- Hay millones de webs, ¿por qué a la nuestra?
- No tenemos nada importante en la web.
- Etc.

Sin embargo, la realidad es que hay muchas personas malintencionadas interesadas en explotar el potencial de las webs.
Los usuarios, pensando que la web es completamente legítima, pueden ser infectados con código malicioso o redirigidos a
enlaces de productos ficticios (como viagras, pastillas, etc.), lo que perjudica seriamente la reputación de la web y de
la empresa. Esto incluso puede poner en peligro las relaciones con los clientes.

### Cómo detectar si tu web está comprometida

1. **Búsqueda en Google**
   Realiza una búsqueda como la siguiente para comprobar si tu web está comprometida con enlaces externos:

   ```bash
   site:***** (pharm|viagra)
   ```

   Reemplaza `*****` con tu dominio, por ejemplo, `inode64.com` o `villarrealcf.es`.

2. **Análisis de registros del servidor**
   Revisa los logs del servidor web para detectar accesos sospechosos. Por ejemplo:

   ```bash
   79.142.73.67 - - [11/Apr/2012:05:29:04 +0200] "GET / HTTP/1.1" 200 152204 "-" "Opera/9.80 (Windows NT 7.0; U; en) Presto/2.9.211 Version/12.00"
   79.142.73.67 - - [11/Apr/2012:05:29:05 +0200] "GET /administrator/ HTTP/1.1" 200 7202 "-" "Opera/9.80 (Windows NT 7.0; U; en) Presto/2.9.211 Version/12.00"
   ...
   ```

   En este ejemplo, se comprueban diferentes componentes conocidos por tener problemas de seguridad, como:
   - [xmap](https://extensions.joomla.org/extensions/structure-a-navigation/site-map/3066) ([CVE-2010-2678](https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2010-2678))
   - [rsgallery2](https://extensions.joomla.org/extensions/photos-a-images/galleries/photo-gallery/142) ([CVE-2006-6962](https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2006-6962))
   - Myblog ([CVE-2010-1540](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2010-1540), CVE-2008-6193,
     CVE-2008-4341)
   - [rokmodule](https://www.rockettheme.com/extensions-downloads/free/1012-rokmodule) ([CVE-2010-1479](https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2010-1479))
   - Otros componentes como Play, Sport, Etree, Tag, Adagency, Storedirectory, etc.

### Cómo actúan los atacantes

Los atacantes suelen seguir estos pasos:

1. Analizan la web para identificar los módulos instalados.
2. Comprueban si los módulos tienen vulnerabilidades conocidas.
3. Realizan el ataque para obtener privilegios de administrador e insertar código malicioso.

Este proceso puede llevar días o incluso meses antes de que se ejecute el ataque final. Normalmente, los ataques son
automáticos y se seleccionan las webs con mayor repercusión.

### Ejemplo de ataque

En este caso, se encontró un componente vulnerable (`com_rokmodule`) que fue explotado para modificar la contraseña del
administrador. Aquí un extracto de los logs:

```bash
79.142.73.67 - - [11/Apr/2012:05:29:23 +0200] "GET /index.php?option=com_rokmodule&tmpl=component&type=raw&moduleid=2+and(1=1) HTTP/1.1" 200 1772 "-" "Opera/9.80 (Windows NT 7.0; U; en) Presto/2.9.211 Version/12.00"
79.142.73.67 - - [11/Apr/2012:05:32:14 +0200] "GET /index.php?option=com_rokmodule&tmpl=component&type=raw&moduleid=2+and((/*!select*/ord(substr(password,65,1))from(%23__users)+where+gid=25+and(id)between(1)and(99999)+having(min(1)=1))=108) HTTP/1.1" 200 1 "-" "Opera/9.80 (Windows NT 7.0; U; en) Presto/2.9.211 Version/12.00"
```

### Recomendaciones finales

- Elimina módulos, componentes, plugins y plantillas que no uses.
- Asegúrate de que los elementos instalados estén actualizados y no tengan problemas de seguridad reportados.
- En versiones de Joomla 2.5 y posteriores, las actualizaciones son más fáciles de gestionar. Sin embargo, ten cuidado
  si se ha modificado el código, ya que podrías dejar la web inoperativa.
- Considera contratar a un experto en seguridad o contactar a los profesionales que desarrollaron la web.

[Sigue leyendo la 2º Parte](/blog/como-es-atacado-un-joomla-2-parte)
