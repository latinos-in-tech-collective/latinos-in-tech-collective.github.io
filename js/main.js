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
  // Web address fields (data-normalize-url): people can type "example.org/page" without the scheme.
  // We add https:// when they leave the field and again on submit, and flag anything that is not
  // a plausible web address. Keep this rule in step with the check in the Apps Script.
  const WEB_ADDRESS = /^https?:\/\/[\w\u00a1-\uffff-]+(\.[\w\u00a1-\uffff-]+)+(:\d+)?([\/?#]\S*)?$/i;
  const normalizeUrl = (value) => {
    const v = value.trim();
    if (!v || /^[a-z][a-z0-9+.-]*:\/\//i.test(v)) return v;
    return 'https://' + v.replace(/^\/\/+/, '');
  };
  const checkUrl = (input, rewrite) => {
    const v = normalizeUrl(input.value);
    const ok = !v || WEB_ADDRESS.test(v);
    input.setCustomValidity(ok ? '' : 'Enter a web address, like example.org/your-event');
    if (rewrite && ok && v !== input.value) input.value = v;
  };
  document.querySelectorAll('input[data-normalize-url]').forEach((input) => {
    input.addEventListener('input', () => checkUrl(input, false));
    input.addEventListener('blur', () => checkUrl(input, true));
  });

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
      form.querySelectorAll('input[data-normalize-url]').forEach((input) => checkUrl(input, true));
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
        // Endpoints answer with JSON like {"ok":true}. Apps Script reports its own errors this way
        // with a 200 status, so treat an explicit ok:false as a failure instead of showing "Thanks".
        const data = await res.json().catch(() => null);
        if (data && data.ok === false) throw new Error(data.error || 'rejected');
        form.hidden = true;
        show('Thanks, we got it.', form.dataset.thanks || 'We will be in touch soon.');
      } catch (err) {
        show('That did not go through.', 'Please try again in a minute, or email us directly.');
      }
    });
  });
});
