# Piedra, Papel o Tijera – Versión Beta

Este es un juego clásico de **Piedra, Papel o Tijera**, programado en un solo archivo HTML que funciona directamente en el navegador, sin necesidad de conexión a internet ni instalación adicional.

## 📜 Descripción

El juego permite elegir cuántas rondas quieres jugar (entre 1 y 11) y enfrentarte a una **IA simple** que selecciona su jugada de forma aleatoria.

Cada ronda tiene efectos sonoros y muestra en pantalla qué jugada ha hecho cada uno. Al final, el programa declara el resultado final y ofrece la opción de **reiniciar el juego**.

El juego está completamente adaptado para **móviles, tabletas y ordenadores**, con diseño responsivo y escalado de botones y textos.

## 🧠 Algoritmo de decisión

La IA escoge entre **rock, paper o scissors** de manera aleatoria. Las reglas del juego se implementan con una estructura clara:

```javascript
const rules = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
```

Esto significa:
- Piedra gana a Tijeras
- Papel gana a Piedra
- Tijeras gana a Papel

Si ambos eligen lo mismo, hay empate.

## ✨ Características principales

- 🎮 Interfaz clara y responsiva
- 🔊 Efectos de sonido en cada ronda y al terminar la partida
- 📱 Adaptado a todo tipo de pantallas
- 🧠 Algoritmo de decisión simple y eficiente
- 🧻 Usa **emojis de objetos reales**: roca, rollo de papel, tijera
- 🧪 Versión beta totalmente operativa

## 📁 Instrucciones de uso

1. Descarga el archivo `.html`.
2. Ábrelo con doble clic o desde cualquier navegador.
3. Introduce el número de rondas.
4. Elige tu jugada haciendo clic sobre uno de los tres botones.
5. El juego mostrará resultados, sumará puntos y, al final, mostrará el marcador total.

## 👨‍💻 Autor

[Introduce aquí tu nombre]

Este juego forma parte del proyecto educativo **“Programar desde cero”**, donde se aprenden conceptos de programación web mediante juegos, simulaciones y herramientas educativas.

## 🔧 Estado del proyecto

**Versión Beta Operativa**  
Funciona correctamente en todos los dispositivos.  
Pendiente de futuras ampliaciones como nuevos modos de juego, análisis de patrones del jugador o estrategias variables para la IA.

## 📤 Compartir y alojar

Puedes subir este archivo a GitHub como página pública o compartirlo como archivo. No necesitas instalar nada. Basta con tener un navegador moderno.

---
