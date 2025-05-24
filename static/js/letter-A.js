const audio = document.getElementById('my-audio');
const image = document.getElementById('play-image');

let isPlaying = false;

image.addEventListener('click', function () {
    if (!isPlaying) {
        audio.volume = 0.5; // 🔉 Ovoz darajasi: 0.0 (jim) — 1.0 (to‘liq)
        audio.play();
        isPlaying = true;
        image.style.opacity = 0.6; // Vizual effekt (ixtiyoriy)
    } else {
        audio.pause();
        isPlaying = false;
        image.style.opacity = 1; // Tiklash
    }
});

// Agar musiqa tugasa, flagni qayta o'zgartiramiz:
audio.addEventListener('ended', function () {
    isPlaying = false;
    image.style.opacity = 1;
});

