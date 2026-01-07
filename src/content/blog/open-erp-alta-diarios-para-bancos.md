---
title: OPEN ERP Alta de nuevos diarios para bancos
date: 2012-08-23
description: Aprende cómo configurar diarios en OpenERP para gestionar de manera eficiente las transacciones contables de tu empresa, incluyendo bancos, ventas, compras y más.
author: Francisco Javier Félix Belmonte
image: "open-erp-alta-diarios-para-bancos"
category: "blog"
tags: [bancos, openerp, configuración]
isDraft: false
---

El diario es el lugar donde se registran los asientos contables. En **OpenERP** es mejor tener un diario para cada tipo
de asiento para facilitar su codificación. Por ejemplo, es habitual que una compañía tenga definidos todos estos
diarios:

- **General**: Para asientos varios: Nóminas, liquidaciones de impuestos, movimientos de capital, correcciones...
- **Ventas**: Para registrar las ventas (facturas de cliente).
- **Compras**: Para registrar las compras (facturas de proveedor).
- Uno para cada **banco/caja** con el que trabaje la compañía (se pueden crear fácilmente al ejecutar el asistente de
  creación del plan contable a partir de la plantilla).
- En **efectivo o caja**: Si se cobra/paga con dinero en efectivo.
- Pagos **Paypal o similar**: Si gestionan pagos por internet.
- **Stocks**: Para registrar el valor de las existencias.

La configuración de los diarios se realiza desde el menú:
**Contabilidad > Configuración > Contabilidad financiera > Diarios > Nuevo**

### Campos del formulario diario

- Nombre del diario.
- Código del diario.
- Tipo: Efectivo o Caja, Venta, Compra, General, Situación.
- Vista: Vista a usar en la introducción de apuntes.
- Secuencia del asiento: Numeración a usar en los asientos nuevos (normalmente la misma para todos).
- Cuenta debe por defecto, Cuenta haber por defecto: Requerido en los diarios de efectivo o caja, es la cuenta usada en
  la contrapartida del asiento realizado en este diario.
- Permitir cancelación de asientos: A tener en cuenta en diarios de ventas y compras. Si está desactivado, no se pueden
  cancelar las facturas.

### Ejemplo para crear un banco
