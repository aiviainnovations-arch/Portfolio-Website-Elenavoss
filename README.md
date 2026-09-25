# Elena Voss — Photographer & Visual Storyteller

An AIVA portfolio **concept**: a production-ready personal portfolio site
for a fictional editorial photographer, built to demonstrate AIVA's
ability to design premium, cinematic, 3D-aware creative websites — not a
technology or SaaS site.

> Elena Voss is not a real person. This is a design/engineering showcase.
> See `AIVA PORTFOLIO CONCEPT` in the footer of every page, and
> `public/media-credits.md` for what the placeholder media is.

**Stack:** React + Vite + TypeScript + Tailwind CSS + GSAP (ScrollTrigger)
+ Three.js / React Three Fiber, deployed as a static site to GitHub Pages.

---

## 1. Project overview

- **Hero** — a floating 3D portrait plate (React Three Fiber) that tilts
  with the cursor and recedes into depth on scroll; falls back to a
  static image on touch devices and when `prefers-reduced-motion` is set.
- **Selected Work** — an asymmetrical, alternating editorial grid of 6
  fictional projects, each opening into a **case study page**
  (`/work/:slug`) with a full image/film sequence and a fullscreen,
  keyboard- and swipe-navigable gallery viewer.
- **Films** — a grid of 4 short-film placeholders with in-view preview
  playback and a fullscreen video viewer.
- **About / Process / Journal / Contact** — minimal, text-light sections;
  Journal opens articles in a lightweight in-page reader.
- Custom minimal cursor with contextual labels (`View Project`,
  `Play Film`, `Open`, `Close` …), disabled automatically on touch
  devices.
- Full reduced-motion and keyboard-accessibility support throughout.

### Where things live

```
public/
  images/            ← all still images (see "Replacing images")
  videos/             ← all film/video files (see "Replacing videos")
  media-credits.md    ← source/license log for any real media you add
src/
  components/         ← ResponsiveImage, CinematicVideo, Navbar, Footer,
                        CustomCursor, FullscreenGallery, MagneticButton
  sections/           ← Hero, SelectedWork, Films, About, Process,
                        Journal, Contact — one file per homepage section
  pages/              ← Home.tsx, ProjectCase.tsx (the /work/:slug route)
  three/HeroScene.tsx ← the only R3F canvas in the project, lazy-loaded
  data/               ← projects.ts, films.ts, journal.ts — all content
  styles/globals.css  ← design tokens (colors, easing) + base styles
```

Content is deliberately kept out of components and in `src/data/*.ts`, so
adding a project or film never means touching a component.

---

## 2. Installation

```bash
npm install
```

Requires Node 18+ (Node 20 is used in the deploy workflow).

## 3. Development

```bash
npm run dev
```

Opens a local dev server with hot reload.

## 4. Production build

```bash
npm run build
npm run preview   # serve the built dist/ locally to sanity-check it
```

`npm run build` runs a strict TypeScript check (`tsc -b`) before bundling
with Vite, so type errors fail the build rather than shipping.

## 5. Deploying to GitHub Pages

A workflow is already included at `.github/workflows/deploy.yml`. To use it:

1. Push this project to a GitHub repository.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. If your repository name is **not** `elena-voss-portfolio`, update the
   `VITE_BASE_PATH` value in both `.github/workflows/deploy.yml` and (for
   local production builds) pass it as an env var:
   ```bash
   VITE_BASE_PATH=/your-repo-name/ npm run build
   ```
   Use `VITE_BASE_PATH=/` if you're deploying to a custom domain or a
   `<username>.github.io` *user/organization* site (not a project site).
4. Push to `main` — the workflow builds and deploys automatically.

Routing uses React Router's `HashRouter` (URLs like `/#/work/earth-silk`)
specifically because GitHub Pages has no server-side rewrite rules — a
plain path-based route would 404 on refresh or direct link. Hash routes
always resolve to `index.html` first, so deep links and refreshes both
work under a project-site subpath.

---

## 6. Replacing images

Every image goes through the `<ResponsiveImage />` component and is
referenced by a single path in `src/data/projects.ts`, `films.ts`, or
`journal.ts` (plus `hero-poster.jpg` and `about.jpg`, referenced directly
in `Hero.tsx` / `About.tsx`). To swap one:

1. Drop the new file into `public/images/`.
2. Update the matching `src`/`coverImage` path in `src/data/*.ts` (or in
   `Hero.tsx` / `About.tsx` for the hero and about portraits).
3. Log it in `public/media-credits.md` if it's licensed/stock.

Keep roughly the same aspect ratio as the asset you're replacing
(`coverAspect` / the `aspect` prop) so the layout doesn't shift. Prefer
compressed JPG/WebP — large unoptimized files will slow the site down.

## 7. Replacing videos

Same pattern, through `<CinematicVideo />`:

1. Drop the `.mp4` (H.264, ideally under ~5MB for a homepage preview)
   into `public/videos/`, and a matching poster frame into
   `public/images/`.
