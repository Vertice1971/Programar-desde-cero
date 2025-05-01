function iniciarCortador() {
  const fileInput = document.getElementById('fileInput');
  const startMin = document.getElementById('startMin');
  const startSec = document.getElementById('startSec');
  const endMin = document.getElementById('endMin');
  const endSec = document.getElementById('endSec');
  const outputName = document.getElementById('outputName');
  const cutButton = document.getElementById('cutButton');
  const status = document.getElementById('status');

  let duracionAudio = 0;
  let archivoMP3 = null;

  fileInput.value = '';
  outputName.value = 'corte.mp3';
  status.textContent = '';
  cutButton.disabled = true;

  fileInput.addEventListener('change', () => {
    const archivo = fileInput.files[0];
    if (!archivo) return;
    if (archivo.type !== 'audio/mpeg' && !archivo.name.toLowerCase().endsWith('.mp3')) {
      alert('Por favor, selecciona un archivo MP3.');
      fileInput.value = '';
      return;
    }
    archivoMP3 = archivo;
    const audio = document.createElement('audio');
    audio.src = URL.createObjectURL(archivo);
    audio.addEventListener('loadedmetadata', () => {
      duracionAudio = audio.duration;
      const mins = Math.floor(duracionAudio / 60);
      const secs = Math.floor(duracionAudio % 60).toString().padStart(2, '0');
      status.textContent = `Duración: ${mins}:${secs}`;
      cutButton.disabled = false;
    });
  });

  cutButton.addEventListener('click', () => {
    const inicio = parseInt(startMin.value) * 60 + parseInt(startSec.value);
    const fin = parseInt(endMin.value) * 60 + parseInt(endSec.value);
    if (isNaN(inicio) || isNaN(fin) || inicio >= fin || fin > duracionAudio) {
      alert('Tiempos no válidos.');
      return;
    }
    const tamañoArchivo = archivoMP3.size;
    const byteInicio = Math.floor((inicio / duracionAudio) * tamañoArchivo);
    const byteFin = Math.floor((fin / duracionAudio) * tamañoArchivo);
    const fragmento = archivoMP3.slice(byteInicio, byteFin);
    const blob = new Blob([fragmento], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    let nombre = outputName.value.trim() || 'corte.mp3';
    if (!nombre.toLowerCase().endsWith('.mp3')) nombre += '.mp3';
    enlace.href = url;
    enlace.download = nombre;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    status.textContent = `Archivo generado: ${nombre}`;
  });
}
