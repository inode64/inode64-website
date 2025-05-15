---
title: Gestión de Unidades en Negativo en OPEN ERP
date: 2012-08-22
description: Una guía sobre cómo gestionar pedidos de venta con unidades en negativo en OpenERP, incluyendo soluciones prácticas y recomendaciones para evitar errores en el control de inventarios.
author: Francisco Javier Félix Belmonte
image: 'open-erp-unidades-en-negativo'
category: 'blog'
tags: [openerp, unidades, pedidos]
isDraft: false
---

### **Pedidos de venta con unidades en negativo**

Queremos realizar un pedido para después facturarlo y tenemos que devolver la cantidad del servicio o producto a un
cliente, sea por equivocación, producto defectuoso, etc.

Si en un pedido de venta añade líneas de pedido con unidades en negativo, en el momento de guardar el presupuesto saldrá
el mensaje:
**¡Datos insuficientes! ¡Compruebe la cantidad en la(s) orden(es) de abastecimiento, no debería ser inferior a 1!**

**Solución:** se puede hacer un pedido de venta con unidades en negativo si la línea del pedido no está relacionada con
ningún producto en concreto, es decir, si no le pones el nombre, descripción, precio e IVA a mano, ya que entonces no se
calculan abastecimientos para esa línea. Cuando se elabora la factura desde el pedido, OpenERP llevará esa línea a la
factura.

Siempre debemos llevar un control de nuestros productos en el almacén.
