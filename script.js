/* ============================================================
   STARFIELD
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
   LANCEMENT
   ============================================================ */
function launchSite() {
  const music = document.getElementById('sw-music');
  music.volume = 0.4;
  music.play();
  goToPage('page-intro');
}

/* ============================================================
   TRANSITIONS ENTRE PAGES
   ============================================================ */
function goToPage(targetId, callback) {
  const overlay = document.getElementById('hyperspace');
  overlay.classList.add('flash');
  setTimeout(() => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
    overlay.classList.remove('flash');
    if (callback) callback();
  }, 400);
}

// Avance automatique depuis le crawl intro quand l'animation se termine
document.querySelector('.crawl-text').addEventListener('animationend', () => {
  document.getElementById('next-btn').classList.add('visible');
  const skipBtn = document.getElementById('skip-btn');
  if (skipBtn) skipBtn.style.display = 'none';
});

document.querySelector('.skip-btn').addEventListener('click', () => goToPage('page-yesno'));

/* ============================================================
   LOGIQUE OUI / NON
   ============================================================ */
let noClickCount = 0;

function handleYes() {
  for (let i = 0; i < 20; i++) spawnParticle();

  document.getElementById('btn-area').style.display = 'none';
  document.querySelector('.bb8-container').style.display = 'none';

  const bigYes = document.getElementById('big-yes');
  bigYes.style.display = 'block';

  setTimeout(() => goToPage('page-activities', setupActivities), 1800);
}

function handleNo() {
  noClickCount++;
  const btn    = document.getElementById('btn-no');
  const yesBtn = document.getElementById('btn-yes');

  if (noClickCount === 1) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    btn.style.position   = 'fixed';
    btn.style.left       = (Math.random() * (vw - 120)) + 'px';
    btn.style.top        = (Math.random() * (vh - 60)) + 'px';
    btn.style.transition = 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)';

  } else if (noClickCount === 2) {
    btn.style.transform  = 'scale(0.5)';
    btn.style.opacity    = '0.4';
    btn.style.fontSize   = '0.7rem';
    yesBtn.style.transform  = 'scale(1.4)';
    yesBtn.style.fontSize   = '1.6rem';
    yesBtn.style.boxShadow  = '0 0 50px rgba(105,240,174,0.9)';
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    btn.style.left = (Math.random() * (vw - 80)) + 'px';
    btn.style.top  = (Math.random() * (vh - 50)) + 'px';

  } else {
    btn.style.opacity        = '0';
    btn.style.transform      = 'scale(0)';
    btn.style.pointerEvents  = 'none';
    yesBtn.style.transform   = 'scale(2.2)';
    yesBtn.style.fontSize    = '2rem';
    yesBtn.style.boxShadow   = '0 0 80px rgba(105,240,174,1), 0 0 160px rgba(105,240,174,0.5)';
  }
}

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

/* ============================================================
   ACTIVITÉS
   ============================================================ */
const activities = [
  { emoji: '🎬', label: 'Ciné' },
  { emoji: '🍕', label: 'Restaurant' },
  { emoji: '🎢', label: "Parc d'attraction" },
  { emoji: '🌳', label: 'Pique-nique' },
  { emoji: '🎭', label: 'Spectacle' },
  { emoji: '🎮', label: 'Jeux vidéo' },
  { emoji: '🏛️', label: 'Musée' },
  { emoji: '🍦', label: 'Glaces' },
  { emoji: '🚵', label: 'Aventure' },
  { emoji: '🧁', label: 'Pâtisserie' },
  { emoji: '🌆', label: 'Balade en ville' },
  { emoji: '🎠', label: 'Fête foraine' },
  { emoji: '🎳', label: 'Bowling' },
  { emoji: '🎨', label: 'Atelier créatif' },
  { emoji: '🌅', label: 'Coucher de soleil' },
  { emoji: '🎵', label: 'Concert' },
  { emoji: '🛶', label: 'Bateau' },
  { emoji: '🌮', label: 'Food tour' },
];

