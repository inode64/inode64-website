---
title: Cancelación de facturas en sistemas OPEN ERP
date: 2012-08-22
description: Aprende cómo cancelar facturas en OpenERP de manera efectiva, cumpliendo con las condiciones necesarias y evitando errores comunes en la gestión contable.
author: Francisco Javier Félix Belmonte
image: 'open-erp-cancelar-facturas'
category: 'blog'
tags: [openerp, facturas, cancelaciones]
isDraft: false
---

Por defecto, **OpenERP** no permite cancelar una factura una vez que ha sido aprobada, ya que se han creado asientos contables, por lo que teóricamente no puede retroceder y borrarla. Sin embargo, en muchos casos es más conveniente cancelar una factura cuando hay un error que producir una nota de crédito y conciliar los dos asientos.

Se permitirá cancelar las facturas si se cumplen las dos condiciones siguientes:

1. **Los asientos contables no han sido reconciliados o pagados**: Si lo han sido, tendrá que cancelar la conciliación.
2. **El periodo contable o el año fiscal no han sido cerrados**: Si lo han sido, no hay modificación posible.

Para poder cancelar una factura, primero tendremos que cancelar el asiento correspondiente. Instalar el módulo disponible (`account_cancel`). Después, hay que ir a:

- **Contabilidad y finanzas > Configuración > Contabilidad financiera > Diarios financieros**

Y activar **"Permitir cancelación de asientos"** en cada diario necesario.

Cancelar una factura tiene el efecto de modificar automáticamente los asientos contables correspondientes.

Cuando la factura ha sido cancelada, se podrá regresar al estado borrador. Así, podrá modificarse y aprobarse nuevamente más tarde.

### Advertencia: Numeración de facturas

Después de cancelar una factura que no está regenerando, se encontrará con una ruptura en la numeración. Tendrá que ir y modificar la secuencia, rehacer la factura y reemplazar el número de secuencia con su valor original.

Puede controlar las secuencias usando el menú:
**Administración > Configuración > Secuencias > Secuencias**
