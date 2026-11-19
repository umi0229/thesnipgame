const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const evidenceButtons = document.querySelectorAll('.evidence-item');
const evidenceTitle = document.querySelector('#evidence-title');
const evidenceDesc = document.querySelector('#evidence-desc');
const evidenceImage = document.querySelector('#evidence-image');
const evidenceImageCaption = document.querySelector('#evidence-image-caption');
evidenceButtons.forEach(button => {
  button.addEventListener('click', () => {
    evidenceButtons.forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    evidenceTitle.textContent = button.dataset.title;
    evidenceDesc.textContent = button.dataset.desc;
    if (evidenceImage && button.dataset.image) {
      evidenceImage.src = `assets/images/${button.dataset.image}`;
      evidenceImage.alt = `調查證物：${button.dataset.title}`;
    }
    if (evidenceImageCaption) evidenceImageCaption.textContent = `證物照片 / ${button.querySelector('span')?.textContent || ''}`;
  });
});

const revealTargets = document.querySelectorAll('.chapter-card, .good-card, .feature-list li');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}


// Cursor-following flashlight ambience (visual effect only)
const beam = document.querySelector('#flashlight-overlay');
const beamToggle = document.querySelector('#toggle-light');
let beamEnabled = true;
function moveBeam(x, y) {
  if (!beam || !beamEnabled) return;
  beam.style.setProperty('--mouse-x', `${x}px`);
  beam.style.setProperty('--mouse-y', `${y}px`);
}
document.addEventListener('mousemove', event => moveBeam(event.clientX, event.clientY), { passive: true });
document.addEventListener('touchmove', event => {
  if (event.touches.length) moveBeam(event.touches[0].clientX, event.touches[0].clientY);
}, { passive: true });
if (beamToggle && beam) {
  beamToggle.addEventListener('click', () => {
    beamEnabled = !beamEnabled;
    beam.classList.toggle('off', !beamEnabled);
    beamToggle.classList.toggle('is-off', !beamEnabled);
    beamToggle.textContent = beamEnabled ? '手電筒光束：開' : '手電筒光束：關';
    beamToggle.setAttribute('aria-pressed', String(beamEnabled));
  });
}
