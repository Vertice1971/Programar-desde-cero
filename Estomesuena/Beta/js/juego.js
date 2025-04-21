// ========  juego.js  =========
// Tomás Cuesta – Abril 2025
// -------------------------------------------
// Este script implementa la lógica principal del juego "Esto me suena"
// cumpliendo las especificaciones: modo individual y por turnos,
// opciones múltiples, temporizador, imágenes de fondo y control de rondas.

let cancionesDisponibles = [];
let cancionesFalladas = [];
const cancionesUsadas = new Set();

let numRondas = 0;
let rondaActual = 1;
let jugadores = [];
let jugadorActualIndice = 0;

let audioElement = null;
let temporizadorId = null;
let timeoutResultadoId = null;
let cuentaRegresiva = 6;

const imagenesJuego = [
  'imagenes/fondo1.jpg', 'imagenes/fondo2.jpg', 'imagenes/fondo3.jpg'
];
const imagenFinal = 'imagenes/final.jpg';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function aleatorio(max) {
  return Math.floor(Math.random() * max);
}

function elegirImagenFondo(lista) {
  const url = lista[aleatorio(lista.length)];
  document.body.style.backgroundImage = `url('${url}')`;

  if (lista.length === 1 && lista[0] === imagenFinal) {
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
  } else {
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }
}

function limpiarFondo() {
  document.body.style.backgroundImage = '';
}

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
    pedirConfiguracion();
  } catch (err) {
    console.error(err);
    alert('Error al acceder a la carpeta.');
  }
}

function pedirConfiguracion() {
  const maxRondas = cancionesDisponibles.length;

  let rondas;
  while (true) {
    const entrada = prompt(`¿Cuántas rondas quieres jugar? (1 ‑ ${maxRondas})`, '1');
    rondas = parseInt(entrada, 10);
    if (!isNaN(rondas) && rondas >= 1 && rondas <= maxRondas) break;
    alert(`Por favor, introduce un número entre 1 y ${maxRondas}.`);
  }
  numRondas = rondas;

  let numJugadores;
  while (true) {
    const entrada = prompt('¿Cuántos jugadores? (1 ‑ 4)', '1');
    numJugadores = parseInt(entrada, 10);
    if (!isNaN(numJugadores) && numJugadores >= 1 && numJugadores <= 4) break;
    alert('Introduce un número válido entre 1 y 4.');
  }

  jugadores = [];
  for (let i = 0; i < numJugadores; i++) {
    let nombre;
    do {
      nombre = prompt(`Nombre del jugador ${i + 1}:`, `Jugador ${i + 1}`);
    } while (!nombre || nombre.trim() === '');
    jugadores.push({ nombre: nombre.trim(), puntos: 0 });
  }

  renderPuntuaciones();
  $('#seleccionCarpeta').style.display = 'none';
  $('#zonaJuego').style.display = 'block';
  audioElement = $('#audio');
  siguienteRonda();
}

async function siguienteRonda() {
  if (rondaActual > numRondas || cancionesDisponibles.length === 0) {
    finalizarJuego();
    return;
  }

  $('#ronda').textContent = rondaActual;
  $('#infoTurno').textContent = `Turno de ${jugadores[jugadorActualIndice].nombre}`;

  const indice = aleatorio(cancionesDisponibles.length);
  const cancion = cancionesDisponibles[indice];

  await reproducirFragmento(cancion);
  mostrarOpciones(cancion);
  iniciarTemporizador(() => manejarRespuestaTiempoAgotado(cancion));
}

async function reproducirFragmento(cancion) {
  try {
    const file = await cancion.handle.getFile();
    const url = URL.createObjectURL(file);

    elegirImagenFondo(imagenesJuego);

    return new Promise((resolve) => {
      audioElement.src = url;
      audioElement.load();
      audioElement.onloadedmetadata = () => {
        const dur = audioElement.duration;
        const fragmento = 10;
        let inicio = 0;
        if (dur > fragmento + 5) {
          inicio = aleatorio(Math.floor(dur - fragmento - 5)) + 2;
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
  const otros = cancionesDisponibles.filter(c => c.titulo !== cancionCorrecta.titulo);
  while (opciones.length < 3 && otros.length) {
    const idx = aleatorio(otros.length);
    const extra = otros.splice(idx, 1)[0].titulo;
    if (!opciones.includes(extra)) opciones.push(extra);
  }

  opciones.sort(() => Math.random() - 0.5);

  for (const titulo of opciones) {
    const btn = document.createElement('button');
    btn.textContent = titulo;
    btn.classList.add('opcion-boton');
    btn.onclick = () => manejarRespuesta(titulo, cancionCorrecta);
    opcionesDiv.appendChild(btn);
  }
}

function iniciarTemporizador(onTimeout) {
  cuentaRegresiva = 6;
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
  continuarFlujoDespuesDeResultado();
}

function manejarRespuesta(tituloSeleccionado, cancionCorrecta) {
  pararTemporizador();

  // Desactiva todas las opciones una vez se ha hecho clic
  $$('#opciones .opcion-boton').forEach(btn => {
    btn.disabled = true;
  });

  const acierto = tituloSeleccionado === cancionCorrecta.titulo;

  if (acierto) {
    jugadores[jugadorActualIndice].puntos += 1;
    cancionesDisponibles = cancionesDisponibles.filter(c => c.titulo !== cancionCorrecta.titulo);
    cancionesUsadas.add(cancionCorrecta.titulo);
  } else {
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
  timeoutResultadoId = setTimeout(() => {
    const quedanRondas = rondaActual < numRondas || (jugadorActualIndice + 1) % jugadores.length !== 0;

    if (quedanRondas) {
      $('#avisoSiguiente').textContent = 'Próxima canción en 3 segundos…';
    }

    setTimeout(() => {
      $('#resultado').textContent = '';
      $('#avisoSiguiente').textContent = '';
      $('#opciones').innerHTML = '';
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

window.seleccionarCarpeta = seleccionarCarpeta;