2. Update the `src`/`poster` pair in `src/data/films.ts` or the relevant
   project's `gallery` array in `src/data/projects.ts`.

`<CinematicVideo />` only starts playback once a clip scrolls into view,
and freezes on the poster frame entirely when the visitor has
`prefers-reduced-motion` set — you don't need to change any component
code when swapping the file.

## 8. Adding a new portfolio project

Add an entry to the `projects` array in `src/data/projects.ts`:

```ts
{
  index: "07",
  slug: "your-project-slug",
  title: "Your Title",
  category: "Editorial Portraits",
  year: "2026",
  location: "City",
  description: "One or two sentences, no more.",
  coverImage: "/images/your-cover.jpg",
  coverAspect: "portrait", // "portrait" | "landscape" | "square"
  gallery: [
    { type: "image", src: "/images/your-1.jpg", caption: "…" },
    { type: "video", src: "/videos/your-1.mp4", poster: "/images/your-1-poster.jpg" },
  ],
}
```

It will automatically appear in "Selected Work" and get a case-study page
at `/work/your-project-slug` — no component changes required.

## 9. Modifying colours

All colours are design tokens in **two** places that should be kept in
sync:

- `tailwind.config.ts` → `theme.extend.colors` (used as `bg-clay`,
  `text-charcoal`, etc. throughout the components)
- `src/styles/globals.css` → the `:root` CSS variables (used for a few
  raw values, e.g. inside the custom cursor and grain overlay)

The current palette is warm ivory / sand / stone / taupe / clay /
espresso / charcoal — see the brief's palette section for hex values.

## 10. Modifying typography

Fonts are loaded in `index.html` (Google Fonts: **Fraunces** for display
serif headings, **Inter** for UI/sans text) and mapped in
`tailwind.config.ts` → `theme.extend.fontFamily` as `font-display` /
`font-sans`. To change either, update both the `<link>` in `index.html`
and the corresponding `fontFamily` entry.

## 11. Connecting the contact form

The form in `src/sections/Contact.tsx` posts to
`import.meta.env.VITE_CONTACT_ENDPOINT`. With nothing set, it shows a
simulated (but real UI-complete) success state so the interaction is
fully demonstrable. To wire it to a real backend (Formspree, a
serverless function, etc.):

1. Create a `.env` file (not committed) with:
   ```
   VITE_CONTACT_ENDPOINT=https://your-endpoint.example.com/submit
   ```
2. The form already `POST`s a `FormData` with `name`, `email`, `message`
   fields and expects a JSON-friendly `Accept` response — adjust
   `handleSubmit` in `Contact.tsx` if your endpoint needs a different
   shape.

## 12. How the 3D system works

`src/three/HeroScene.tsx` is the **only** React Three Fiber canvas in the
project, used once, for the hero. It renders a single textured plane that:

- drifts gently on a sine wave (idle float),
- tilts on both axes toward the cursor (damped, not 1:1, for a heavier
  "art installation" feel rather than a gimmick),
- is lazy-loaded (`React.lazy`) so the Three.js/R3F bundle is only
  downloaded when a non-touch, motion-enabled visitor reaches the hero,
- is swapped for a plain static image automatically on touch devices and
  when `prefers-reduced-motion` is set.

Every other "3D-feeling" moment on the site (the About portrait's tilt,
project-row hover states, scroll-scrubbed hero recession) is 2D CSS/GSAP
transforms, not WebGL — kept deliberately light so the rest of the page
stays fast, per the brief's "3D should enhance the photography, not be
everywhere" direction.

---

## A note on how this build was produced

This project was generated in a sandboxed environment with **no general
internet access for downloading files** (no `npm install`, no fetching
binary assets into the repo), which affects two things a reviewer should
know:

- **Photography:** the hero, about portrait, journal thumbnails and 5 of
  the 6 project covers now use real, freely-licensed photography from
  Unsplash, referenced by direct CDN URL (`images.unsplash.com`) rather
  than downloaded — the sandbox couldn't write binary files fetched from
  the web, but it could reach Unsplash's own search/API surface to find
  and verify individually-licensed, "free to use" photos. See
  `public/media-credits.md` for the full photographer/photo credit list.
  Everything else — supporting gallery imagery and every video — is still
  an original, procedurally-generated placeholder (FFmpeg gradient/grain
  plates), because no equivalent free hotlinkable video source could be
  reliably sourced the same way. Swapping any of it for your own
  photography or footage is a one-line change — see §6–7 above.
- **Dependencies:** `npm install` could not be run here, so this build
  has not been compiled or opened in a browser in this environment. The
  code was written by hand against the documented APIs of React 18,
  React Router 6, GSAP 3, Tailwind 3, Three.js and React Three Fiber, and
  `npm run build` runs a full TypeScript check — but you should run
  `npm install && npm run build` yourself as a first step, and treat that
  as part of reviewing this deliverable rather than a formality.
