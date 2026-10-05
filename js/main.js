// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => links.classList.remove('is-open'))
    );
  }

  // Single orchestrated hero entrance (only on load, only once, respects reduced motion)
  const hero = document.querySelector('[data-hero-in]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (hero && !prefersReducedMotion) {
    hero.classList.add('hero-in');
  }

  // Demo forms: no backend is wired up in this template, so submitting
  // just swaps in a confirmation message. Replace with a real endpoint
  // (Formspree, a Google Form, your own API, etc.) before going live.
  document.querySelectorAll('form[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector('[data-form-success]');
      if (success) {
        form.hidden = true;
        success.hidden = false;
        success.focus?.();
      }
    });
  });
});
