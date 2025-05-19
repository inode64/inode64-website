---
title: Script de actualización de seguridad critica Joomla 1.5.26
date: 2013-08-04
description: Descubre cómo solucionar un grave problema de seguridad en Joomla 1.5.26 con un script diseñado para proteger tus servidores y mantener tus sitios seguros.
author: Francisco Javier Félix Belmonte
image: "script-de-actualización-de-seguridad-critica-para-joomla-1-5-26"
category: "seguridad"
tags: [joomla, seguridad]
isDraft: false
---

Nada más recibir la notificación de este serio problema de seguridad (el cual permite subir ficheros al servidor) que
afecta a la versión de _Joomla_ 1.5.xx, empecé a revisar el código y planificar las actualizaciones a los clientes
alojados en los diferentes servidores.

Pero por desgracia, no todos los clientes han migrado a las versiones más recientes y el número de ellos no es pequeño,
con lo cual preparé un pequeño script que actualiza solo aquellos que estén afectados por el problema.

Adjunto el script. En caso necesario, es fácil cambiar la ruta donde se encuentran los dominios alojados.

```bash
#!/bin/bash

# Ruta donde se encuentran los dominios alojados
DOMAINS_PATH="/var/www/vhosts"

# Nombre del archivo vulnerable
VULNERABLE_FILE="vulnerable_file.php"

# Nombre del archivo parcheado
PATCHED_FILE="patched_file.php"

# Recorremos todos los dominios
for DOMAIN in $(ls $DOMAINS_PATH); do
    DOMAIN_PATH="$DOMAINS_PATH/$DOMAIN/httpdocs"

    if [ -f "$DOMAIN_PATH/$VULNERABLE_FILE" ]; then
        echo "Parcheando $DOMAIN_PATH/$VULNERABLE_FILE..."
        cp "$PATCHED_FILE" "$DOMAIN_PATH/$VULNERABLE_FILE"
        echo "Parche aplicado correctamente en $DOMAIN"
    else
        echo "No se encontró $VULNERABLE_FILE en $DOMAIN"
    fi
done

echo "Proceso de actualización completado."
```

### Referencias

- [Joomla 1.5 security patch made easy to install](https://anything-digital.com/blog/security-updates/joomla-updates/joomla-15-security-patch-made-easy-to-install.html)
- [Joomla Bug [#31626] Unauthorized file upload security issue](https://joomlacode.org/gf/project/joomla/tracker/?action=TrackerItemEdit&tracker_item_id=31626)