let selectedActivities = [];

function setupActivities() {
  const grid = document.getElementById('activities-grid');
  grid.innerHTML = '';
  selectedActivities = [];
  renderActivityCards(grid);
}

function renderActivityCards(grid) {
  // Retire l'ancienne carte "+" si elle existe
  const existing = document.getElementById('add-card');
  if (existing) existing.remove();

  // Crée les cartes pour chaque activité pas encore dans la grille
  activities.forEach(act => {
    if (document.querySelector(`[data-label="${act.label}"]`)) return;
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.dataset.label = act.label;
    card.innerHTML = `
      <span class="activity-emoji">${act.emoji}</span>
      <span class="activity-label">${act.label}</span>
    `;
    card.addEventListener('click', () => toggleActivity(act.label, card));
    grid.appendChild(card);
  });

  // Carte "+" pour créer une activité personnalisée
  const addCard = document.createElement('div');
  addCard.className = 'activity-add-card';
  addCard.id = 'add-card';
  addCard.innerHTML = `
    <span style="font-size:2rem; color:var(--gold);">＋</span>
    <span style="font-size:0.8rem; color:var(--gold); font-weight:600;">Créer</span>
  `;
  addCard.addEventListener('click', () => {
    const form = document.getElementById('add-form');
    form.classList.toggle('visible');
    if (form.classList.contains('visible')) {
      document.getElementById('new-emoji').focus();
    }
  });
  grid.appendChild(addCard);
}

function toggleActivity(label, card) {
  const idx = selectedActivities.indexOf(label);
  if (idx === -1) {
    selectedActivities.push(label);
    card.classList.add('selected');
    spawnParticle();
  } else {
    selectedActivities.splice(idx, 1);
    card.classList.remove('selected');
  }
  const btn = document.getElementById('continue-activities');
  btn.classList.toggle('visible', selectedActivities.length > 0);
}

function addCustomActivity() {
  const emoji = document.getElementById('new-emoji').value.trim() || '⭐';
  const label = document.getElementById('new-label').value.trim();

  if (!label) {
    alert('Donne un nom à ton activité, Padawan ! 🌌');
    return;
  }

  // Ajout à la liste globale
  activities.push({ emoji, label });

  // Réinitialise et ferme le formulaire
  document.getElementById('new-emoji').value = '';
  document.getElementById('new-label').value = '';
  document.getElementById('add-form').classList.remove('visible');

  // Re-render
  const grid = document.getElementById('activities-grid');
  renderActivityCards(grid);

  // Sélectionne automatiquement la nouvelle activité
  const newCard = document.querySelector(`[data-label="${label}"]`);
  if (newCard) {
    toggleActivity(label, newCard);
    newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  spawnParticle();
}

/* ============================================================
   VALIDATION DATE
   ============================================================ */
/* ============================================================
   CALENDRIER
   ============================================================ */
let reservedDates = [];
let currentCalDate = new Date();
let selectedDateStr = null;

// Charge les dates réservées depuis dates.json puis ouvre le calendrier
function initCalendar() {
  fetch('dates.json')
    .then(r => r.json())
    .then(data => { reservedDates = data.reserved || []; })
    .catch(() => { reservedDates = []; })
    .then(() => renderCalendar());
}

function renderCalendar() {
  const grid  = document.getElementById('calendar-grid');
  const label = document.getElementById('cal-month-label');
  grid.innerHTML = '';

  const year  = currentCalDate.getFullYear();
  const month = currentCalDate.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  label.textContent = new Date(year, month).toLocaleDateString('fr-FR', {
    month: 'long', year: 'numeric'
  });

  // En-têtes jours
  ['LUN','MAR','MER','JEU','VEN','SAM','DIM'].forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-day-name';
    el.textContent = d;
    grid.appendChild(el);
  });

  // Décalage : 1er jour du mois (lundi = 0)
  const firstDay = new Date(year, month, 1).getDay();
  const offset   = (firstDay === 0) ? 6 : firstDay - 1;
  for (let i = 0; i < offset; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  // Jours
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const el      = document.createElement('div');
    el.className  = 'cal-day';
    el.textContent = d;

    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dateObj = new Date(year, month, d);

    if (dateObj < today) {
      el.classList.add('past');
    } else if (reservedDates.includes(dateStr)) {
      el.classList.add('disabled');
      el.title = 'Date déjà réservée 🚫';
    } else {
      el.addEventListener('click', () => selectDate(dateStr, d, month, year, el));
    }

    if (dateObj.toDateString() === today.toDateString()) el.classList.add('today');
    if (dateStr === selectedDateStr) el.classList.add('selected');

    grid.appendChild(el);
  }
}

