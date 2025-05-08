---
title: Sincronizar tablas en MySQL utilizando el motor FEDERATED
date: 2013-01-07
description: Aprende a sincronizar tablas en MySQL utilizando el motor FEDERATED, ideal para compartir datos entre diferentes sitios web de manera eficiente.
author: Francisco Javier Félix Belmonte
image: '/images/blog/post/sincronizar-tablas-en-mysql.webp'
category: 'joomla'
tags: [mysql, federated, gentoo]
isDraft: false
---

Cuando se realizan páginas web, a veces resulta necesario compartir datos entre ellas, como puede ser el caso de compartir los usuarios entre varias webs diferentes en Joomla. Para eso, MySQL nos proporciona una funcionalidad llamada [FEDERATED](http://dev.mysql.com/doc/refman/5.6/en/federated-storage-engine.html), que permite usar tablas en remoto como si estuvieran almacenadas en local. Para evitar problemas de pérdida de datos y velocidad, lo mejor es usarlo en el mismo servidor.

Para ello, en *Gentoo* necesitamos activar:

```bash
USE="extraengine" emerge mysql
```

O añadirlo en el fichero `/etc/portage/packages.use`:

```bash
dev-dev/mysql extraengine
```

Luego reiniciamos el servicio de MySQL:

```bash
/etc/init.d/mysql restart
```

Entramos en la consola de MySQL e instalamos el ENGINE con:

```sql
INSTALL PLUGIN federated SONAME 'ha_federated.so';
```

Pasamos a comprobar que lo tenemos activo:

```sql
show engines;
```

Debe de aparecer algo como esto:

```
+------------+---------+----------------------------------------------------------------+--------------+------+------------+
| Engine     | Support | Comment                                                        | Transactions | XA   | Savepoints |
+------------+---------+----------------------------------------------------------------+--------------+------+------------+
| MyISAM     | DEFAULT | Default engine as of MySQL 3.23 with great performance         | NO           | NO   | NO         |
| FEDERATED  | YES     | Federated MySQL storage engine                                 | NO           | NO   | NO         |
| BLACKHOLE  | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO   | NO         |
| CSV        | YES     | CSV storage engine                                             | NO           | NO   | NO         |
| MEMORY     | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO   | NO         |
| InnoDB     | YES     | Supports transactions, row-level locking, and foreign keys     | YES          | YES  | YES        |
| ARCHIVE    | YES     | Archive storage engine                                         | NO           | NO   | NO         |
| MRG_MYISAM | YES     | Collection of identical MyISAM tables                          | NO           | NO   | NO         |
+------------+---------+----------------------------------------------------------------+--------------+------+------------+
```

Ahora ya solo nos queda crear la tabla que necesitamos duplicar, modificada con la sintaxis requerida:

```sql
DROP TABLE IF EXISTS `h3241_users`;
CREATE TABLE `h3241_users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `username` varchar(150) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `usertype` varchar(25) NOT NULL DEFAULT '',
  `block` tinyint(4) NOT NULL DEFAULT '0',
  `sendEmail` tinyint(4) DEFAULT '0',
  `registerDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastvisitDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `activation` varchar(100) NOT NULL DEFAULT '',
  `params` text NOT NULL,
  `lastResetTime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Date of last password reset',
  `resetCount` int(11) NOT NULL DEFAULT '0' COMMENT 'Count of password resets since lastResetTime',
  PRIMARY KEY (`id`),
  KEY `usertype` (`usertype`),
  KEY `idx_name` (`name`),
  KEY `idx_block` (`block`),
  KEY `username` (`username`),
  KEY `email` (`email`)
) ENGINE=FEDERATED DEFAULT CHARSET=utf8
CONNECTION='mysql://usuario:password@localhost/basededatos/a4821_users';
```

Hemos quitado del original el `AUTO_INCREMENT`, cambiado el `ENGINE` y, por supuesto, la conexión a la otra base de datos.

### Referencias:

- [Sincronizar dos tablas en MySQL](http://www.avargas.info/index.php?option=com_content&task=view&id=9&Itemid=1)