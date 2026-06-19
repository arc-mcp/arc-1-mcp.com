import './styles.css';

const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const siteNav = document.querySelector<HTMLElement>('[data-site-nav]');
const header = document.querySelector<HTMLElement>('[data-site-header]');

navToggle?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

const setHeaderState = () => {
  header?.classList.toggle('site-header--scrolled', window.scrollY > 12);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  button.addEventListener('click', async () => {
    const text = button.dataset.copy;
    if (!text) {
      return;
    }

    await navigator.clipboard.writeText(text);
    const originalText = button.textContent ?? 'Copy';
    button.textContent = 'Copied';
    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1600);
  });
}

const yearTarget = document.querySelector<HTMLElement>('[data-year]');
if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}
