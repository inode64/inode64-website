---
title: Comparativa entre Joomla 2.5 y 3.0 (PHP 5.3 y PHP 5.4)
date: 2013-03-29
description: Una comparativa detallada entre Joomla 2.5 y 3.0, evaluando su rendimiento con diferentes versiones de PHP y sistemas de caché como XCache.
author: Francisco Javier Félix Belmonte
image: "comparativa-entre-joomla-2-5-y-3-0-php-5-3-y-php-5-4"
category: "joomla"
tags: [joomla, benchmark, xcache]
isDraft: false
---

Hemos usado como banco de pruebas [gk_magazine](https://www.gavick.com/joomla-templates/magazine,111.html), template
de [Gavick](https://www.gavick.com) que se encuentra optimizado tanto para _Joomla_ 2.5 como 3.0, para intentar ser lo
más justos posible. Usamos en los dos casos el _quickstart_ para que el contenido de la página principal tuviera un
contenido más parecido a una web real.

|                                         | Joomla 2.5 | Joomla 3.0 |
| --------------------------------------- | :--------: | :--------: |
| PHP 5.3                                 |   38,529   |   34,050   |
| PHP 5.4                                 |   37,235   |   33,353   |
| PHP 5.3 + Xcache                        |   30,356   |   26,836   |
| PHP 5.4 + Xcache                        |   28,680   |   25,763   |
| PHP 5.3 + Xcache + Cache Conservacional |   28,086   |   25,014   |
| PHP 5.4 + Xcache + Cache Conservacional |   26,364   |   23,881   |
| PHP 5.3 + Xcache + Cache Progresiva     |   20,852   |   19,469   |
| PHP 5.4 + Xcache + Cache Progresiva     |   20,508   |   19,307   |

En conclusión, vemos que es un poco más rápida la versión de _Joomla_ 3.0, pero esa diferencia es imperceptible cuando
se activa la _caché progresiva_. Algo similar sucede con **PHP** 5.4, donde el aumento de velocidad no es muy
significativo. Lo más destacado es usar un sistema de caché para **PHP** como son [XCache](https://xcache.lighttpd.net/)
o [APC](https://pecl.php.net/package/APC), pero este último nos ha dado algún problema y lo hemos tenido que reemplazar
en nuestros servidores de producción.

### Sistema de evaluación usado

```bash
PHP 5.3.23
PHP 5.4.13
```

```bash
Version Xcache 3.0.1
Version Joomla 2.5.9
Version Joomla 3.0.3
Apache 2.2.24
```

```bash
kernel 3.7.10 64bits
GCC 4.5.4
Sistema de archivos EXT4
Procesador AMD Athlon(tm) II X2 255 Processor
Memoria RAM de 2GB
Placa Base Gigabyte GA-MA785GMT-UD2H
XCache de 1G
```

```bash
ab -n 200 -c 5 https://localhost/j25/
ab -n 200 -c 5 https://localhost/j30/
```
