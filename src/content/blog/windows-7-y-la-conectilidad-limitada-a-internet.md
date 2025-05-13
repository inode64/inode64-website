---
title: Windows 7 y la conectilidad limitada a internet
date: 2011-09-26
description: Explicación del mensaje de conectividad limitada en Windows 7, sus diferencias con versiones anteriores y cómo afecta a la red local.
author: Francisco Javier Félix Belmonte
image: 'windows-7-y-la-conectilidad-limitada-a-internet'
category: 'blog'
tags: [windows, internet, conectividad, red]
isDraft: false
---

En las últimas versiones de **Windows 7** se ha añadido un nuevo mensaje de aviso cuando no hay conectividad con Internet. Esto puede causar confusión, ya que en **Windows XP** un mensaje similar —"Conexión nula o limitada"— indicaba que el ordenador no estaba conectado a la red o que el servidor [DHCP](http://es.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) no le había asignado una IP.

En **Windows 7**, sin embargo, el significado es diferente: este mensaje aparece si el servidor DHCP no proporciona la puerta de enlace predeterminada (gateway), o si esta no está configurada correctamente. Como resultado, se muestra el aviso de conectividad limitada, aunque en realidad la red local funciona perfectamente.
