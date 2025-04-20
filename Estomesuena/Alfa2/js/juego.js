// ========  juego.js  =========
// Autor: adaptado para Tomás Cuesta – Abril 2025
// -------------------------------------------
// Este script implementa la lógica principal del juego "Esto me suena"
// cumpliendo las especificaciones: modo individual y por turnos,
// opciones múltiples, temporizador, imágenes de fondo y control de rondas.

// ---------------- VARIABLES GLOBALES ----------------
let cancionesDisponibles = [];      // Canciones sin usar todavía
let cancionesFalladas = [];         // Canciones falladas que pueden repetirse
const cancionesUsadas = new Set();  // Títulos ya acertados

let numRondas            = 0;       // Rondas elegidas por el usuario
let rondaActual          = 1;       // Contador visible
let jugadores            = [];      // [{nombre, puntos}]
let jugadorActualIndice  = 0;       // Índice del array jugadores

let audioElement         = null;    // <audio id="audio">
let temporizadorId       = null;    // Interval para la cuenta de 15 s
let cuentaRegresiva      = 15;      // Segundos restantes para responder

// Imágenes de fondo (añade tus propias rutas en /imagenes/)
const imagenesJuego      = [
  'imagenes/fondo1.jpg', 'imagenes/fondo2.jpg', 'imagenes/fondo3.jpg'
];
const imagenFinal        = 'imagenes/final.jpg';

// -------------  UTILERÍA -------------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function aleatorio(max) {
  return Math.floor(Math.random() * max);
}

function elegirImagenFondo(lista) {
  const url = lista[aleatorio(lista.length)];
  document.body.style.backgroundImage    = `url('${url}')`;
  document.body.style.backgroundSize     = 'cover';
  document.body.style.backgroundPosition = 'center';
}

function limpiarFondo() {
  document.body.style.backgroundImage = '';
}

// -------------  SELECCIÓN DE CARPETA -------------
async function seleccionarCarpeta() {
  try {
    if (!('showDirectoryPicker' in window)) {
      alert('Tu navegador no soporta la API showDirectoryPicker()');
      return;
    }

    const dirHandle = await window.showDirectoryPicker();

    cancionesDisponibles = [];
    for await (const [nombre, handle] of dirHandle.entries()) {
      if (handle.kind === 'file' && nombre.toLowerCase().endsWith('.mp3')) {
        cancionesDisponibles.push({
          titulo: nombre.replace(/\.mp3$/i, ''),
          handle
        });
      }
    }

    if (cancionesDisponibles.length === 0) {
      alert('No se encontraron MP3 en la carpeta seleccionada.');
      return;
    }

    $('#numCanciones').textContent = `Canciones cargadas: ${cancionesDisponibles.length}`;

    // Pedir configuración inicial
    pedirConfiguracion();
  } catch (err) {
    console.error(err);
    alert('Error al acceder a la carpeta.');
  }
}

// -------------  CONFIGURACIÓN INICIAL -------------
function pedirConfiguracion() {
  // Número de rondas (hasta el nº de canciones disponibles)
  const maxRondas = cancionesDisponibles.length;
  let rondas = parseInt(prompt(`¿Cuántas rondas quieres jugar? (1 ‑ ${maxRondas})`, '10'), 10);
  if (isNaN(rondas) || rondas < 1 || rondas > maxRondas) rondas = maxRondas;
  numRondas = rondas;

  // Número de jugadores
  let numJugadores = parseInt(prompt('¿Cuántos jugadores? (1 ‑ 10)', '1'), 10);
  if (isNaN(numJugadores) || numJugadores < 1) numJugadores = 1;

  jugadores = [];
  for (let i = 0; i < numJugadores; i++) {
    const nombre = prompt(`Nombre del jugador ${i + 1}:`, `Jugador ${i + 1}`) || `Jugador ${i + 1}`;
    jugadores.push({ nombre, puntos: 0 });
  }

  // Actualizar visor de puntuaciones
  renderPuntuaciones();

  // Ocultar selector / mostrar zona de juego
  $('#seleccionCarpeta').style.display = 'none';
  $('#zonaJuego').style.display        = 'block';

  audioElement = $('#audio');
  siguienteRonda();
}

// -------------  JUEGO PRINCIPAL -------------
async function siguienteRonda() {
  if (rondaActual > numRondas || cancionesDisponibles.length === 0) {
    finalizarJuego();
    return;
  }

  // Mostrar ronda y turno actual
  $('#ronda').textContent = rondaActual;
  $('#infoTurno').textContent = `Turno de ${jugadores[jugadorActualIndice].nombre}`;

  // Elegir canción de manera aleatoria (sin repetida acertada)
  const indice = aleatorio(cancionesDisponibles.length);
  const cancion = cancionesDisponibles[indice];
  // No la quitamos aún: solo si se acierta la quitaremos; si se falla, podrá repetirse.

  // Reproducir fragmento de 10 s
  await reproducirFragmento(cancion);

  // Generar opciones
  mostrarOpciones(cancion);

  // Iniciar temporizador de respuesta
  iniciarTemporizador(() => manejarRespuestaTiempoAgotado(cancion));
}

