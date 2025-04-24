# Test Verdadero/Falso
---

Este es un test interactivo que permite al usuario responder preguntas de tipo verdadero/falso, cargadas desde un archivo JSON. El número de preguntas se puede seleccionar antes de comenzar. Al finalizar, se muestra la puntuación obtenida y un resumen personalizado con retroalimentación para cada respuesta.

## Instrucciones

1. Prepara un **archivo JSON** con preguntas siguiendo este formato:
   ```json
   {
     "preguntas": [
       { "texto": "La Tierra gira alrededor del Sol.", "respuesta": true },
       { "texto": "El agua hierve a 80 grados.", "respuesta": false }
     ]
   }


### En la interfaz:

- Selecciona el archivo JSON.
- Indica cuántas preguntas deseas responder (por ejemplo, 10 o 20).
- Pulsa **Cargar Quiz** para empezar.

### Durante el test:

- Responde cada pregunta marcando la opción correcta.
  - Las respuestas se barajan aleatoriamente.
  - Puedes cambiar tu respuesta antes de enviar.

### Al finalizar:

- Pulsa **Enviar respuestas** para ver el resultado:
  - Se mostrará cuántas respuestas has acertado.
  - Cada pregunta incluirá un comentario indicando si tu respuesta fue correcta o no.
- Puedes repetir el test con otras preguntas usando el botón **Intentar de nuevo**.

## Características

- Interfaz clara y accesible con retroalimentación inmediata.
- Compatible con cualquier navegador moderno.
- Lectura dinámica de archivos JSON sin necesidad de conexión externa.
- Estilo visual sencillo y adaptado a su uso educativo.
- Soporta selección aleatoria del número de preguntas a mostrar.

## Tecnologías utilizadas

- **HTML5**
- **CSS3** (diseño adaptativo y resaltado de resultados)
- **JavaScript** (lectura de archivos, manejo del DOM, lógica de corrección)

## Autor

Tomás Cuesta  
[Correo: tomcue@iesjuandelacierva.com](mailto:tomcue@iesjuandelacierva.com)
