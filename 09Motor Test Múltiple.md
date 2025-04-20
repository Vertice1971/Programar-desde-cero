# Motor de Test de Respuestas Múltiples en HTML + JavaScript

**Autor:** Tomás Cuesta  
**Contacto:** tomcue@iesjuandelacierva.com

Este proyecto permite ejecutar tests tipo test (de respuestas múltiples con una opción correcta) directamente en el navegador. Es una herramienta pensada para uso educativo con alumnado de 4º de ESO o Bachillerato.

---

## 🧪 ¿Qué hace este motor?

- Carga un archivo `.json` con preguntas tipo test.
- Permite elegir cuántas preguntas deseas contestar.
- Baraja las preguntas y las opciones al azar.
- Muestra retroalimentación visual tras cada respuesta.
- Informa al final del número total de aciertos.
- Todo funciona de forma local en el navegador.

---

## 📁 Estructura del JSON

El archivo `.json` debe tener esta estructura:

```json
{
  "preguntas": [
    {
      "texto": "¿Cuál fue una de las causas principales de la Revolución Francesa?",
      "opciones": {
        "a": "El descubrimiento de América",
        "b": "La crisis económica y social del Antiguo Régimen",
        "c": "La guerra de Sucesión Española"
      },
      "respuesta": "b"
    }
  ]
}
```

### 🔍 Detalles importantes:

- `"texto"`: es el enunciado de la pregunta.
- `"opciones"`: un objeto con claves `"a"`, `"b"`, `"c"`… y sus textos.
- `"respuesta"`: contiene la **clave** de la opción correcta, no el texto literal.

Puedes usar más de tres opciones si lo deseas (añadiendo `"d"`, `"e"`, etc.).

---

## 🧠 Cómo generar preguntas con IA

Puedes generar tu archivo `.json` usando inteligencia artificial. Simplemente copia tus apuntes y pide:

> “Genera 30 preguntas tipo test con una sola respuesta correcta en formato JSON usando esta plantilla…”

Después, facilítale esta plantilla:

```json
{
  "preguntas": [
    {
      "texto": "Texto de la pregunta",
      "opciones": {
        "a": "Texto opción A",
        "b": "Texto opción B",
        "c": "Texto opción C"
      },
      "respuesta": "b"
    }
  ]
}
```

Revisa que el formato se mantenga para evitar errores al cargar.

---

## 🚀 Cómo usar el test

1. Abre el archivo `index.html` en tu navegador (doble clic o arrástralo al navegador).
2. Pulsa en “Selecciona el archivo JSON” y escoge el archivo con las preguntas.
3. El sistema indicará cuántas preguntas hay y podrás elegir cuántas deseas contestar.
4. Pulsa “Comenzar Quiz” y empieza el test.

---

## 💡 Recomendaciones

- Guarda siempre los `.json` localmente en tu dispositivo.
- Usa nombres claros como `genetica4eso.json`, `revolucionfrancesa.json`…
- Si algo no funciona, asegúrate de que el archivo `.json` esté bien formado.

---

## 🎨 Personalización

Puedes editar el diseño visual y los comportamientos desde:

- El bloque `<style>` para colores, tipografía y disposición.
- El bloque `<script>` para ajustar comportamiento (número de intentos, retroalimentación, puntuaciones, etc.).

---

## 🛠️ Requisitos técnicos

- Cualquier navegador moderno (Chrome, Firefox, Edge, Brave…).
- No requiere instalación ni conexión a internet.
- Compatible con Windows, Linux, Mac y tabletas.

---

## 📚 Aplicaciones educativas

- Evaluación previa o repaso final.
- Juego interactivo en clase.
- Trabajo individual con autocorrección.
- Proyecto grupal para que el alumnado cree su propio test.

---

## 🛡️ Licencia

Uso libre y educativo. Si mejoras el proyecto, compártelo con otros docentes.  
Tomás Cuesta – IES Juan de la Cierva

`