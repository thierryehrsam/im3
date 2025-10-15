

const page = document.getElementById('page');
const wrap = document.querySelector('[data-wrapper]');             // NEU
const panels = [...document.querySelectorAll('[data-panel]')];

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
        const isOpen = panel.classList.contains('--open');
        closeAll();
        if (!isOpen) {
            panel.classList.add('--open');
            btn.setAttribute('aria-expanded', 'true');
            content.hidden = false;
            if (closeBtn) closeBtn.hidden = false;                        // NEU
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