document.addEventListener("DOMContentLoaded", () => {
  const playPauseButton = document.getElementById("playPauseButton");
  const progressBar = document.getElementById("progressBar");
  const currentTimeSpan = document.getElementById("currentTime");
  const durationSpan = document.getElementById("duration");
  const songImage = document.getElementById("songImage");
  const songTitle = document.getElementById("songTitle");
  const songArtist = document.getElementById("songArtist");
  const nextButton = document.getElementById("nextButton");
  const prevButton = document.getElementById("prevButton");
  const volumeButton = document.getElementById("volumeButton");
  const volumeBar = document.getElementById("volumeBar");
  const allItems = document.querySelectorAll('.item');
  const customPlayer = document.getElementById("customPlayer"); // Contenedor de la barra de reproducción

  let currentTrackIndex = -1;
  let isPlaying = false;
  const audio = new Audio(); // Único objeto de audio

  // Configuración inicial del volumen
  volumeBar.value = 0.5;
  audio.volume = 0.5;

  // Formatear tiempo en minutos y segundos
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  // Actualizar progreso y duración
  audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("loadedmetadata", () => {
    progressBar.max = audio.duration;
    durationSpan.textContent = formatTime(audio.duration);
  });

  progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
  });

  // Control de volumen
  volumeBar.addEventListener("input", () => {
    audio.volume = parseFloat(volumeBar.value);
  });

  volumeButton.addEventListener("click", () => {
    volumeBar.classList.toggle("hidden"); // Mostrar/ocultar barra de volumen
  });

  // Cargar y reproducir una pista
  function loadTrack(index) {
    const item = allItems[index];
    const img = item.querySelector("img").src;
    const title = item.querySelector("h4").textContent;
    const artist = item.querySelector("p").textContent;
    const audioSrc = item.querySelector("img").getAttribute("data-src");

    if (audio.src !== audioSrc) {
      audio.src = audioSrc;
      audio.load();
    }

    audio.play();
    isPlaying = true;
    currentTrackIndex = index;

    // Mostrar la barra de reproducción
    customPlayer.style.display = "flex";

    // Actualizar información del reproductor
    songImage.src = img;
    songTitle.textContent = title;
    songArtist.textContent = artist;
    playPauseButton.textContent = "⏸";
  }

  // Manejar clic en los elementos de la lista
  allItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (currentTrackIndex === index && isPlaying) {
        audio.pause();
        playPauseButton.textContent = "▶";
        isPlaying = false;
      } else {
        loadTrack(index);
      }
    });
  });

  // Botón de play/pausa
  playPauseButton.addEventListener("click", () => {
    if (!audio.src) return;
    if (audio.paused) {
      audio.play();
      playPauseButton.textContent = "⏸";
      isPlaying = true;
    } else {
      audio.pause();
      playPauseButton.textContent = "▶";
      isPlaying = false;
    }
  });

  // Botón de siguiente pista
  nextButton.addEventListener("click", () => {
    if (currentTrackIndex < allItems.length - 1) {
      loadTrack(currentTrackIndex + 1);
    }
  });

  // Botón de pista anterior
  prevButton.addEventListener("click", () => {
    if (currentTrackIndex > 0) {
      loadTrack(currentTrackIndex - 1);
    }
  });
});