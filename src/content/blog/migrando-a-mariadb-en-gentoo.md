---
title: Migrando fácilmente a MariaDB en Gentoo Linux
date: 2013-06-09
description: Una guía sencilla para migrar de MySQL a MariaDB en Gentoo, destacando los pasos clave y consejos para optimizar el rendimiento.
author: Francisco Javier Félix Belmonte
image: '/images/blog/post/migrando-a-mariadb-en-gentoo.webp'
category: 'blog'
tags: [gentoo, mysql, benchmark]
isDraft: false
---

Gracias a que *Oracle*, con la adquisición de MySQL, le está haciendo perder velocidad desde hace algún tiempo (creemos que para favorecer al hermano mayor *Oracle DB*) y tiene otros problemas de cara a la comunidad de desarrolladores, pensamos que MariaDB tiene un gran futuro.

En esta pequeña guía vamos a explicar de forma sencilla los pasos a seguir para migrar una instalación con MySQL a MariaDB en Gentoo. Algunos de estos pasos también podrían aplicarse a otras distribuciones, simplemente habría que cambiar los comandos de instalación.

1. Backup de todas las bases de datos por si tenemos que volver atrás:

    ```bash
    mysqldump -A > all.sql
    ```

2. Actualmente, en Gentoo, MariaDB se encuentra en fase de pruebas, por lo que tendremos que añadir lo siguiente en el fichero `/etc/portage/package.keywords`:

    ```text
    dev-db/mariadb
    virtual/mysql
    ```

3. Igualmente, tendremos que copiar nuestra configuración de `dev-db/mysql` en `/etc/portage/package.use` para no perder personalizaciones.  
   Recomendamos usar el flag `jemalloc` para mejorar el rendimiento.

4. Paramos el motor MySQL:

    ```bash
    /etc/init.d/mysql stop
    ```

5. Desinstalamos MySQL:

    ```bash
    emerge -C mysql
    ```

6. Instalamos MariaDB:

    ```bash
    emerge mariadb
    ```

7. Y por si tenemos alguna dependencia rota o librería:

    ```bash
    emerge @preserved-rebuild
    revdep-rebuild
    ```

8. Arrancamos la base de datos:

    ```bash
    /etc/init.d/mysql start
    ```

9. Por último, actualizamos las tablas:

    ```bash
    mysql_upgrade -u root -p
    mysqlcheck --repair --all-databases -u root -p
    ```

Y a disfrutar de la velocidad de MariaDB.

### Referencias:

- [Impact of memory allocators on MySQL performance](http://www.mysqlperformanceblog.com/2012/07/05/impact-of-memory-allocators-on-mysql-performance/)
- [Cómo migrar de MySQL a MariaDb en Ubuntu Server](http://davidburgosonline.com/ddbb-base-datos/2013/como-migrar-de-mysql-a-mariadb-en-ubuntu-server/)