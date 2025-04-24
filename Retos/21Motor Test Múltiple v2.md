# Test de Opciones Múltiples – Versión 2
---

Esta es la **segunda versión** del test interactivo de opciones múltiples desarrollado por Tomás Cuesta. En esta versión se ha introducido un **sistema de penalización por error**, mejorando la fidelidad de la puntuación final y fomentando una evaluación más justa y precisa.

## ¿Qué mejora esta versión?

En la **versión original**, los errores no penalizaban. Esto podía llevar a que el alumnado respondiera al azar sin consecuencias, inflando la nota sin que realmente reflejara su comprensión del contenido.

En cambio, esta **nueva versión penaliza cada error** en proporción al valor de la pregunta. De este modo:

- **Aciertos suman** puntos hacia una nota final sobre 10.
- **Errores restan** una parte proporcional del valor de la pregunta, dependiendo del número de opciones incorrectas.

Así, la nota obtenida es un reflejo más ajustado del conocimiento real del alumnado, desincentivando el azar y premiando la reflexión.

## Instrucciones de uso

1. **Selecciona un archivo JSON** con preguntas de este tipo:
   ```json
   {
     "preguntas": [
       {
         "texto": "¿Cuál es la capital de Francia?",
         "opciones": {
           "a": "París",
           "b": "Roma",
           "c": "Madrid"
         },
         "respuesta": "a"
       }
     ]
   }


- Elige cuántas preguntas deseas jugar.
- Se mostrará una pregunta cada vez, con opciones **barajadas aleatoriamente**.
- Al hacer clic en una opción:
  - Si es **correcta**, se marca en **verde** y **suma puntos**.
  - Si es **incorrecta**, se marca en **rojo**, se muestra la opción correcta y se **aplica penalización** proporcional.
- Pulsa **Siguiente** para avanzar a la siguiente pregunta.
- Al finalizar el test, se muestra:
  - El **total de aciertos**.
  - La **nota final sobre 10**, con un mínimo de 0.
- Puedes **reiniciar** el test para jugar de nuevo con una nueva selección aleatoria.

## Características

- Sistema de evaluación con **penalización proporcional por error**.
- Control de avance **pregunta a pregunta**.
- Estilo visual **claro, animado y adaptado a móviles**.
- Puntuación **continua y nota final con decimales**.
- Opción de **reinicio completo** del test con nueva aleatorización.

## Tecnologías utilizadas

- **HTML5**
- **CSS3** (diseño moderno con animaciones, bordes y colores)
- **JavaScript** (gestión del DOM, lógica de evaluación, puntuación dinámica)

## Autor

**Tomás Cuesta**  
[Correo: tomcue@iesjuandelacierva.com](mailto:tomcue@iesjuandelacierva.com)
