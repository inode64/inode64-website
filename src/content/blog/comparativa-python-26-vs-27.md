---
title: Comparativa de Python 2.6 y 2.7 (diferentes motores de plantillas)
date: 2011-10-15
description: Un análisis detallado sobre el rendimiento de Python 2.6 y 2.7, comparando motores de plantillas como Django, Cheetah, Genshi, y más, con benchmarks y conclusiones clave.
author: Francisco Javier Félix Belmonte
image: 'comparativa-python-26-vs-27'
category: 'blog'
tags: [template engine, phyton, django, cheetah, kid, ghensi, mako, benchmark]
isDraft: false
---

Este artículo presenta un test de rendimiento entre las diferentes versiones de Python (2.6 y 2.7) y varios motores de
plantillas ("Template Engine") como Django, Cheetah, Kid, Genshi, Mako y Tenjin. Los benchmarks fueron realizados
utilizando herramientas proporcionadas por [Tenjin](http://www.kuwata-lab.com/tenjin/).

### Configuración del entorno de pruebas

El banco de pruebas se realizó en un ordenador con Gentoo Linux 64Bits con las siguientes especificaciones:

```bash
Model name       : AMD Athlon(tm) II X2 255 Processor
cpu MHz          : 3100.000
bogomips         : 6228.15

Linux version    : 2.6.39-gentoo-r3
gcc              : 4.4.6
glibc            : 2.13

cheetah          : 2.4.4
genshi           : 0.6
django           : 1.3.1
kid              : 0.9.6
jinja            : 2.6
mako             : 0.4.2
Tenjin           : 1.0.2
```

### Resultados de los benchmarks

#### Python 2.6.6

```bash
               utime     stime     total     real
tenjin         2.4400    0.0000    2.4400    2.4411
tenjin-create  3.0300    0.1100    3.1400    3.1322
django        49.9200    0.0000   49.9200   49.9329
cheetah       10.0900    0.0000   10.0900   10.0893
kid          169.5000    0.0000  169.5000  169.5634
genshi       104.9000    0.0000  104.9000  104.9571
mako           3.2700    0.0000    3.2700    3.3075
jinja2         4.1800    0.0000    4.1800    4.1941
```

#### Python 2.7.2

```bash
               utime     stime     total     real
tenjin         1.9900    0.0000    1.9900    1.9957
tenjin-create  2.6000    0.1100    2.7100    2.7158
django        48.4400    0.0000   48.4400   48.4615
cheetah        9.4500    0.0000    9.4500    9.4498
kid          169.4400    0.0000  169.4400  169.5022
genshi       102.5700    0.0000  102.5700  102.6323
mako           2.8600    0.0100    2.8700    2.8641
jinja2         3.5600    0.0100    3.5700    3.5751
```

#### Python 2.7.2 y GCC 4.5.3

```bash
               utime     stime     total     real
tenjin         2.0600    0.0000    2.0600    2.0543
tenjin-create  2.7100    0.1000    2.8100    2.8148
django        48.1300    0.0000   48.1300   48.1483
cheetah        9.4900    0.0000    9.4900    9.4995
kid          171.1300    0.0000  171.1300  171.1886
genshi       104.9000    0.0000  104.9000  104.9526
mako           2.7700    0.0000    2.7700    2.7746
jinja2         3.5700    0.0100    3.5800    3.5831
```

### Benchmarks adicionales

Los siguientes resultados se basan en el código
de [Spitfire performance tests](http://code.google.com/p/spitfire/source/browse/trunk/tests/perf/bigtable.py):

#### Python 2.6.6 (spitfire)

```bash
Genshi tag builder                308.61 ms
Genshi template                   179.08 ms
Mako Template                      39.34 ms
Kid template                      706.16 ms
Django template                   371.56 ms
Cheetah template                   42.14 ms
StringIO                           47.67 ms
cStringIO                           8.07 ms
list concat                         5.09 ms
```

#### Python 2.7.2 (spitfire)

```bash
Genshi tag builder                313.95 ms
Genshi template                   172.67 ms
Mako Template                      34.99 ms
Kid template                      702.53 ms
Django template                   370.30 ms
Cheetah template                   42.43 ms
StringIO                           46.91 ms
cStringIO                           7.30 ms
list concat                         4.90 ms
```

#### Python 2.7.2 y GCC 4.5.3 (spitfire)

```bash
Genshi tag builder                305.27 ms
Genshi template                   180.95 ms
Mako Template                      33.85 ms
Kid template                      712.32 ms
Django template                   355.89 ms
Cheetah template                   39.50 ms
StringIO                           45.37 ms
cStringIO                           6.86 ms
list concat                         4.66 ms
```

### Conclusiones

- **Python 2.7** es ligeramente más rápido que la versión 2.6.
- El cambio de **GCC 4.4.6 a 4.5.3** mejora el rendimiento en algunas áreas, pero introduce regresiones en otras.

¡Comparte tus experiencias y resultados en los comentarios!
