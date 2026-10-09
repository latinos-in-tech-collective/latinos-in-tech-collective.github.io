// Latinos in Tech Collective, Directories page.
// Reads window.LITC_GROUPS and window.LITC_FEED from js/directory-data.js.
(function () {
  const root = document.getElementById('directory');
  if (!root) return;

  const GROUPS = window.LITC_GROUPS || [];
  const FEED = window.LITC_FEED || [];
  const today = new Date().toISOString().slice(0, 10);
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const state = { tab: 'groups', q: '', filter: 'All', when: 'Current' };
  const $ = (sel) => root.querySelector(sel);
  const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const isPast = (f) => Boolean(f.date) && f.date < today;
  const label = (f) => {
    if (f.when) return f.when;
    if (!f.date) return '';
    const [y, m, d] = f.date.split('-').map(Number);
    return `${MONTHS[m - 1]} ${d}`;
  };
  const matches = (fields) => {
    const q = state.q.trim().toLowerCase();
    return !q || fields.join(' ').toLowerCase().includes(q);
  };
  const tags = (list) => (list || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  const linkOut = (url, text) => {
    if (!url) return '';
    const external = /^https?:/.test(url);
    return `<a class="text-link" href="${esc(url)}"${external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
  };

  function chips() {
    const el = $('#dir-chips');
    if (state.tab === 'groups') {
      const types = ['All', ...new Set(GROUPS.map((g) => g.type))];
      el.innerHTML = '<span class="chip-label">Type</span>' + types.map((t) =>
        `<button type="button" class="chip" aria-pressed="${state.filter === t}" data-f="${esc(t)}">${esc(t)}</button>`).join('');
    } else {
      const kinds = [['All', 'All'], ['Event', 'Events'], ['Resource', 'Resources'], ['Funding', 'Funding']];
      el.innerHTML = '<span class="chip-label">Show</span>' + kinds.map(([k, t]) =>
        `<button type="button" class="chip" aria-pressed="${state.filter === k}" data-f="${k}">${t}</button>`).join('') +
        '<span class="chip-label chip-gap">When</span>' + ['Current', 'Past'].map((w) =>
        `<button type="button" class="chip" aria-pressed="${state.when === w}" data-w="${w}">${w === 'Current' ? 'Upcoming and current' : 'Past'}</button>`).join('');
    }
  }

  function render() {
    let rows, html;
    if (state.tab === 'groups') {
      rows = GROUPS.filter((g) => (state.filter === 'All' || g.type === state.filter) &&
        matches([g.name, g.type, g.area, g.description, ...(g.tags || [])]));
      html = rows.map((g) => `
        <article class="dir-row">
          <div>
            <h3>${esc(g.name)}</h3>
            <p>${esc(g.description)}</p>
            <div class="tags">${tags(g.tags)}</div>
          </div>
          <div class="dir-side">
            <span class="dir-kind">${esc(g.type)}</span>
            <span>${esc(g.area)}</span>
            ${linkOut(g.link, 'Visit')}
          </div>
        </article>`).join('');
      $('#dir-count').textContent = `${rows.length} ${rows.length === 1 ? 'group' : 'groups'}`;
    } else {
      rows = FEED.filter((f) => (state.filter === 'All' || f.kind === state.filter) &&
        (state.when === 'Past' ? isPast(f) : !isPast(f)) &&
        matches([f.title, f.by, f.kind, f.description, ...(f.tags || [])]))
        .sort((a, b) => {
          const A = a.date || '9999', B = b.date || '9999';
          return state.when === 'Past' ? B.localeCompare(A) : A.localeCompare(B);
        });
      html = rows.map((f) => `
        <article class="dir-row dir-event${isPast(f) ? ' is-past' : ''}">
          <p class="dir-date">${esc(label(f))}<small>${esc(f.detail)}</small></p>
          <div>
            <h3>${esc(f.title)}</h3>
            <p>${esc(f.description)}</p>
            <div class="tags">${tags(f.tags)}</div>
          </div>
          <div class="dir-side">
            <span class="dir-kind">${esc(f.kind)}</span>
            <span>${esc(f.by)}</span>
            ${linkOut(f.link, 'Details')}
          </div>
        </article>`).join('');
      $('#dir-count').textContent = `${rows.length} ${rows.length === 1 ? 'item' : 'items'}`;
    }

    const empty = state.q
      ? `<p class="dir-empty">Nothing matches "${esc(state.q)}" yet. Know a group or event that fits? <a class="text-link" href="join.html#share">Share it with the network</a>.</p>`
      : '<p class="dir-empty">Nothing here yet.</p>';
    $('#dir-list').innerHTML = html || empty;
  }

  function setTab(tab) {
    state.tab = tab;
    state.filter = 'All';
    root.querySelectorAll('[role="tab"]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
    $('#dir-list').setAttribute('aria-labelledby', 'tab-' + tab);
    chips();
    render();
  }

  root.querySelectorAll('[role="tab"]').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.tab)));
  $('#dir-q').addEventListener('input', (e) => { state.q = e.target.value; render(); });
  $('#dir-chips').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.f) state.filter = b.dataset.f;
    if (b.dataset.w) state.when = b.dataset.w;
    chips();
    render();
  });

  // Open the events tab directly with directories.html#events
  setTab(location.hash === '#events' ? 'feed' : 'groups');
})();
