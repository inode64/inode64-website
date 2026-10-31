---
title: "Parches de seguridad para PHP 5.6, 7.3 y 7.4 en nuestro overlay de Gentoo"
date: 2026-10-31
description: "Publicamos en el overlay de INODE64 actualizaciones para PHP 5.6, 7.3 y 7.4 frente a CVE-2026-109618 y CVE-2026-109619, con backports y parches para Gentoo."
author: Francisco Javier Félix Belmonte
image: "parches-seguridad-php-gentoo"
category: "security"
tags: [PHP, Gentoo, seguridad, overlay, backports, software libre]
isDraft: false
---

En **INODE64 hemos preparado y publicado las actualizaciones de seguridad para PHP 5.6, 7.3 y 7.4 en nuestro overlay de Gentoo**. Incorporan las correcciones de las vulnerabilidades **CVE-2026-109618** y **CVE-2026-109619**, anunciadas por el equipo de PHP el 21 de octubre de 2026, junto con los parches que mantenemos para integrar estas ramas en Gentoo. Los ebuilds están disponibles en [dev-lang/php de nuestro overlay público](https://github.com/inode64/inode64-overlay/tree/main/dev-lang/php).

El objetivo es ofrecer una actualización a quienes todavía mantienen aplicaciones que dependen de estas versiones y necesitan tiempo para completar su migración.

## Qué problemas corrige esta actualización

El [aviso oficial de PHP](https://www.php.net/archive/2026.php#2026-10-21-5) describe dos vulnerabilidades críticas que pueden permitir la ejecución remota de código sin autenticación:

- **CVE-2026-109618: corrupción de memoria al agotarse la memoria disponible.** PHP podía interrumpir una operación con datos internos parcialmente inicializados y utilizarlos después durante la limpieza de la petición. El equipo de PHP documenta un ataque contra Apache con `mod_php` que se produce antes de ejecutar el código de la aplicación. Véase el [aviso técnico sobre agotamiento de memoria](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w).
- **CVE-2026-109619: reutilización de estado interno entre peticiones.** Un proceso podía conservar referencias a memoria ya liberada y acceder a ellas al atender otra petición. Esto afecta a operaciones de inicialización, errores y sesiones, entre otras. Véase el [aviso técnico sobre estado global obsoleto](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp).

El alcance del aviso incluye distintos modos de servir PHP, también PHP-FPM. Actualizar únicamente el CMS o el framework no sustituye la actualización del intérprete.

## Nuestro trabajo en el overlay

Mantenemos los ebuilds, los conjuntos de parches adicionales y la integración con las dependencias y herramientas de compilación de Gentoo. Para esta actualización utilizamos revisiones concretas del repositorio [php-src-backports de Shivam Mathur](https://github.com/shivammathur/php-src-backports), que incorporan las correcciones para estas ramas antiguas.

Las correcciones de seguridad parten del trabajo del equipo de PHP y de los mantenedores de backports. Nuestra aportación consiste en preparar su distribución en Gentoo mediante el overlay y mantener los parches de compatibilidad necesarios. Los cambios de seguridad incorporados pueden consultarse para [PHP 5.6](https://github.com/shivammathur/php-src-backports/commit/31b896540a30a5d170797a1171b04dd872b88c5b), [PHP 7.3](https://github.com/shivammathur/php-src-backports/commit/34456d7558a6a1741fab48074c0c42d89b4834ac) y [PHP 7.4](https://github.com/shivammathur/php-src-backports/commit/9f3f6763497aa556d3fc56df7e66f44b8de49815).

A fecha de publicación, las revisiones disponibles para esta actualización son:

| Rama | Ebuild del overlay |
| --- | --- |
| PHP 5.6 | [`php-5.6.40_p20261024-r2`](https://github.com/inode64/inode64-overlay/blob/90761f00b6f9db7720ce45a4c3d61981f4bec350/dev-lang/php/php-5.6.40_p20261024-r2.ebuild) |
| PHP 7.3 | [`php-7.3.33_p20261024-r2`](https://github.com/inode64/inode64-overlay/blob/90761f00b6f9db7720ce45a4c3d61981f4bec350/dev-lang/php/php-7.3.33_p20261024-r2.ebuild) |
| PHP 7.4 | [`php-7.4.33_p20261019-r3`](https://github.com/inode64/inode64-overlay/blob/90761f00b6f9db7720ce45a4c3d61981f4bec350/dev-lang/php/php-7.4.33_p20261019-r3.ebuild) |

La revisión completa del paquete importa: el número base que muestra `php -v` no basta para identificar los parches que ha incorporado una distribución.

## Cambios que conviene tener en cuenta

Estos backports para ramas antiguas introducen cambios de comportamiento. Ante determinados errores de memoria, terminan el proceso afectado para evitar continuar con un estado inconsistente. También desactivan en el código el seguimiento de progreso de subidas mediante sesiones. Una aplicación que utilice esa función para mostrar el avance de una carga necesita revisar ese comportamiento.

Después de instalar la revisión correspondiente, hay que reiniciar los procesos que sirven PHP y comprobar las aplicaciones con la configuración real del servidor. Actualizar el ejecutable en disco no reemplaza los procesos que ya estaban en ejecución; comprobar solo la versión de PHP en la consola tampoco verifica el intérprete utilizado por cada web.

## Mantener las aplicaciones mientras preparamos su migración

PHP 5.6, 7.3 y 7.4 están [fuera del soporte oficial del proyecto PHP](https://www.php.net/eol.php). Estos parches atienden problemas concretos de seguridad y permiten mantener aplicaciones heredadas mientras se trabaja en su actualización. No restablecen el soporte oficial de esas ramas ni sustituyen la migración a una versión mantenida.

Publicamos este trabajo para que otros administradores de Gentoo puedan consultar los ebuilds, revisar los cambios y aprovecharlos en sus propios sistemas. Puedes encontrar las actualizaciones y seguir su evolución en [nuestro overlay de Gentoo](https://github.com/inode64/inode64-overlay/tree/main/dev-lang/php).
