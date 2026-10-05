# Latinos in Tech — website

A static, no-build-step website for a Latinos in Tech community, built around the
existing "L·T" mark. Plain HTML/CSS/JS — no framework, no bundler, no `npm install`
required to run it.

## Preview it locally

There's no build step, so you can just open `index.html` in a browser. For a more
accurate preview (some things behave slightly differently over `file://` vs a real
server), run a tiny local server from this folder instead:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new GitHub repo and push this folder's contents to it (this file, all
   the `.html` files, `css/`, `js/`, and `assets/` should sit at the **root** of the
   repo, or in `/docs` if you prefer — just match what you pick in step 3).
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-ORG/YOUR-REPO.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch", pick
   the `main` branch and the `/ (root)` folder (or `/docs`, if that's where you put
   the files), then save.
4. GitHub gives you a URL like `https://YOUR-ORG.github.io/YOUR-REPO/`. It can take
   a minute or two to go live the first time.
5. Using a custom domain instead? Add a `CNAME` file at the root with just your
   domain in it, and point your DNS at GitHub Pages per
   [their docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## What's placeholder and needs real content before launch

- **Every URL that's `href="#"`** — mainly the Slack/Instagram/LinkedIn links in
  the footer, and a few "Read" links on the Stories page. Swap in real links.
- **Sponsor names** (Nimbus, Fieldstone, Anchor Labs, Portside, Greywolf, Solano &
  Rook) are invented — replace with real sponsors, or remove the section.
- **All copy** — team bios, event listings, stats (4,800+ members, 22 chapters,
  etc.), the mentorship quote, and the blog post are sample text to show the
  layout working with realistic content. None of it is real, **except** the
  "Our goals" and "As members, we will / We will not embody" sections on the
  About page — that text comes straight from `community-charter.pptx`.
- **Forms don't submit anywhere.** Both the homepage email signup and the Join
  page form just show a confirmation message on submit (see `data-demo-form` in
  `js/main.js`) — there's no backend. Wire them up to something like
  [Formspree](https://formspree.io), a Google Form, Mailchimp, or your own API
  before launch.
- **`sponsors@`/`partners@latinosintech.example`, the sitemap URLs, and
  `robots.txt`** all use a placeholder domain (`your-org.github.io/latinos-in-tech`)
  — update them to your real domain once you have one.
- **Only one blog post exists** (`blog-post.html`, "From bootcamp to tech lead").
  The rest of the Stories list links to `#` — duplicate `blog-post.html` for each
  new story and update the "Read" links on `blog.html` to point to the new files.

## Structure

```
index.html          Home
about.html           About / origin story / timeline / values
team.html            Leadership list
events.html          Upcoming + past events
mentorship.html       How the program works, tracks, FAQ
blog.html            Story listing (featured + list)
blog-post.html       Example single story page
sponsors.html        Tiers + current sponsors
join.html            Membership form + FAQ
404.html             Custom not-found page
css/styles.css       The whole design system — one file, no preprocessor
js/main.js           Mobile nav toggle, hero entrance animation, demo form handling
assets/              Logo (mark.svg, glyph.svg), favicons, social preview image
robots.txt, sitemap.xml
```

Every page repeats its own `<header>`/`<footer>` markup rather than pulling from a
shared partial, since there's no build step to assemble includes. If you outgrow
that (adding a 10th page and dreading the copy-paste), consider adding a static
site generator (Eleventy, Astro, etc.) — but the current setup is deliberately
dependency-free so it's easy to hand off or fork.

## Design system, briefly

- **Colors**: true black background (`--black`, matching the mark), white text,
  one warm amber accent (`--amber`) for CTAs and links, plus warm grays for
  secondary text and hairline dividers. All defined as CSS variables at the top
  of `css/styles.css` — change the palette there.
- **Type**: [Fraunces](https://fonts.google.com/specimen/Fraunces) for headlines
  and pull-quotes, [Archivo](https://fonts.google.com/specimen/Archivo) for body
  and UI text. Both loaded from Google Fonts in each page's `<head>`.
- **Structural idea**: the mark itself is built on a baseline — the L rises off
  it, the T drops below it. That repeats site-wide as thin hairline dividers
  between list rows and sections, instead of shadowed cards.
- **Icon tiles**: solid squares with a flat white-on-square glyph, borrowed
  from the community charter deck (`community-charter.pptx`) — the deck keeps
  these monochrome (black tile), the site recolors them amber to match the
  warmer palette. Used on About, Join, and Sponsors. New icons follow the same
  pattern: 24×24 viewBox, solid fill, no strokes thicker than needed for
  small shapes like the checkmark/x.
- **Tracked, uppercase labels** (eyebrows, tags, roles, event meta) also come
  from the deck's small functional labels (`OUR CHARTER`, `01 – 04`). Applied
  sitewide via `.eyebrow`, `.tag`, `.role`.
- **About page content**: the "Our goals" and "As members, we will / We will
  not embody" sections are pulled directly from the real charter deck, not
  invented filler like the rest of the site. If the charter changes, update
  those three sections in `about.html` to match.
- **No JS framework.** `js/main.js` handles the mobile nav toggle, one entrance
  animation on the homepage hero, and the demo-form confirmation states. That's
  it — everything else is CSS.

## Logo

`assets/mark.svg` is the full badge (black square + white mark) — used for
favicons. `assets/glyph.svg` is just the white shape on a transparent background
with `fill="currentColor"`, meant for inline use (nav, footer) so it can inherit
whatever color it's placed in.
