# Global Threads, Local Hearts

The website for our IB CAS community clothing drive. We collect gently used
clothing and donate it to [Heart for Monroe](https://heartformonroe.com), a
nonprofit in Monroe, NC that serves people facing hunger and homelessness.

Built with [Vite](https://vite.dev) and plain HTML, CSS and JavaScript — no
framework to learn.

---

## 1 · Running it on your computer

You need [Node.js](https://nodejs.org) (version 20 or newer). Install it once,
then open a terminal in this folder and run:

```bash
npm install     # only the first time — downloads what the site needs
npm run dev     # starts the site at http://localhost:5173
```

Leave `npm run dev` running while you work. Save any file and the browser
updates itself.

Press `Ctrl + C` in the terminal to stop it.

Other commands:

```bash
npm run build     # makes the final site in the dist/ folder
npm run preview   # shows you exactly what the built site looks like
```

---

## 2 · Editing the content

**Almost everything lives in one file: [`src/site.config.js`](src/site.config.js).**

Open it and you'll find numbered sections for the school name, the counters,
collection points, dates, the team, reflections, and so on. Change the text
between the quote marks, save, and the site updates.

Three rules so nothing breaks:

1. Keep the `'quote marks'` around text — change what's *inside* them.
2. Keep the comma at the end of each line.
3. If your text has an apostrophe, use double quotes instead:
   `"Monroe's community"`.

**Search the file for `TODO` to find every placeholder that still needs
replacing.** Anything in `[SQUARE BRACKETS]` is a placeholder.

### What to fill in before you publish

| Where | What |
| --- | --- |
| `site.school` | Your school's name |
| `site.url` | Your website address, once you've deployed |
| `impact` | The counters and your goal |
| `collectionPoints`, `collectionDays` | Real locations, dates and times |
| `reflections` | Your own writing — replace the placeholder text |
| `team` | Real names and roles |
| `thanks` | Donor names, as they come in (see the warning below) |
| `contact.email`, `contact.handle` | A project email you actually check |
| `supervisor` | Your CAS coordinator, or delete the block |

### Naming donors on the Thanks page

Section 15 of the config fills `thanks.html`. **Ask people before you list
them** — being named on a public website isn't something to assume consent
for. If you're unsure, use a first name and last initial, or leave them off.

All three lists there are safe to leave empty:

- Empty `people` → the wall is replaced with a short "we're still collecting
  permission" note.
- Empty `organisations` or `groups` → that whole section disappears, rather
  than leaving a heading with nothing under it.

### The longer paragraphs

The headings and the longer written passages live in the page files in the
main folder — `index.html`, `donate.html`, `cause.html`, `story.html`,
`team.html`, `thanks.html`, `contact.html`. They're ordinary HTML with comments
marking each section, so you can edit the text directly.

If you add a whole new page, you need to do three things: create the `.html`
file, add it to `rollupOptions.input` in `vite.config.js`, and add it to the
`nav` list in `src/site.config.js`.

### Updating the counters

In `site.config.js`, section 3:

```js
impact: {
  goal: 500,
  stats: [
    { value: 0, label: 'Items collected', note: 'and counting' },
    ...
  ],
  lastUpdated: '[MONTH YEAR]',
}
```

The progress bar compares the **first** stat in that list against `goal`.
Update `lastUpdated` whenever you change the numbers.

### Adding your photos

1. Drop the image files into the `public/` folder.
2. In `site.config.js`, section 13, set `src` to `'/your-file.jpg'` — the
   leading slash matters.
3. Write a real `alt` description. It's read aloud to visitors using screen
   readers and shows if the image fails to load.

Please get permission before posting photos of people, and don't photograph
people receiving donations.

### Adding a team photo

The team tags on `team.html` are laid out like ID badges, so each one can
carry a portrait.

1. Crop the picture square and save it into `public/team/` — around 560×560
   is plenty.
2. In `site.config.js`, section 14, add two lines to that person's block:
   ```js
   photo: '/team/anish.jpg',
   photoAlt: 'Anish, who joined the drive in August.',
   ```

Leave `photo` out and the badge shows the person's initials instead, so you
can add photos one at a time without the page looking half-finished.

### The social-media preview image

`public/og-image.png` is what appears when someone shares a link on Instagram,
WhatsApp or iMessage. To regenerate it after changing the tagline, edit
`tools/og-image.html` and run (macOS, Chrome installed):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 \
  --screenshot="$PWD/public/og-image.png" \
  "file://$PWD/tools/og-image.html"
```

The same trick regenerates `public/apple-touch-icon.png` from
`tools/apple-icon.html` at `--window-size=180,180`.

---

## 3 · Putting it online (free)

### Netlify — easiest

1. Push this folder to a GitHub repository.
2. Go to [netlify.com](https://netlify.com), sign in with GitHub, and pick
   **Add new site → Import an existing project**.
3. Choose the repository. Netlify reads `netlify.toml` and fills in the build
   settings for you. Click **Deploy**.

Every time you push a change, the site updates itself.

### GitHub Pages — also free

1. Push this folder to a GitHub repository, with `main` as the branch.
2. On GitHub go to **Settings → Pages → Build and deployment**, and set
   **Source** to **GitHub Actions**.

That's it. `.github/workflows/deploy.yml` handles the rest, including the
`/repository-name/` path that GitHub Pages needs. If you later add a custom
domain, change `BASE_PATH` in that file to `/`.

### After deploying

Set `site.url` in `src/site.config.js` to your real address, and update the
`og:image` meta tags in the page `<head>`s to the full URL
(`https://yoursite.com/og-image.png`) — some apps won't follow a relative path
when generating link previews.

---

## 4 · Connecting a real contact form

Out of the box the contact form opens the visitor's email app with everything
filled in. That works everywhere and needs no account.

To collect submissions properly instead:

1. Make a free form at [formspree.io](https://formspree.io) (or Basin, or
   Netlify Forms) and copy the endpoint URL.
2. In `src/site.config.js`, section 15, set:
   ```js
   formEndpoint: 'https://formspree.io/f/yourformid',
   ```

The form then posts there and shows a thank-you message. No other changes
needed.

---

## 5 · How the site is put together

```
index.html  donate.html  cause.html       the seven pages, plus 404.html
story.html  team.html    thanks.html
contact.html

src/
  site.config.js      ← all the content you edit
  styles/
    tokens.css        colours, fonts, spacing, dark mode
    base.css          reset, typography, grain texture, reduced motion
    layout.css        header, footer, the scrolling thread
    components.css    buttons, tags, cards, timeline, gallery, lightbox
    pages.css         hero and per-page layouts
    main.css          imports the five above
  js/
    main.js           entry point — starts everything
    site.config.js →  read by layout.js, render.js, lightbox.js, form.js
    layout.js         builds the header, mobile menu and footer
    render.js         turns the config into HTML
    thread.js         the thread that sews itself in as you scroll
    reveal.js         scroll animations (GSAP + ScrollTrigger)
    counters.js       counting numbers and the progress bar
    lightbox.js       the photo viewer
    cursor.js         the custom desktop cursor
    form.js           the contact form
    icons.js          all the little SVG icons
    motion.js         shared helpers

public/               copied as-is: favicon, og-image, your photos
tools/                sources for the generated images (not part of the site)
```

### Design system

- **Type** — [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif)
  for headlines (the italic is used for emphasis words), Inter Tight for
  everything else.
- **Colour** — cream `#F5F0E6`, ink navy `#141F33`, terracotta `#C25B3A`,
  sage `#7E9080`. Dark mode follows the visitor's system setting, and the
  header toggle overrides it.
- **The thread** — one SVG path per page, drawn with a clip rectangle that
  grows as you scroll, so the visible line can be a dashed stitch with a
  needle riding the end. See the comment at the top of `src/js/thread.js`.

### Accessibility

Semantic HTML, visible focus outlines, a skip link, keyboard-operable menu and
lightbox, `alt` text on every image, and colour combinations that meet WCAG AA.
Every animation is switched off for anyone whose system asks for reduced
motion. The navigation also has a plain `<noscript>` fallback.

Please keep these working as you edit. The quickest check: unplug your mouse
and try to reach every link with `Tab`.

---

## 6 · Credits

Designed, written and built by students as an IB CAS project.
Not affiliated with Heart for Monroe — we're a project that donates to them.
For anything official, including financial donations, go to
[heartformonroe.com](https://heartformonroe.com).
