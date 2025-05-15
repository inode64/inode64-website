---
title: Gestión de documentos periódicos en OPEN ERP
date: 2012-08-22
description: Aprende cómo configurar documentos periódicos en Open ERP para automatizar la facturación de servicios o productos de manera eficiente.
author: Francisco Javier Félix Belmonte
image: 'open-erp-documentos-periodicos'
category: 'blog'
tags: [openerp, documentos, automatizaciones]
isDraft: false
---

¿Quieres cobrar una cuota de mantenimiento a un cliente determinado, productos, servicios, etc.?

En **Open ERP** puedes realizar una **facturación periódica de cierto servicio o producto**, tanto de compras como de
ventas.

Te explicamos cómo crear un documento periódico para cada factura y no tener que estar pendiente cada cierto tiempo de
realizarla.

Simplemente, necesitamos instalar el módulo llamado `subscription`, lo que crea ciertas entradas en el menú principal:
Herramientas.

Es un módulo sencillo, que se basa en duplicar un modelo dado (pedido, albarán, factura, …), que debe estar creado de
antemano, y que una vez configurado crea una planificación (**Administración → Configuración → Planificación → Acciones
Planificadas**), ejecutándose en cierta fecha y hora (según la configuración establecida) y duplicando el modelo,
cambiando solo aquellos campos que hayamos configurado (uno importante es la fecha del modelo, para que esté actualizada
a cuando se genera el documento).

### Para configurar una suscripción

1. Crear el documento base a utilizar (pedido, factura, …).
2. Crear el Tipo de documento en **Herramientas → Documentos periódicos → Configuración → Tipos de documento**.
   Los "Tipos de documento" especifican qué modelo está involucrado en el proceso, por ejemplo un pedido, y qué campos
   de ese modelo se modifican al generar la copia.
3. Ir a **Herramientas → Documentos periódicos → Todos los documentos periódicos**:
    - Aquí especificamos el modelo base creado en el punto 1, lo que también indica el cliente al que se le aplica.
    - Cada cuánto se genera el documento o modelo (facturación mensual, anual, bimensual, ...).
    - Cuánto tiempo se estarán generando modelos (Contrato de un año, 3 meses, ...).