async function reproducirFragmento(cancion) {
  try {
    const file = await cancion.handle.getFile();
    const url  = URL.createObjectURL(file);

    // Cambiar fondo antes de reproducir
    elegirImagenFondo(imagenesJuego);

    return new Promise((resolve) => {
      audioElement.src = url;
      audioElement.load();
      audioElement.onloadedmetadata = () => {
        const dur = audioElement.duration;
        const fragmento = 10; // segundos que sonarán
        let inicio = 0;
        if (dur > fragmento + 5) {
          inicio = aleatorio(Math.floor(dur - fragmento - 5)) + 2; // margen 2 s al inicio y fin
        }
        audioElement.currentTime = inicio;
        audioElement.play();
        setTimeout(() => {
          audioElement.pause();
          URL.revokeObjectURL(url);
          resolve();
        }, fragmento * 1000);
      };
    });
  } catch (e) {
    console.error(e);
    alert('No se pudo reproducir un fragmento. Se pasará a la siguiente canción.');
  }
}

function mostrarOpciones(cancionCorrecta) {
  const opcionesDiv = $('#opciones');
  opcionesDiv.innerHTML = '';

  const opciones = [cancionCorrecta.titulo];
  // Añadir 2 títulos falsos aleatorios
  const otros = cancionesDisponibles.filter(c => c.titulo !== cancionCorrecta.titulo);
  while (opciones.length < 3 && otros.length) {
    const idx = aleatorio(otros.length);
    const extra = otros.splice(idx, 1)[0].titulo;
    if (!opciones.includes(extra)) opciones.push(extra);
  }

  // Barajar opciones
  opciones.sort(() => Math.random() - 0.5);

  for (const titulo of opciones) {
    const btn = document.createElement('button');
    btn.textContent = titulo;
    btn.onclick = () => manejarRespuesta(titulo, cancionCorrecta);
    opcionesDiv.appendChild(btn);
  }
}

function iniciarTemporizador(onTimeout) {
  cuentaRegresiva = 15;
  $('#temporizador').textContent = `Tiempo: ${cuentaRegresiva}s`;
  temporizadorId = setInterval(() => {
    cuentaRegresiva--;
    $('#temporizador').textContent = `Tiempo: ${cuentaRegresiva}s`;
    if (cuentaRegresiva <= 0) {
      clearInterval(temporizadorId);
      onTimeout();
    }
  }, 1000);
}

function pararTemporizador() {
  if (temporizadorId) clearInterval(temporizadorId);
  $('#temporizador').textContent = '';
}

function manejarRespuestaTiempoAgotado(cancion) {
  mostrarResultado(false, cancion.titulo, '¡Tiempo agotado!');
  // Canción se marca como fallada pero sigue disponible → no sacamos de la lista
  continuarFlujoDespuesDeResultado();
}

function manejarRespuesta(tituloSeleccionado, cancionCorrecta) {
  pararTemporizador();
  const acierto = tituloSeleccionado === cancionCorrecta.titulo;

  // Actualizar puntos si acierta
  if (acierto) {
    jugadores[jugadorActualIndice].puntos += 1;
    // Retirar canción de disponibles
    cancionesDisponibles = cancionesDisponibles.filter(c => c.titulo !== cancionCorrecta.titulo);
    cancionesUsadas.add(cancionCorrecta.titulo);
  } else {
    // Marcar como fallada (pero no se elimina, puede repetirse)
    cancionesFalladas.push(cancionCorrecta);
  }

  mostrarResultado(acierto, cancionCorrecta.titulo);
  renderPuntuaciones();
  continuarFlujoDespuesDeResultado();
}

function mostrarResultado(acierto, tituloCorrecto, textoExtra = '') {
  const res = $('#resultado');
  res.textContent = acierto ? `✅ ¡Correcto! Era "${tituloCorrecto}".` : `❌ Incorrecto. Era "${tituloCorrecto}".`;
  if (textoExtra) res.textContent += '\n' + textoExtra;
}

function continuarFlujoDespuesDeResultado() {
  // Mostrar aviso 3 s después de los 7 s de resultado
  setTimeout(() => {
    $('#avisoSiguiente').textContent = 'Próxima canción en 3 segundos…';
    setTimeout(() => {
      $('#resultado').textContent     = '';
      $('#avisoSiguiente').textContent = '';
      $('#opciones').innerHTML        = '';
      limpiarFondo();
      avanzarTurno();
      siguienteRonda();
    }, 3000);
  }, 7000);
}

function avanzarTurno() {
  jugadorActualIndice = (jugadorActualIndice + 1) % jugadores.length;
  if (jugadorActualIndice === 0) {
    rondaActual += 1;
  }
}

function renderPuntuaciones() {
  const cont = $('#puntuaciones');
  cont.innerHTML = '';
  jugadores.forEach((j) => {
    const p = document.createElement('p');
    p.textContent = `${j.nombre}: ${j.puntos} punto(s)`;
    cont.appendChild(p);
  });
}

function finalizarJuego() {
  elegirImagenFondo([imagenFinal]);
  $('#infoTurno').textContent = 'Fin de la partida';
  $('#resultado').textContent = 'Marcador final:';
  renderPuntuaciones();
  $('#opciones').innerHTML = '';
  $('#temporizador').textContent = '';
}

// -------------  EXPOSICIÓN DE FUNCIONES GLOBALES -------------
// Hacemos accesibles sólo las necesarias para index.html
window.seleccionarCarpeta = seleccionarCarpeta;
// -------------------------------------------------------------
