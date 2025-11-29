"use strict";

/* -------------------------------------------------------
   GLOBAL FUNCTIONS
------------------------------------------------------- */
const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/* -------------------------------------------------------
   HEADER STICKY & GO TO TOP
------------------------------------------------------- */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/* -------------------------------------------------------
   NAVBAR TOGGLE
------------------------------------------------------- */
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {
  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);
});

/* -------------------------------------------------------
   THEME TOGGLE
------------------------------------------------------- */
const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {
  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");
    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");
    localStorage.setItem("theme", "dark_theme");
  }
});

/* -------------------------------------------------------
   APPLY SAVED THEME ON LOAD
------------------------------------------------------- */
if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

/* -------------------------------------------------------
   VIDEO ZOOM MODAL
------------------------------------------------------- */
const videoWrappers = document.querySelectorAll(".video-wrapper");
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeModal = document.querySelector(".close-modal");

videoWrappers.forEach((wrapper) => {
  const video = wrapper.querySelector("video");

  wrapper.addEventListener("click", () => {
    modal.classList.add("active");
    modalVideo.src = video.src;
    modalVideo.play();
  });
});

const closeVideoModal = () => {
  modal.classList.remove("active");
  setTimeout(() => {
    modalVideo.pause();
    modalVideo.src = "";
  }, 300);
};

closeModal.addEventListener("click", closeVideoModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeVideoModal();
});

/* -------------------------------------------------------
   GALLERY FILTER BUTTONS
------------------------------------------------------- */
const filterButtons = document.querySelectorAll(".filter_buttons button");
const filterableCards = document.querySelectorAll(".filterable-cards .card");

const filterCards = (e) => {
  document.querySelector(".activee").classList.remove("activee");
  e.target.classList.add("activee");
};

filterButtons.forEach((button) =>
  button.addEventListener("click", filterCards)
);

/* -------------------------------------------------------
   IMAGE CLICK ZOOM MODAL
------------------------------------------------------- */
const zoomImages = document.querySelectorAll(".zoom-img");
const imgModal = document.getElementById("imgModal");
const imgModalContent = document.getElementById("imgModalContent");
const imgClose = document.getElementById("imgClose");

zoomImages.forEach((img) => {
  img.addEventListener("click", () => {
    imgModal.classList.add("active");
    imgModalContent.src = img.src;
  });
});

imgClose.addEventListener("click", () => {
  imgModal.classList.remove("active");
});

imgModal.addEventListener("click", (e) => {
  if (e.target === imgModal) {
    imgModal.classList.remove("active");
  }
});

/* -------------------------------------------------------
   ✅ FIXED MUSIC PLAYER
------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("cover2");
  const title = document.getElementById("music-title");
  const artist = document.getElementById("music-artist");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const progress = document.getElementById("progress");
  const playerProgress = document.getElementById("player-progress");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const playBtn = document.getElementById("play");
  const music = document.getElementById("audio"); // ✅ FIXED — uses real <audio>

  if (!playBtn || !music) return;

  const songs = [
    {
      path: "/assets/music/Grace-Min-Moses-Abimiku.mp3",
      displayName: "Amazing Grace",
      artist: "John Newton",
      cover: "./assets/images/cover1.jpg",
    },
  ];

  let musicIndex = 0;
  let isPlaying = false;

  function playMusic() {
    isPlaying = true;
    music.play();
    playBtn.setAttribute("name", "pause-circle");
  }

  function pauseMusic() {
    isPlaying = false;
    music.pause();
    playBtn.setAttribute("name", "play-circle");
  }

  function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
  }

  function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
  }

  function updateProgressBar() {
    const { duration, currentTime } = music;

    if (duration) {
      progress.style.width = `${(currentTime / duration) * 100}%`;
    }

    // format minutes/seconds
    const f = (t) => String(Math.floor(t)).padStart(2, "0");

    if (!isNaN(duration)) {
      durationEl.textContent = `${f(duration / 60)}:${f(duration % 60)}`;
    }
    currentTimeEl.textContent = `${f(currentTime / 60)}:${f(currentTime % 60)}`;
  }

  function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
  }

  playBtn.addEventListener("click", togglePlay);
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgress.addEventListener("click", setProgressBar);

  loadMusic(songs[musicIndex]); // Load first track
})();