function selectDate(dateStr, d, month, year, el) {
  selectedDateStr = dateStr;
  document.querySelectorAll('.cal-day.selected').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  const label = new Date(year, month, d).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  const display = document.getElementById('selected-date-display');
  display.textContent = '📅 ' + label;
  display.style.display = 'block';
}

// Navigation mois
document.getElementById('cal-prev').addEventListener('click', () => {
  currentCalDate.setMonth(currentCalDate.getMonth() - 1);
  renderCalendar();
});
document.getElementById('cal-next').addEventListener('click', () => {
  currentCalDate.setMonth(currentCalDate.getMonth() + 1);
  renderCalendar();
});

/* ============================================================
   VALIDATION DATE
   ============================================================ */
function validateDate() {
  const timeInput = document.getElementById('time-input').value;
  if (!selectedDateStr) { alert('Choisis une date, jeune Padawan ! 📅'); return; }
  if (!timeInput)       { alert("L'heure de la mission est manquante ! ⏰"); return; }
  buildConfirmPage(selectedDateStr, timeInput);
  goToPage('page-confirm');
}

/* ============================================================
   PAGE CONFIRMATION
   ============================================================ */
function buildConfirmPage(dateStr, timeStr) {
  const dateObj = new Date(dateStr + 'T' + timeStr);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormatted = dateObj.toLocaleDateString('fr-FR', options);
  const [h, m] = timeStr.split(':');
  const timeFormatted = `${h}h${m}`;

  // Résumé
  document.getElementById('confirm-summary').innerHTML = `
    <div class="confirm-detail">📅 <strong>DATE :</strong> ${dateFormatted}</div>
    <div class="confirm-detail">⏰ <strong>HEURE :</strong> ${timeFormatted}</div>
    <div class="confirm-detail">🎯 <strong>ACTIVITÉS :</strong> ${selectedActivities.join(', ')}</div>
  `;

  // Lien Google Agenda
  const startDT = dateStr.replace(/-/g, '') + 'T' + timeStr.replace(':', '') + '00';
  const endDate = new Date(dateObj.getTime() + 3 * 60 * 60 * 1000);
  const endDT   = endDate.toISOString().replace(/[-:]/g, '').split('.')[0];
  const title   = encodeURIComponent('Notre Date Galactique');
  const details = encodeURIComponent('Activites : ' + selectedActivities.join(', '));
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDT}/${endDT}&details=${details}`;

  const gcalBtn = document.getElementById('gcal-link');
  gcalBtn.href = gcalUrl;
  gcalBtn.onclick = e => { e.preventDefault(); window.open(gcalUrl, '_blank'); };

  // Envoi email via EmailJS
  emailjs.send("service_jwd5z88", "template_i3r7i8i", {
    date:      dateFormatted,
    heure:     timeFormatted,
    activites: selectedActivities.join(', ')
  });

  // Confettis
  for (let i = 0; i < 30; i++) {
    setTimeout(() => spawnParticle(), i * 80);
  }
}
