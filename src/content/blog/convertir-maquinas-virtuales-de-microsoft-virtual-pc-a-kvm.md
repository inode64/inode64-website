---
title: Convertir maquinas virtuales de Microsoft Virtual PC a KVM
date: 2013-03-25
description: Aprende cómo migrar máquinas virtuales de Microsoft Virtual PC a KVM, incluyendo pasos detallados para la conversión de imágenes y configuración de hardware.
author: Francisco Javier Félix Belmonte
image: 'convertir-maquinas-virtuales-de-microsoft-virtual-pc-a-kvm'
category: 'blog'
tags: [kvm, virtualización]
isDraft: false
---

## Introducción

Lo primero es conocer el hardware que tiene instalado la máquina virtual que deseemos migrar. Virtual PC utiliza
archivos de configuración por máquina con la extensión `.vmc`, los cuales están codificados en UTF-16. Para poder
abrirlos, debemos convertirlos con el siguiente comando:

```bash
iconv -f utf-16 -t utf-8 origen.vmc | dos2unix > origen.xml
```

En este archivo podemos encontrar información como la memoria (`ram_size`), el tipo de tarjeta de red (
`virtual_network`), su dirección MAC (`ethernet_card_address`), los discos duros instalados (`ide_controller`) y
cualquier otro hardware adicional necesario.

### Ejemplo de archivo `.vmc`

```xml
<?xml version="1.0" encoding="UTF-16"?>
<!-- Microsoft Virtual Machine Options and Settings -->
<preferences>
    <version type="string">2.0</version>
    <alerts>
        <notifications>
            <no_boot_disk type="boolean">true</no_boot_disk>
        </notifications>
    </alerts>
    <hardware>
        <memory>
            <ram_size type="integer">650</ram_size>
        </memory>
        <pci_bus>
            <ethernet_adapter>
                <controller_count type="integer">1</controller_count>
                <ethernet_controller id="0">
                    <virtual_network>
                        <id type="bytes">xxxxxxxxxxxxxxxxxxxxxxxx</id>
                        <name type="string">Realtek RTL8168C(P)/8111C(P) PCI-E Gigabit Ethernet NIC</name>
                    </virtual_network>
                    <ethernet_card_address type="bytes">001122334455</ethernet_card_address>
                </ethernet_controller>
            </ethernet_adapter>
            <video_adapter>
                <vram_size type="integer">8</vram_size>
            </video_adapter>
            <ide_adapter>
                <ide_controller id="1">
                    <location id="0">
                        <drive_type type="integer">2</drive_type>
                        <pathname>
                            <absolute type="string" />
                            <relative type="string" />
                        </pathname>
                    </location>
                </ide_controller>
                <ide_controller id="0">
                    <location id="0">
                        <drive_type type="integer">1</drive_type>
                        <pathname>
                            <absolute type="string">C:\origen.vhd</absolute>
                            <relative type="string">.origen.vhd</relative>
                        </pathname>
                    </location>
                </ide_controller>
            </ide_adapter>
        </pci_bus>
    </hardware>
</preferences>
```

## Conversión de imágenes

Una vez localizadas las imágenes, las convertimos con el siguiente comando:

```bash
qemu-img convert -f vpc -O raw origen.vhd destino.img
```

En algunas distribuciones, se utiliza este otro comando:

```bash
kvm-img convert -f vpc -O raw origen.vhd destino.img
```

## Creación de la máquina virtual

Ahora podemos crear la máquina virtual con todos los parámetros necesarios. En caso de ser una máquina virtual con
Windows, se deben realizar algunos pasos adicionales para evitar problemas:

1. **Arrancar con un CD de utilidades**
   Utiliza un CD como [Hiren's Boot](https://www.hirensbootcd.org/download/) y arranca el mini Windows XP. Luego, ejecuta
   dentro del menú "Registry" la opción **Fix hard disk controller (fix_hdc.cmd)** para evitar el pantallazo azul al
   iniciar. Esto se debe a que Windows crea un registro especial desde donde se instala la máquina.

2. **Desinstalar Virtual Machine Additions**
   Asegúrate de desinstalar este programa para evitar conflictos.

3. **Solución para el ratón**
   Si el ratón dentro de la máquina virtual deja de funcionar, elimina la opción de tableta gráfica USB EVTouch.

Con estos pasos, tu máquina virtual estará lista para funcionar correctamente en KVM.
