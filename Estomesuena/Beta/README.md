# Esto me suena

**Esto me suena** es una aplicación web educativa creada por **Tomás Cuesta** (tomcue@iesjuandelacierva.com), que permite trabajar la memoria auditiva, la atención y el reconocimiento musical a través de dos herramientas integradas:

- 🎵 Un **juego de adivinanza musical**, con rondas por turnos y puntuación.
- ✂️ Un **cortador de MP3**, que permite recortar fragmentos de audio directamente desde el navegador.

---

## 🎮 Modo juego: ¿Qué canción es?

Este modo permite jugar en clase o en casa escuchando fragmentos musicales y tratando de adivinar la canción entre varias opciones.

**Características:**
- Selección de una carpeta local con canciones `.mp3`.
- Configuración inicial: número de rondas y jugadores (de 1 a 4).
- Reproducción de un fragmento aleatorio de cada canción.
- Tres opciones de respuesta por turno (una correcta).
- Sonidos de acierto y error generados por la Web Audio API.
- Fondo visual dinámico que cambia con cada canción.
- Puntuación individual y marcador de rondas.
- Pantalla de resultado final con efectos visuales.

---

## ✂️ Modo cortador de MP3

Una herramienta que permite al alumnado o al profesorado:

- Cargar un archivo MP3 desde su dispositivo.
- Seleccionar un intervalo de tiempo (inicio y fin) en formato minutos/segundos.
- Descargar directamente el fragmento como archivo MP3.
- Sin necesidad de subir el archivo a ningún servidor.

La herramienta es útil para generar fragmentos breves con fines didácticos o para preparar nuevas rondas del juego.

---

## 📁 Estructura del proyecto

```
esto-me-suena/
├── index.html            ← Interfaz principal del juego y el cortador
├── css/
│   └── estilo.css        ← Estilos visuales del proyecto
├── js/
│   ├── juego.js          ← Lógica del juego de adivinanza musical
│   └── cortador.js       ← Lógica del recorte de MP3
├── imagenes/             ← Fondos del juego (no incluidos aquí)
└── README.md             ← Este archivo
```

---

## 🚀 Cómo usar

1. Descarga todos los archivos del proyecto.
2. Abre `index.html` en un navegador moderno (Chrome, Edge o compatible).
3. Desde el menú principal, elige:
   - **Jugar** → para el juego de reconocimiento musical.
   - **Cortar MP3** → para recortar un archivo de audio.

> Es necesario que el navegador soporte la API `showDirectoryPicker()` (solo disponible en navegadores Chromium actualizados).

---

## 🧠 Aplicaciones educativas

- Actividades lúdicas en clase de música o lengua.
- Juegos culturales con música de distintas épocas o géneros.
- Desarrollo de la memoria auditiva.
- Introducción práctica al manejo de audio digital.
- Trabajo colaborativo por equipos.

---

## 👤 Autor

Este proyecto ha sido creado por **Tomás Cuesta**, profesor de Filosofía y entusiasta de la programación didáctica.  
Abril de 2025.  
Uso libre para fines educativos.

---

## 📜 Licencia

Puedes usar, modificar y compartir este proyecto con fines educativos siempre que cites la autoría original.
