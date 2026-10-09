
/* MOMENTARY V3 — FIXED MEDIA LOADER */

const CONFIG = {
  siteName: "MOMENTARY",
  subtitle: "Jejak Kenangan",

  gallery: [
    { src: "media/photos/01.jpg", title: "A LITTLE MOMENT", date: "2026" },
    { src: "media/photos/02.jpg", title: "TOGETHER", date: "2026" },
    { src: "media/photos/03.jpg", title: "WE WERE HERE", date: "2026" }
  ],

  videos: [
    { src: "media/videos/01.mp4", title: "DOCUMENTATION / 01" },
    { src: "media/videos/02.mp4", title: "DOCUMENTATION / 02" }
  ],

  timeline: [
    {
      year: "2026",
      title: "THE FIRST STEP",
      text: "Awal dari sebuah perjalanan."
    },
    {
      year: "2026",
      title: "THE MOMENTS",
      text: "Tawa, kegiatan, dan cerita yang tumbuh bersama."
    },
    {
      year: "2026",
      title: "THE MEMORY",
      text: "Hal-hal sederhana yang akhirnya berarti."
    }
  ],

  captions: [
    "Every little moment can become a story worth keeping.",
    "We laughed. We grew. We were here.",
    "Some memories arrive quietly.",
    "Time passes. The feeling stays.",
    "This was our story."
  ]
};

const $ = (selector) => document.querySelector(selector);

let soundOn = true;
let rendered = false;

function play(audio, volume = 0.45) {
  if (!soundOn || !audio) return;

  audio.currentTime = 0;
  audio.volume = volume;

  audio.play().catch(() => {
    console.info("Audio menunggu interaksi pengguna.");
  });
}

function toast(message) {
  const element = $("#toast");
  if (!element) return;

  element.textContent = message;
  element.classList.add("show");

  setTimeout(() => {
    element.classList.remove("show");
  }, 2200);
}

function mediaImg(src, title, date) {
  const card = document.createElement("figure");
  card.className = "memory-card";

  const img = document.createElement("img");
  img.src = src;
  img.alt = title;
  img.loading = "lazy";
  img.decoding = "async";

  img.onerror = () => {
    card.classList.add("media-error");

    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";

    const heading = document.createElement("b");
    heading.textContent = title;

    const path = document.createElement("small");
    path.textContent = "Foto tidak ditemukan: " + src;

    placeholder.replaceChildren(heading, path);
    img.replaceWith(placeholder);
  };

  card.appendChild(img);

  const caption = document.createElement("figcaption");
  caption.className = "caption";

  const heading = document.createElement("span");
  heading.textContent = title;

  const year = document.createElement("span");
  year.textContent = date;

  caption.replaceChildren(heading, year);
  card.appendChild(caption);

  return card;
}

