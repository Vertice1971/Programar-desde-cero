# Estadística 4º ESO

**Autor:** Tomás Cuesta  
**Contacto:** tomcue@iesjuandelacierva.com

---

## Descripción

Este programa es una aplicación web interactiva que simula tiradas de un dado con un número de caras configurable por el usuario. Permite generar una serie de tiradas aleatorias y analizar estadísticamente los resultados obtenidos. 

Está diseñado como herramienta didáctica para trabajar conceptos de estadística en el aula de manera visual y práctica.

---

## Funcionalidades

- **Simulación de tiradas:** el usuario elige el número de caras y el número de tiradas.
- **Visualización inmediata de los resultados.**
- **Tabla de frecuencias** que incluye:
  - Frecuencia absoluta (fi)
  - Frecuencia acumulada (Fi)
  - Frecuencia relativa (hi)
  - Frecuencia acumulada relativa (Hi)
- **Cálculo opcional de:**
  - Moda (resaltada en la tabla)
  - Media
  - Varianza
  - Desviación típica
  - Coeficiente de variación (CV)
- **Visualización interactiva de la mediana** con distribución de rangos por cara.
- **Visualización de cuartiles (Q1, Q2, Q3)** con colores diferenciados.
- **Cálculo de percentiles personalizados**, con resaltado específico.
- **Interfaz clara, sin dependencias externas**, totalmente autocontenida en un archivo `.html`.

---

## Uso

1. Abrir el archivo `simulador_dado.html` en cualquier navegador moderno.
2. Introducir el número de caras del dado y el número de tiradas.
3. Pulsar “Tirar dado”.
4. Analizar los resultados o acceder a la tabla de frecuencias y representaciones visuales.

---

## Tecnologías empleadas

- **HTML + CSS + JavaScript puro**
- PRNG avanzado: `xoshiro128**` con `splitmix32` para obtener aleatoriedad reproducible y de calidad.

---

## Autoría

Este programa ha sido desarrollado por **Tomás Cuesta**, profesor de Filosofía y divulgador didáctico, como parte de un conjunto de herramientas educativas orientadas a la enseñanza práctica de la lógica, la estadística y el pensamiento científico.

---
