/* STARFIELD */
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

/* NAVIGATION */
function navigateTo(url) {
  const overlay = document.getElementById('hyperspace');
  overlay.classList.add('flash');
  setTimeout(() => {
    window.location.href = url;
  }, 400);
}

/* PARTICULES */
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

/* MUSIQUE PERSISTANTE */
(function() {
  if (sessionStorage.getItem('sw_music_playing') !== '1') return;
  if (document.getElementById('music-frame')) return;

  const frame = document.createElement('iframe');
  frame.id = 'music-frame';
  frame.src = 'music-frame.html';
  frame.style.cssText = 'display:none;width:0;height:0;border:none;position:fixed;';
  frame.setAttribute('allow', 'autoplay; encrypted-media');
  document.body.appendChild(frame);
})();
