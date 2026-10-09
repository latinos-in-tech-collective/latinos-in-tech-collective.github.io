# Latinos in Tech Collective website

Static site for Latinos in Tech Collective (LiTC). Plain HTML, CSS, and a little JavaScript. No build step, no framework, nothing to install. It deploys as is on GitHub Pages.

## Pages

```
index.html                      Home
about.html                      What LiTC is, phases, and the community charter
network.html                    For groups: what groups get, how joining works, FAQ
directories.html                Search groups, events, resources, and funding in the network
events.html                     Sessions: upcoming and past
partners.html                   For companies, universities, funders, investors
notes.html                      List of notes (updates and ideas)
note-network-of-networks.html   First note
team.html                       Team and open volunteer roles
join.html                       Four forms: groups, share an event or resource, updates, partners
404.html                        Not found page (uses root paths on purpose)

mentorship.html, sponsors.html, blog.html, blog-post.html
                                Redirects from the old site so existing links still work

css/styles.css                  The whole design system, one file
js/main.js                      Mobile menu and form handling
js/directory-data.js            The groups and the events and resources on the Directories page (edit this weekly)
js/directory.js                 Search and filters for the Directories page
assets/                         Logo (mark.svg, glyph.svg), icons, share image
```

Every page repeats its own header and footer. If you change the nav or footer, change it on every page. A quick way is find and replace across all `.html` files in your editor.

## Preview locally

Open `index.html` in a browser, or run a small server from this folder for a closer match to the live site:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

This repo is named `latinos-in-tech-collective.github.io`, so GitHub Pages serves it at https://latinos-in-tech-collective.github.io/

1. Commit and push to `main`.
2. In GitHub, go to Settings, then Pages. Set the source to "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Changes go live a minute or two after each push.

If you add a custom domain later, add a `CNAME` file with the domain, and update the URLs in `sitemap.xml`, `robots.txt`, and the `og:` tags in each page head.

## Before launch

**Forms.** The four forms on `join.html` are not connected yet. Until they are, submitting shows "This form is not connected yet" so nothing gets lost quietly. Two options:

- *Keep the forms on the site.* Create a free form endpoint (Formspree works well), then paste the endpoint URL into each form's `action=""`. Responses land in email and can be exported to Excel.
- *Use Microsoft Forms instead.* Build the three forms in Microsoft Forms, then replace each `<form>` block on `join.html` with a button linking to the form. Responses go straight into Excel.

The fields in each form are chosen to feed the Phase 1 metrics (groups by type and size, people by role, partner interest). Keep them consistent if you switch tools.

**Directories page.** Everything listed lives in `js/directory-data.js`. Edit it in GitHub with the pencil icon, copy an existing entry, change the values, and commit. Weekly routine: review the "Share an event or resource" and "Bring your group in" submissions, add the approved ones to that file, and remove nothing (past events move to the Past filter on their own). Only add a group after it has said yes to being listed. Someone needs to own this, about 15 minutes a week.

**Placeholders to replace** (search the code for `<!--` to find each one):

- Footer Email, LinkedIn, Instagram links (`href="#"`)
- Partner names for From Earning to Owning, once brand approvals are confirmed
- Year, photo, or headcount for the Boston Tech Week mixer
- Groups in the network, on `network.html`, once groups confirm
- Current partners, on `partners.html`, once partners confirm
- Team names, photos, and bios, on `team.html` (a commented template is there)
- "What we ask" on `network.html` and "Our promise to members" on `partners.html` are drafts. Confirm them before launch.

**Content rule.** Only real names, numbers, and logos. The old site's sample stats, sponsors, team, and stories were removed for that reason.

## Content that comes from source documents

- The goals, "As members, we will", and "We will not embody" lists on `about.html` come from the community charter deck. Update them there if the charter changes.
- The $30B figure and related numbers come from ¡Vamos Massachusetts! (Massachusetts Taxpayers Foundation with We Are ALX and the Mauricio Gastón Institute, 2025). The source line is on the page wherever the numbers appear.

## Design system

- **Colors.** Warm light grey (`--bg`) and charcoal (`--ink`), taken from the LiTC flyer. No accent color. All in CSS variables at the top of `css/styles.css`.
- **Type.** Inter Tight from Google Fonts, used heavy with tight letter spacing for headlines, regular for body.
- **Logo.** The L.T glyph sits in a charcoal rounded tile, as on the flyer. On the homepage the blocks assemble on load (skipped for people who turn off motion).
- **Structure.** Thick charcoal rules between sections, thin grey rules between rows. Numbers only where the content is a real sequence (phases, joining steps).
- **Adding a note.** Copy `note-network-of-networks.html`, change the title and text, then add a row to the top of the list in `notes.html`.
