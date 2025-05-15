---
title: Configuración de Autenticación LDAP y Polkit
date: 2013-09-22
description: Exploramos cómo configurar la autenticación centralizada con LDAP y Polkit, resolviendo problemas comunes y optimizando permisos en sistemas GNOME.
author: Francisco Javier Félix Belmonte
image: 'autenticacion-ldap-y-polkit'
category: 'seguridad'
tags: [ldap, polkit, seguridad, gnome]
isDraft: false
---

En sistemas centralizados donde se usa un sistema de autenticación por **LDAP**, anteriormente se usaban los grupos de
usuarios para dar permisos a los distintos usuarios. Por ejemplo, se asignaba al grupo `plugdev` para poder montar _PEN
USB_ o _CDROM_, al grupo `audio` para acceder al audio, o permisos para apagar el ordenador desde el menú de **GNOME** o
**GDM**.

Pero con el nuevo cambio al sistema _polkit_, se tiene que crear una configuración por cada puesto de trabajo dentro de
`/etc/polkit-1/rules.d/`, lo cual rompe con el concepto de sistema centralizado, al requerir sincronizar ficheros de
configuración en todos los ordenadores para ajustar los permisos. Esto genera errores como:

```text
Mount failed: Not Authorized
```

Al intentar montar un dispositivo USB, no mostrar en el menú de usuario las opciones de apagar y reiniciar, o no poder
conectarse a una red wifi, entre otros.

Existe una solución que, aunque no muy elegante, puede funcionar en la mayoría de los casos, especialmente si no hay
grandes limitaciones para los usuarios: dar permisos a todos y luego restringirlos cuando sea necesario. Esto simplifica
las reglas de _polkit_.

Creamos el fichero **`50-allowall.rules`** en **`/etc/polkit-1/rules.d/`** con el siguiente contenido:

```javascript
polkit.addRule(function(action, subject) {
        return polkit.Result.YES;
});
```

A partir de ese momento, todos los usuarios tendrán permisos. Luego se pueden ir creando reglas adicionales para quitar
permisos a usuarios o grupos concretos.

### Referencias

- [Homepage Polkit](http://www.freedesktop.org/wiki/Software/polkit/)
- [Ubuntu LDAP Admins and GUI Root Passwords](http://www.ossramblings.com/ubuntu-with-ldap-user-root-password-issue)
