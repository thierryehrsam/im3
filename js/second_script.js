

const page = document.getElementById('page');
const wrap = document.querySelector('[data-wrapper]');             // NEU
const panels = [...document.querySelectorAll('[data-panel]')];

// === Mobile-/Desktop-Logik ===
const MOBILE_QUERY = window.matchMedia('(max-width: 768px)');
const isMobile = () => MOBILE_QUERY.matches;

function openPanel(panel) {
  const btn = panel.querySelector('.sidepanel__trigger');
  const cnt = panel.querySelector('.sidepanel__content');
  const x   = panel.querySelector('.sidepanel__close');

  panel.classList.add('--open');
  if (btn) btn.setAttribute('aria-expanded', 'true');
  if (cnt) cnt.hidden = false;
  if (x)   x.hidden = false;
}

function closePanel(panel) {
  const btn = panel.querySelector('.sidepanel__trigger');
  const cnt = panel.querySelector('.sidepanel__content');
  const x   = panel.querySelector('.sidepanel__close');

  panel.classList.remove('--open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  if (cnt) cnt.hidden = true;
  if (x)   x.hidden = true;
}

// Desktop

function closeAll() {
    panels.forEach(p => {
        p.classList.remove('--open');
        const btn = p.querySelector('.sidepanel__trigger');
        const cnt = p.querySelector('.sidepanel__content');
        const x = p.querySelector('.sidepanel__close');               // NEU
        if (btn && cnt) { btn.setAttribute('aria-expanded', 'false'); cnt.hidden = true; }
        if (x) x.hidden = true;                                         // NEU
    });
    page.classList.remove('--expand');
}


panels.forEach(panel => {
    const btn = panel.querySelector('.sidepanel__trigger');
    const content = panel.querySelector('.sidepanel__content');
    const closeBtn = panel.querySelector('.sidepanel__close');        // NEU
    if (!btn || !content) return;

btn.addEventListener('click', () => {
  if (isMobile()) {
    // MOBILE: keine Aktion – Panels bleiben offen
    return;
  }

  const isOpen = panel.classList.contains('--open');

  // DESKTOP: Exklusiv öffnen (altes Verhalten)
  closeAll();
  if (!isOpen) {
    openPanel(panel);
    page.classList.add('--expand');
  }
});



    // NEU: Close-Button schliesst wieder in den ½-½ Zustand
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAll();
        });
    }
});

window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

function applyInitialState() {
  if (isMobile()) {
    // MOBILE: beide Panels offen & Close-Buttons ausblenden
    panels.forEach(panel => {
      openPanel(panel);
      const closeBtn = panel.querySelector('.sidepanel__close');
      if (closeBtn) closeBtn.style.display = 'none';
    });
    page.classList.remove('--expand');
  } else {
    // DESKTOP: normale Logik & Close-Buttons wieder anzeigen
    panels.forEach(panel => {
      const closeBtn = panel.querySelector('.sidepanel__close');
      if (closeBtn) closeBtn.style.display = '';
    });
    closeAll();
  }
}

applyInitialState();                                   // <-- sofort beim Laden öffnen
MOBILE_QUERY.addEventListener('change', applyInitialState); // <-- bei Resize/Rotate neu anwenden
