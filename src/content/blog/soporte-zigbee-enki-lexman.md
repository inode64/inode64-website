---
title: Añadimos soporte Zigbee para el motor tubular ENKI Lexman
date: 2025-09-22
description: Nuevo dispositivo disponible para el ecosistema Zigbee2MQTT el motor tubular ENKI Lexman Ø40 mm 10 Nm, ideal para persianas y cortinas motorizadas.
author: Francisco Javier Félix Belmonte
image: 'enki-lexman-wsd005'
category: 'blog'
tags: [zigbee, zigbee2mqtt, domótica, iot, motor-tubular, adeo-wsd005, home-assistant]
isDraft: false
---

# Soporte Zigbee para el motor tubular ENKI Lexman Ø40 mm · 10 Nm (Leroy Merlin) en Zigbee2MQTT


> Hemos contribuido a la comunidad **Zigbee2MQTT** añadiendo compatibilidad con el motor tubular **ENKI Lexman Ø40 mm · 10 Nm** (referencia **ADEO WSD005**).
> Esto permite controlar persianas con **Zigbee** desde **Home Assistant** (y cualquier plataforma compatible con Zigbee2MQTT), incluyendo **abrir / cerrar / stop / posición**.

---

## ¿Qué hemos publicado?

- **Nueva compatibilidad en `zigbee-herdsman-converters`:** definición del dispositivo **ADEO WSD005** (ENKI Lexman, *roller shutter*).
  <https://github.com/Koenkk/zigbee-herdsman-converters/commit/628a967627544f338676c5d573ff0b9860b9e54a>

- **Actualización de documentación (`zigbee2mqtt.io`):** entrada específica para el modelo.
  <https://github.com/Koenkk/zigbee2mqtt.io/commit/4df9f04dc0c91603b9f35566422e927e72a8aec1>


#### Gracias a estas aportaciones, el motor se reconoce en Zigbee2MQTT como **actuador de persiana** y expone las acciones habituales (**abrir**, **cerrar**, **detener** y **posición**).
