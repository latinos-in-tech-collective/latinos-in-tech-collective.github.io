// Latinos in Tech Collective, shared behavior for every page.
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      })
    );
  }

  // Forms
  // Each form posts to the URL in its action attribute (for example a Formspree endpoint).
  // If action is empty, the form is not connected yet and says so, so nothing is silently lost.
  document.querySelectorAll('form[data-form]').forEach((form) => {
    const msg = form.parentElement.querySelector('[data-form-msg]');
    const show = (title, body) => {
      if (!msg) return;
      msg.querySelector('h3').textContent = title;
      msg.querySelector('p').textContent = body;
      msg.hidden = false;
      msg.focus();
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const endpoint = form.getAttribute('action');
      if (!endpoint) {
        show('This form is not connected yet.',
          'Add a form endpoint in the action attribute before launch. See the README.');
        return;
      }
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(String(res.status));
        form.hidden = true;
        show('Thanks, we got it.', form.dataset.thanks || 'We will be in touch soon.');
      } catch (err) {
        show('That did not go through.', 'Please try again in a minute, or email us directly.');
      }
    });
  });
});
