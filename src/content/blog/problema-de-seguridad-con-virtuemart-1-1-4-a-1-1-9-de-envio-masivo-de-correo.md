---
title: Vulnerabilidad en Virtuemart 1.1.4 y 1.1.9 - Envío masivo de correos
date: 2014-03-13
description: Análisis de una grave vulnerabilidad en Virtuemart 1.1.4 a 1.1.9 que permite el envío masivo de correos, incluyendo detalles técnicos, solución propuesta y recomendaciones para mitigar el problema.
author: Francisco Javier Félix Belmonte
image: 'problema-de-seguridad-con-virtuemart-1-1-4-a-1-1-9-de-envio-masivo-de-correo'
category: 'seguridad'
tags: [seguridad, joomla, virtuemart]
isDraft: false
---

Recientemente, en uno de nuestros servidores se disparó una alarma por incremento de mensajes en cola. Al investigar el
origen del envío masivo, descubrimos que provenía de una web en _Joomla_ con **Virtuemart** 1.1.7. Al revisar el
registro de acceso del _Apache_, encontramos miles de accesos por **POST** similares a estos:

```bash
112.207.247.13 - - [13/Mar/2014:23:08:14 +0100] "POST /index2.php HTTP/1.1" 200 1731 "https://xxxxx.xxxxx.com/index2.php?page=shop.recommend&product_id=283&pop=1&tmpl=component&option=com_virtuemart&Itemid=2" "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0; iOpus-Web-Automation; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)"
112.207.247.13 - - [13/Mar/2014:23:08:15 +0100] "GET /templates/theme137 HTTP/1.1" 301 325 "https://xxxxx.xxxxx.com/index2.php" "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0; iOpus-Web-Automation; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)"
112.207.247.13 - - [13/Mar/2014:23:08:15 +0100] "POST /index2.php HTTP/1.1" 200 1750 "https://xxxxx.xxxxx.com/index2.php?page=shop.recommend&product_id=283&pop=1&tmpl=component&option=com_virtuemart&Itemid=2" "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0; iOpus-Web-Automation; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)"
```

### Para solucionar el problema

Hay que editar el fichero:

**`/administrator/components/com_virtuemart/html/shop.recommend.php`**

Y eliminar el siguiente bloque de código:

```php
include_once(CLASSPATH.'ps_communication.php');

$vm_mainframe->addStyleSheet( 'templates/'. $mainframe->getTemplate() );

if( empty( $_POST['submit'] ) || !$ok ) {
      $mainframe->setPageTitle( $VM_LANG->_('VM_RECOMMEND_FORM_LBL') );
      echo '<h3>'.$VM_LANG->_('VM_RECOMMEND_FORM_LBL').'</h3>';
      ps_communication::showRecommendForm($product_id);
}
else {
      $mainframe->setPageTitle( $VM_LANG->_('VM_RECOMMEND_FORM_LBL') );
      echo '<span class="contentheading">'. $VM_LANG->_('VM_RECOMMEND_DONE').' '. shopMakeHtmlSafe(vmGet($_POST,'recipient_mail')).'</span> <br />
            <br />
            <br />
            <a href="javascript:window.close();">
            <span class="small">'. $VM_LANG->_('PROMPT_CLOSE') .'</span>
            </a>';
}
```

Este código permite una suplantación de identidad y que servicios de _email spoofing_ aprovechen esta vulnerabilidad
para sus “clientes”.

Ya no se podrán realizar recomendaciones, pero al menos los atacantes tampoco.
Como solución más elegante se podría activar el recaptcha, pero lo mejor es que el cliente migre a Virtuemart 2.0.

Al principio no encontramos ninguna referencia, pero sí existe reporte del problema desde _2010_.
Lo grave del asunto es que hayan pasado 4 años sin que se informe a los usuarios ni se haya creado una versión con
parche desde Virtuemart para solucionarlo.

- [https://forum.virtuemart.net/index.php?topic=72804.0](https://forum.virtuemart.net/index.php?topic=72804.0)
