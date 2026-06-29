/* ============================================================
   STARFIELD — commun à toutes les pages
   ============================================================ */
const starsContainer = document.getElementById('stars-container');
for (let i = 0; i < 200; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  s.style.cssText = `
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    width: ${size}px;
    height: ${size}px;
    --d: ${(Math.random() * 3 + 1).toFixed(1)}s;
    animation-delay: ${(Math.random() * 4).toFixed(1)}s;
    opacity: ${Math.random() * 0.7 + 0.1};
  `;
  starsContainer.appendChild(s);
}

/* ============================================================
   NAVIGATION ENTRE PAGES (avec transition hyperspace)
   ============================================================ */
function navigateTo(url) {
  const overlay = document.getElementById('hyperspace');
  overlay.classList.add('flash');
  // Sauvegarde le timestamp de lecture pour simuler la continuité
  const music = document.getElementById('sw-music');
  if (music) localStorage.setItem('sw_music_time', music.currentTime);
  setTimeout(() => {
    window.location.href = url;
  }, 400);
}

// Reprend la musique là où elle s'était arrêtée
window.addEventListener('load', () => {
  const music = document.getElementById('sw-music');
  if (!music) return;
  const savedTime = parseFloat(localStorage.getItem('sw_music_time') || '0');
  music.currentTime = savedTime;
  music.volume = 0.4;
  music.play().catch(() => {}); // silencieux si bloqué
});

/* ============================================================
   PARTICULES
   ============================================================ */
function spawnParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  const colors = ['#FFE81F', '#FF6EC7', '#4FC3F7', '#69F0AE', '#FF4444'];
  const size = Math.random() * 12 + 4;
  p.style.cssText = `
    left: ${30 + Math.random() * 40}%;
    bottom: ${20 + Math.random() * 30}%;
    width: ${size}px;
    height: ${size}px;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    animation-duration: ${1 + Math.random() * 2}s;
    animation-delay: ${Math.random() * 0.5}s;
  `;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 3000);
}
