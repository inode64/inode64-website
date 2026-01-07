---
title: Actualización a Joomla 1.5 versión spanish
date: 2010-10-02
description: Repositorio de actualizaciones para Joomla 1.5 en formato parche, con instrucciones y herramientas para facilitar su implementación en sistemas Linux.
author: Francisco Javier Félix Belmonte
image: "joomla-15-update"
category: "joomla"
tags: [joomla, actualizaciones, parche, linux]
isDraft: false
---

Repositorio de actualizaciones Joomla 1.5 en formato parche para instalación en funcionamiento.
Al estar en modo parche, solo se aplican los cambios y respeta mejor las modificaciones que se hubieran hecho.

Para aplicarlas solo hay que ejecutar este comando en Linux dentro del directorio Joomla:

```bash
patch --binary -p1 < "fichero"
```

En sistemas con múltiples instalaciones, he creado un script que facilita dicha tarea.
Actualizado para solo actualizar la versión 1.5:

```bash
#!/bin/sh

if [ ! "$1" ]
then
    echo "No exist patch"
    exit
fi

for DOM in `find */htdocs/libraries/joomla/version.php | cut -d/ -f1`
do
    if [ "`grep \\$RELEASE $DOM/htdocs/libraries/joomla/version.php | grep 1\\.5`" ]
    then
        echo "Actualizando $DOM"
        patch --binary -p1 -d ./$DOM/htdocs/ < $1 &>/dev/null
        if [ $? -ne 0 ]
        then
            echo "** Error to update domain $DOM"
        fi
    fi
done
```

📄 [Descargar update_joomla15.sh (379 Bytes)](https://inode64.com)

---

### Actualizaciones Joomla 1.5

- 📦 [joomla-10_11.diff (299.14 kB)](https://inode64.com)
- 📦 [joomla-11_12.diff (3.85 MB)](https://inode64.com)
- 📦 [joomla-13_14.diff (5.99 kB)](https://inode64.com)
- 📦 [joomla-14_15.diff (1.1 MB)](https://inode64.com)
- 📦 [joomla-16_17.diff (150.15 kB)](https://inode64.com)
- 📦 [joomla-17_18.diff (69.98 kB)](https://inode64.com)
- 📦 [joomla-18_20.diff (478.53 kB)](https://inode64.com)
- 📦 [joomla-20_21.diff (4.07 kB)](https://inode64.com)
- 📦 [joomla-21_22.diff (126 kB)](https://inode64.com)
- 📦 [joomla-22_23.diff (704.42 kB)](https://inode64.com)
- 📦 [joomla-23_24.diff (11.27 kB)](https://inode64.com)
- 📦 [joomla-24_25.diff (3.6 kB)](https://inode64.com)

---

> **Nota**: Estos parches no incluyen el directorio `/install`.
