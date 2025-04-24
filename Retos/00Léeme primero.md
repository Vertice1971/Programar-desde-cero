# RETOS DE PROGRAMACIÓN

En esta carpeta alojamos todas las soluciones de los retos del libro *“Aprender a programar desde cero (realmente) usando la Inteligencia Artificial”*.  
Lee primero estos retos, estas instrucciones, y después de hallar tus propias soluciones hombro con hombro junto a tu IA favorita, compáralas con las mías que tienes adjuntas en la carpeta de este documento.

---

## 1. ADIVINA EL NÚMERO

**Descripción funcional del juego "Adivina el número"**

Vas a programar un pequeño juego de adivinanza con las siguientes características:

### 1. Pantalla de inicio con menú de selección de modo:
- **Modo Fácil**: se indica si el número secreto es más alto o más bajo.
- **Modo Difícil**: además de "más alto" o "más bajo", se indica si te estás acercando o alejando.

### 2. Configuración inicial:
- Selección del número máximo de intentos (entre 1 y 10).
- Una vez confirmado, la partida comienza sin posibilidad de cambio.

### 3. Desarrollo del juego:
- El programa genera un número entre 1 y 100.
- El jugador introduce números y recibe pistas.
- Mensajes de éxito o fracaso al final del juego.

### 4. Interfaz:
- Muestra intentos usados y restantes.
- Mensajes visuales y sonidos para aciertos y errores.

### 5. Reinicio:
- Botón para volver al menú principal y reiniciar todo.

---

## 2. PAREJAS – Juego de Memoria

**Descripción funcional del "Juego de Memoria"**

### Fases del juego:

#### 1. Selección inicial:
- Elección del número de parejas (2 a 10).
- Tablero con el doble de cartas (una pareja por figura).

#### 2. Dinámica de juego:
- Cartas ocultas por defecto.
- Gira dos por turno. Si coinciden, se quedan descubiertas.
- Sonidos distintos para aciertos y fallos.

#### 3. Fin de partida:
- Mensaje de felicitación.
- Botón de "Reiniciar" con nueva selección de parejas.

### Características visuales y técnicas:
- Tablero adaptable en cuadrícula.
- Figuras con CSS: círculos, estrellas, corazones...
- Animación de giro 3D.
- Uso de arrays, lógica condicional y CSS moderno.

---

### 2 PLUS: DOBLE RETO EXTRA – Verbos Irregulares en Inglés

**Adaptación del juego de memoria para repasar verbos irregulares:**

- Cartas con:
  - Infinitivo + traducción
  - Participio pasado en inglés  
  _Ejemplo: `go - ir` ↔ `gone`_

#### Requisitos adicionales:
- Preguntar número de jugadores y sus nombres.
- Turnos alternos con marcador visible.
- Sonidos con Web Audio API (beep agudo y grave).
- Resultado final (individual o competitivo).
- Botón para volver al menú inicial.

**Criterios de código:**
- HTML autocontenido.
- Buen diseño, sin recursos externos.
- Uso de arrays, condicionales y DOM.

---

### ¡Y ahora en francés!

**Versión en Passé Composé**

- Infinitivo + traducción ↔ forma compuesta en francés.  
  _Ejemplo: `aller – ir` ↔ `je suis allé`_

#### Igual que en la versión inglesa, pero con:
- Participios compuestos: `je suis/j’ai + participio`
- Máximo de 15 parejas por jugabilidad.
- Todos los efectos y funcionalidades previas.

---

## 3. RETOS “ARREGLA LOS CÓDIGOS TITULADOS 99…”

**Archivos:** Ahorcado, Clic, Simón, Tanque, Tres en raya.  
**Objetivo:** Revisar, depurar, mejorar. ¡Usa tu IA como aliada!

### Algunas ideas:
- **Ahorcado**: repasa animaciones (piernas...).
- **Clic**: mejora dinámicas y visibilidad.
- **Simón**: revisa tolerancia de errores.
- **Tanque**: mejora interfaz, añade otro tanque, barra de daño.
- **Tres en raya**: interfaz, colores, animaciones, dificultad.

---

## 4. TRES RETOS A PARTIR DEL TEST MÚLTIPLE

### Primer reto:
**Crear versiones autocontenidas de test por tema.**
- Insertar el JSON directamente en el HTML.
- Evitar tener que cargar archivos por separado.

### Segundo reto:
**Test de verdadero/falso**
- Cambiar estructura HTML + JSON.
- Afirmación + campo booleano.

### Tercer reto:
**Penalización por errores**
- Según número de opciones:
  - 3 opciones → -0.5 por fallo
  - 4 opciones → -0.33 por fallo
  - V/F → -1 por fallo

**Resultado:**  
Un test más exigente, más justo y más parecido a un examen real.

---
