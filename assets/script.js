const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const daysCounter = $('.days-counter');
function updateTogetherCounter() {
  if (!daysCounter) return;

  const startDateValue = daysCounter.dataset.togetherDate || '2024-06-19';
  const start = new Date(`${startDateValue}T00:00:00`);
  const today = new Date();

  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const daysTogether = Math.max(0, Math.floor((today - start) / 86400000));
  $('[data-together-days]', daysCounter).textContent = daysTogether.toLocaleString('de-DE');
}
updateTogetherCounter();
window.setInterval(updateTogetherCounter, 60000);


const storyPhotos = $$('[data-story-photo]');
const storyChapters = $$('[data-story-chapter]');

const photoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
storyPhotos.forEach((photo) => photoObserver.observe(photo));

function setActiveStoryChapter(index) {
  storyChapters.forEach((chapter) => {
    chapter.classList.toggle('is-active', chapter.dataset.storyChapter === String(index));
  });
}

let storyTicking = false;
function updateStoryChapterOnScroll() {
  if (!storyPhotos.length || !storyChapters.length) return;

  const targetY = window.innerHeight * 0.48;
  let closest = storyPhotos[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  storyPhotos.forEach((photo) => {
    const rect = photo.getBoundingClientRect();
    const center = rect.top + rect.height * 0.5;
    const distance = Math.abs(center - targetY);

    if (distance < closestDistance) {
      closestDistance = distance;
      closest = photo;
    }
  });

  setActiveStoryChapter(closest.dataset.chapterIndex || 0);
}

function requestStoryUpdate() {
  if (storyTicking) return;
  storyTicking = true;
  window.requestAnimationFrame(() => {
    updateStoryChapterOnScroll();
    storyTicking = false;
  });
}

updateStoryChapterOnScroll();
window.addEventListener('scroll', requestStoryUpdate, { passive: true });
window.addEventListener('resize', requestStoryUpdate);

const reveals = $$('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
reveals.forEach((el) => revealObserver.observe(el));

$$('[data-accordion] .faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    item.classList.toggle('open', !isOpen);
    button.setAttribute('aria-expanded', String(!isOpen));
  });
});

const rsvpDialog = $('#rsvpDialog');
const rsvpForm = $('#rsvpForm');
const formNote = $('#formNote');

$$('[data-open-rsvp]').forEach((button) => {
  button.addEventListener('click', () => {
    if (rsvpDialog?.showModal) rsvpDialog.showModal();
    else rsvpDialog.setAttribute('open', '');
  });
});
$('[data-close-rsvp]')?.addEventListener('click', () => rsvpDialog.close());

function getRsvps() {
  try { return JSON.parse(localStorage.getItem('wedding-rsvps') || '[]'); }
  catch { return []; }
}
function setRsvps(items) { localStorage.setItem('wedding-rsvps', JSON.stringify(items)); }

rsvpForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(rsvpForm).entries());
  const items = getRsvps();
  items.push({ ...data, savedAt: new Date().toISOString() });
  setRsvps(items);
  formNote.textContent = 'Saved locally in this browser. Use “Download CSV” to export.';
  rsvpForm.reset();
});

$('#downloadRsvps')?.addEventListener('click', () => {
  const rows = getRsvps();
  if (!rows.length) {
    formNote.textContent = 'No RSVPs saved yet.';
    return;
  }
  const headers = ['name', 'email', 'attendance', 'meal', 'notes', 'savedAt'];
  const escapeCsv = (value = '') => `"${String(value).replaceAll('"', '""')}"`;
  const csv = [headers.join(','), ...rows.map((row) => headers.map((key) => escapeCsv(row[key])).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'rsvps.csv';
  link.click();
  URL.revokeObjectURL(url);
});
