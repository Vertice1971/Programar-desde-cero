# Piedra, Papel o Tijera (Versión Definitiva)

Este es un juego web completo de **Piedra, Papel o Tijera**, programado en un solo archivo HTML autocontenido, que puede ejecutarse directamente en cualquier navegador. La versión definitiva incorpora todas las funcionalidades previstas y ha superado la fase beta.

## 🧠 Características principales

- Juego clásico contra la máquina.
- Posibilidad de seleccionar el número de rondas (hasta 11).
- Tres estrategias de la IA:
  - **Azar puro**
  - **Imitar al jugador**
  - **Responder con la jugada ganadora anterior**
- Puntuación y ronda visibles en todo momento.
- Sistema de audio con Web Audio API para cada tipo de resultado.
- Visualización responsiva adaptada a móviles, tablets y ordenadores.
- Uso de emojis visuales (🪨, 🧻, ✂️) para representar las jugadas.
- Código limpio y bien organizado para facilitar su comprensión.

## 🕹️ Instrucciones de uso

1. Abre el archivo `.html` en cualquier navegador moderno.
2. Indica cuántas rondas quieres jugar.
3. Elige una estrategia de la IA en el menú desplegable.
4. Pulsa "Comenzar juego".
5. Selecciona tu jugada pulsando uno de los botones: Piedra, Papel o Tijera.
6. El juego se desarrollará ronda a ronda, y al finalizar mostrará el resultado global.

## 📄 Estructura del código

El archivo HTML contiene:

- **CSS interno** para el estilo visual, con diseño responsivo mediante media queries.
- **HTML estructurado** con una pantalla de configuración y otra de juego.
- **JavaScript embebido** que gestiona:
  - La lógica del juego
  - La elección de jugada de la IA según la estrategia
  - El control de rondas, puntuación y mensajes
  - El audio para los eventos clave

## 🔊 Sonido

El juego utiliza la **Web Audio API** para emitir sonidos diferentes cuando:

- Ganas una ronda
- Pierdes una ronda
- Empatas una ronda
- Finaliza la partida

## 👤 Autor
Tomás Cuesta

## 💡 Sugerencias para mejorar

- Añadir animaciones entre jugadas
- Incluir un botón de ayuda o reglas
- Guardar partidas anteriores en localStorage
- Crear una versión multijugador local

## ✅ Estado del proyecto

**Versión final y funcional.** Puedes compartirla, alojarla en GitHub Pages o modificarla libremente para tus propios proyectos educativos o de aprendizaje.

---
