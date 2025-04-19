# Piedra, Papel, Tijera, Lagarto o Spock (Versión Definitiva)

Este es un juego web completo de **Piedra, Papel, Tijera, Lagarto o Spock**, inspirado en la famosa expansión del clásico juego. Está programado en un solo archivo HTML autocontenido, que puede ejecutarse directamente en cualquier navegador moderno. Esta versión incluye mejoras gráficas, lógica ampliada y un sistema de IA con tres estrategias.

## 🧠 Características principales

- Juego ampliado con cinco opciones: Piedra, Papel, Tijera, Lagarto y Spock.
- Posibilidad de seleccionar el número de rondas (hasta 11).
- Tres estrategias de la IA:
  - **Azar puro**
  - **Imitar al jugador**
  - **Responder con la jugada ganadora anterior**
- Puntuación y ronda visibles en todo momento.
- Sistema de audio con Web Audio API para cada tipo de resultado.
- Visualización responsiva adaptada a móviles, tablets y ordenadores.
- Uso de emojis visuales (🪨, 🧻, ✂️, 🦎, 🖖) para representar las jugadas.
- Código limpio, bien organizado y autocontenible.

## 🕹️ Instrucciones de uso

1. Abre el archivo `.html` en cualquier navegador moderno.
2. Indica cuántas rondas quieres jugar.
3. Elige una estrategia de la IA en el menú desplegable.
4. Pulsa "Comenzar juego".
5. Selecciona tu jugada pulsando uno de los cinco botones.
6. El juego se desarrollará ronda a ronda, y al finalizar mostrará el resultado global.
7. Puedes reiniciar el juego al finalizar la partida.

## 📄 Estructura del código

El archivo HTML contiene:

- **CSS interno** para el estilo visual, con diseño responsivo mediante media queries.
- **HTML estructurado** con una pantalla de configuración y otra de juego.
- **JavaScript embebido** que gestiona:
  - La lógica del juego ampliado (con nuevas relaciones entre las cinco opciones).
  - La elección de jugada de la IA según la estrategia.
  - El control de rondas, puntuación y mensajes.
  - El sistema de audio con distintos tonos para cada resultado.

## 🔊 Sonido

El juego utiliza la **Web Audio API** para emitir sonidos distintos cuando:

- Ganas una ronda
- Pierdes una ronda
- Empatas una ronda
- Finaliza la partida

## 👤 Autor
Tomás Cuesta

## 💡 Sugerencias para mejorar

- Añadir animaciones o efectos de transición entre jugadas.
- Mostrar un historial de jugadas anteriores.
- Incluir una sección de reglas con las relaciones entre las cinco opciones.
- Crear un modo de dos jugadores en local.

## ✅ Estado del proyecto

**Versión final y funcional.** Puedes compartirla, alojarla en GitHub Pages o modificarla libremente para tus propios proyectos educativos o de aprendizaje.

---