function render() {
  if (rendered) return;
  rendered = true;

  // FOTO UTAMA
  // Mengisi gambar utama jika elemen tersebut ada di index.html.
  const featuredImg =
    $(".featured img") ||
    $("img[data-src]");

  if (featuredImg) {
    featuredImg.src = "media/photos/01.jpg";
    featuredImg.alt = "Foto utama MOMENTARY";
    featuredImg.loading = "eager";

    featuredImg.onerror = () => {
      console.error(
        "Foto utama gagal dimuat:",
        featuredImg.src
      );
    };
  }

  // GALERI FOTO
  const gallery = $("#gallery");

  if (gallery) {
    gallery.replaceChildren();

    CONFIG.gallery.forEach((item, index) => {
      const card = mediaImg(
        item.src,
        item.title,
        item.date
      );

      if (index === 2) {
        card.classList.add("wide");
      }

      gallery.appendChild(card);
    });
  }

  // VIDEO
  const videoContainer = $("#videos");

  if (videoContainer) {
    videoContainer.replaceChildren();

    CONFIG.videos.forEach((item) => {
      const figure = document.createElement("figure");
      figure.className = "video-card";

      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.src = item.src;

      video.onerror = () => {
        console.error(
          "Video gagal dimuat:",
          item.src
        );
      };

      const caption = document.createElement("figcaption");
      caption.textContent = item.title;

      figure.append(video, caption);
      videoContainer.appendChild(figure);
    });
  }

  // TIMELINE
  const timeline = $("#timeline");

  if (timeline) {
    timeline.replaceChildren();

    CONFIG.timeline.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "timeline-item";

      const number = document.createElement("span");
      number.className = "num";
      number.textContent = String(index + 1).padStart(2, "0");

      const content = document.createElement("div");

      const year = document.createElement("small");
      year.textContent = item.year;

      const heading = document.createElement("h4");
      heading.textContent = item.title;

      const paragraph = document.createElement("p");
      paragraph.textContent = item.text;

      content.append(year, heading, paragraph);
      article.append(number, content);
      timeline.appendChild(article);
    });
  }

  // MEMORY WALL
  const wall = $("#wall");

  if (wall) {
    wall.replaceChildren();

    CONFIG.gallery.forEach((item) => {
      const tile = document.createElement("div");
      const img = document.createElement("img");

      img.src = item.src;
      img.alt = item.title;
      img.loading = "lazy";

      img.onerror = () => {
        tile.textContent = item.title;
        tile.classList.add("media-error");
      };

      tile.appendChild(img);
      wall.appendChild(tile);
    });
  }

  // AMATI ELEMEN YANG MUNCUL SAAT SCROLL
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });

    // PAUSE VIDEO SAAT KELUAR DARI LAYAR
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !entry.target.paused) {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll("video").forEach((video) => {
      videoObserver.observe(video);
    });
  }

  console.info("MOMENTARY: media renderer berhasil dijalankan.");
}

// AUDIO
const music = $("#music");
const clickSound = $("#click");
const whoosh = $("#whoosh");

// TOMBOL MULAI
const enterButton = $("#enterBtn");

if (enterButton) {
  enterButton.addEventListener("click", () => {
    play(clickSound, 0.55);

    setTimeout(() => {
      play(whoosh, 0.3);
    }, 100);

    const guestInput = $("#guestName");
    const closingText = $("#closingText");
    const guestName = guestInput
      ? guestInput.value.trim()
      : "";

    if (guestName && closingText) {
      closingText.textContent =
        `Untuk ${guestName}, time passes. memories stay.`;
    }

    const gate = $("#gate");
    const app = $("#app");
    const topbar = $("#topbar");

    if (gate) gate.classList.add("hidden");
    if (app) app.classList.remove("hidden");
    if (topbar) topbar.classList.remove("hidden");

    if (music) {
      music.volume = 0.2;

      if (soundOn) {
        music.play().catch(() => {
          toast("Tekan tombol musik jika audio belum berbunyi.");
        });
      }
    }

    window.scrollTo(0, 0);
  });
}

// TOMBOL MUTE
const muteButton = $("#muteBtn");

if (muteButton) {
  muteButton.addEventListener("click", () => {
    soundOn = !soundOn;

    muteButton.textContent = soundOn ? "♫" : "🔇";

    if (music) {
      if (soundOn) {
        music.play().catch(() => {});
      } else {
        music.pause();
      }
    }

    // Matikan juga efek suara ketika mode senyap aktif.
    [clickSound, whoosh].forEach((audio) => {
      if (audio && !soundOn) audio.pause();
    });
  });
}

// TOMBOL LIHAT KEMBALI
const replayButton = $("#replay");

if (replayButton) {
  replayButton.addEventListener("click", () => {
    play(clickSound, 0.45);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// TEKS YANG BERGANTI SAAT BAGIAN SOUNDTRACK TERLIHAT
const soundtrack = $(".soundtrack");
const captionElement = $("#caption");
let captionIndex = 0;

if (
  soundtrack &&
  captionElement &&
  "IntersectionObserver" in window
) {
  const captionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        captionElement.style.opacity = "0";

        setTimeout(() => {
          captionElement.textContent =
            CONFIG.captions[
              captionIndex % CONFIG.captions.length
            ];

          captionIndex++;
          captionElement.style.opacity = "1";
        }, 220);
      });
    },
    { threshold: 0.5 }
  );

  captionObserver.observe(soundtrack);
}

// MULAI RENDER
render();
