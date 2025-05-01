// ======== juego.js adaptado al español =========
// Tomás Cuesta – Versión final coherente
// ---------------------------------------------

let cancionesDisponibles = [];
let cancionesFallidas = [];
const cancionesUsadas = new Set();

let numRondas = 0;
let rondaActual = 1;
let jugadores = [];
let jugadorActualIndex = 0;

let audioElement = null;
let temporizadorId = null;
let timeoutResultadoId = null;
let cuentaAtras = 6;

const imagenesJuego = [
  'imagenes/fondo1.jpg', 'imagenes/fondo2.jpg', 'imagenes/fondo3.jpg'
];
const imagenFinal = 'imagenes/final.jpg';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function aleatorio(max) {
  return Math.floor(Math.random() * max);
}

// (opcional) función de beep vacía (pendiente de implementar sonido)
function reproducirBeep(tipo = 'acierto') {
  // pendiente de añadir sonido
}

function elegirImagenFondo(lista) {
  const url = lista[aleatorio(lista.length)];
  document.body.style.backgroundImage = `url('${url}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center';
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
      alert('No se han encontrado archivos MP3 en la carpeta seleccionada.');
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
    const entrada = prompt(`¿Cuántas rondas quieres jugar? (1 ‑ ${maxRondas})`, '10');
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

  renderizarPuntuaciones();
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
  $('#infoTurno').textContent = `Turno de ${jugadores[jugadorActualIndex].nombre}`;

  const index = aleatorio(cancionesDisponibles.length);
  const cancion = cancionesDisponibles[index];

  await reproducirFragmento(cancion);
  mostrarOpciones(cancion);
  iniciarTemporizador(() => gestionarRespuestaTiempoAgotado(cancion));
}

async function reproducirFragmento(cancion) {
  try {
    const archivo = await cancion.handle.getFile();
    const url = URL.createObjectURL(archivo);

    elegirImagenFondo(imagenesJuego);

    return new Promise((resolve) => {
      audioElement.src = url;
      audioElement.load();
      audioElement.onloadedmetadata = () => {
        const duracion = audioElement.duration;
        const fragmento = 10;
        let inicio = 0;
        if (duracion > fragmento + 5) {
          inicio = aleatorio(Math.floor(duracion - fragmento - 5)) + 2;
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
    alert('No se ha podido reproducir el fragmento. Pasamos a la siguiente canción.');
  }
}

function mostrarOpciones(cancionCorrecta) {
  const contenedor = $('#opciones');
  contenedor.innerHTML = '';

  const opciones = [cancionCorrecta.titulo];
  const otras = cancionesDisponibles.filter(c => c.titulo !== cancionCorrecta.titulo);
  while (opciones.length < 3 && otras.length) {
    const idx = aleatorio(otras.length);
    const extra = otras.splice(idx, 1)[0].titulo;
    if (!opciones.includes(extra)) opciones.push(extra);
  }

  opciones.sort(() => Math.random() - 0.5);

  for (const titulo of opciones) {
    const btn = document.createElement('button');
    btn.textContent = titulo;
    btn.classList.add('opcion-boton');
    btn.onclick = () => gestionarRespuesta(titulo, cancionCorrecta);
    contenedor.appendChild(btn);
  }
}

function iniciarTemporizador(onTimeout) {
  cuentaAtras = 15;
  $('#temporizador').textContent = `Tiempo: ${cuentaAtras}s`;
  temporizadorId = setInterval(() => {
    cuentaAtras--;
    $('#temporizador').textContent = `Tiempo: ${cuentaAtras}s`;
    if (cuentaAtras <= 0) {
      clearInterval(temporizadorId);
      onTimeout();
    }
  }, 1000);
}

function pararTemporizador() {
  if (temporizadorId) clearInterval(temporizadorId);
  $('#temporizador').textContent = '';
}

function gestionarRespuestaTiempoAgotado(cancion) {
  reproducirBeep('error');
  mostrarResultado(false, cancion.titulo, '¡Tiempo agotado!');
  continuarTrasResultado();
}

function gestionarRespuesta(tituloSeleccionado, cancionCorrecta) {
  pararTemporizador();

  $$('#opciones .opcion-boton').forEach(btn => {
    btn.disabled = true;
  });

  const acierto = tituloSeleccionado === cancionCorrecta.titulo;

  if (acierto) {
    reproducirBeep('acierto');
    jugadores[jugadorActualIndex].puntos += 1;
    cancionesDisponibles = cancionesDisponibles.filter(c => c.titulo !== cancionCorrecta.titulo);
    cancionesUsadas.add(cancionCorrecta.titulo);
  } else {
    reproducirBeep('error');
    cancionesFallidas.push(cancionCorrecta);
  }

  mostrarResultado(acierto, cancionCorrecta.titulo);
  renderizarPuntuaciones();
  continuarTrasResultado();
}

function mostrarResultado(acierto, tituloCorrecto, textoExtra = '') {
  const res = $('#resultado');
  res.textContent = acierto ? `✅ ¡Correcto! Era "${tituloCorrecto}".` : `❌ Incorrecto. Era "${tituloCorrecto}".`;
  if (textoExtra) res.textContent += '\n' + textoExtra;
}

function continuarTrasResultado() {
  timeoutResultadoId = setTimeout(() => {
    $('#avisoSiguiente').textContent = 'Siguiente canción en 3 segundos…';
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
  jugadorActualIndex = (jugadorActualIndex + 1) % jugadores.length;
  if (jugadorActualIndex === 0) {
    rondaActual += 1;
  }
}

function renderizarPuntuaciones(final = false) {
  const cont = $('#puntuaciones');
  cont.innerHTML = '';
  jugadores.forEach(j => {
    const p = document.createElement('p');
    p.textContent = `${j.nombre}: ${j.puntos} punto(s)`;
    if (final) p.classList.add('final-puntuacion');
    cont.appendChild(p);
  });
}

function finalizarJuego() {
  elegirImagenFondo([imagenFinal]);

  $('#infoTurno').textContent = 'Fin de la partida';
  $('#infoTurno').classList.add('final-texto');

  $('#resultado').textContent = 'Marcador final:';
  $('#resultado').classList.add('final-texto');

  $('#ronda').parentElement.classList.add('puntuacion-final');

  renderizarPuntuaciones(true);

  $('#opciones').innerHTML = '';
  $('#temporizador').textContent = '';
}

window.seleccionarCarpeta = seleccionarCarpeta;
