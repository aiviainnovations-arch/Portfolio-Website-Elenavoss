<div align="center">

# Elena Voss

**Photographer & Visual Storyteller. Images with a point of view.**

A cinematic, 3D-aware portfolio concept for a fictional editorial photographer.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-1F1D1A?style=for-the-badge)](https://aiviainnovations-arch.github.io/Portfolio-Website-Elenavoss/)
[![License: MIT](https://img.shields.io/badge/License-MIT-A99178?style=for-the-badge)](LICENSE)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?logo=greensock&logoColor=white)
![Three.js](https://img.shields.io/badge/React_Three_Fiber-3D-000000?logo=threedotjs&logoColor=white)

<img src="public/images/screenshots/Screenshot%202026-10-01%20021130.png" alt="Elena Voss portfolio hero with floating 3D portrait" width="900">

</div>

> **Disclaimer:** Elena Voss is not a real person. This is a design and engineering showcase by Aivia Innovations. The footer of every page is marked as a portfolio concept, and `public/media-credits.md` lists the source of the placeholder media.

---

## Table of contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Customisation](#customisation)
- [How the 3D works](#how-the-3d-works)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Media credits](#media-credits)
- [License](#license)

---

## Overview

A personal portfolio for an imaginary editorial photographer, designed to show how Aivia Innovations builds premium, cinematic creative websites. The palette is warm ivory, sand, taupe and charcoal, the type pairs Fraunces with Inter, and 3D is used once, in the hero, so it enhances the photography rather than competing with it.

## Screenshots

### Hero

<p align="center">
  <img src="public/images/screenshots/Screenshot%202026-10-01%20021130.png" alt="Hero: floating portrait plate that tilts with the cursor" width="900">
</p>

<sub>A floating 3D portrait plate that tilts with the cursor and recedes into depth on scroll.</sub>

### Selected work and About

<table>
  <tr>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-10-01%20021136.png" alt="Selected Work section with Quiet Forms project"><br><sub><b>Selected Work</b> - alternating editorial grid of projects</sub></td>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-10-01%20021143.png" alt="About section: A way of seeing"><br><sub><b>About</b> - A way of seeing</sub></td>
  </tr>
</table>

### Films and Journal

<table>
  <tr>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-10-01%20021148.png" alt="Films section with Silent Motion and Afternoon Light"><br><sub><b>Films</b> - short-film grid with in-view preview playback</sub></td>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-10-01%20021155.png" alt="Journal section with three articles"><br><sub><b>Journal</b> - articles open in a lightweight in-page reader</sub></td>
  </tr>
</table>

### Contact

<p align="center">
  <img src="public/images/screenshots/Screenshot%202026-10-01%20021200.png" alt="Contact section: Let's make something memorable" width="900">
</p>

<sub>Enquiry form with a fully demonstrable success state, ready to connect to a real endpoint.</sub>

---

## Features

- **3D hero:** a React Three Fiber portrait plate that floats, tilts toward the cursor and recedes on scroll, with a static image fallback on touch devices and under reduced motion
- **Selected Work:** an asymmetrical, alternating grid of 6 fictional projects, each with a case-study page at `/work/:slug`
- **Fullscreen gallery:** keyboard- and swipe-navigable viewer for images and films
- **Films:** 4 short-film placeholders with in-view preview playback and a fullscreen player
- **About, Process, Journal, Contact:** minimal, text-light sections
- **Custom cursor** with contextual labels (View Project, Play Film, Open, Close), disabled on touch devices
- **Content in data files:** add a project, film or article without touching a component
- **Accessible:** reduced-motion and keyboard support throughout

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 18, TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animation | GSAP (ScrollTrigger) |
| 3D | Three.js, React Three Fiber, drei |
| Routing | React Router v6 (HashRouter) |
| Fonts | Fraunces and Inter (Google Fonts) |
| Deployment | GitHub Pages |

## Getting started

Requires **Node 18+** (Node 20 is used in the deploy workflow).

```bash
git clone https://github.com/aiviainnovations-arch/Portfolio-Website-Elenavoss.git
cd Portfolio-Website-Elenavoss

npm install
npm run dev      # local dev server with hot reload
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Strict TypeScript check (`tsc -b`), then a Vite production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | TypeScript check only (`tsc --noEmit`) |

## Project structure

```text
public/
├── images/             # all still images (and README screenshots)
├── videos/             # film and video files
└── media-credits.md    # source and license log for media
src/
├── components/         # ResponsiveImage, CinematicVideo, Navbar, Footer,
│                       # CustomCursor, FullscreenGallery, MagneticButton
├── sections/           # Hero, SelectedWork, Films, About, Process,
│                       # Journal, Contact
├── pages/              # Home.tsx, ProjectCase.tsx (/work/:slug)
├── three/HeroScene.tsx # the only R3F canvas, lazy-loaded
├── data/               # projects.ts, films.ts, journal.ts - all content
└── styles/globals.css  # design tokens and base styles
```

## Customisation

**Replace images.** Every image goes through `<ResponsiveImage />` and is referenced by one path in `src/data/projects.ts`, `films.ts` or `journal.ts` (the hero and about portraits are set in `Hero.tsx` and `About.tsx`). Drop the new file into `public/images/`, update the path, and log it in `public/media-credits.md` if it is licensed stock. Keep a similar aspect ratio so the layout does not shift, and prefer compressed JPG or WebP.

**Replace videos.** Drop an `.mp4` (H.264, ideally under about 5 MB for a homepage preview) into `public/videos/` and a poster frame into `public/images/`, then update the `src` / `poster` pair in `src/data/films.ts` or the project's `gallery`. `<CinematicVideo />` only plays once a clip scrolls into view and freezes on the poster under reduced motion.

**Add a project.** Add an entry to the `projects` array in `src/data/projects.ts`:

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
    { type: "image", src: "/images/your-1.jpg", caption: "..." },
    { type: "video", src: "/videos/your-1.mp4", poster: "/images/your-1-poster.jpg" },
  ],
}
```

It appears in Selected Work automatically and gets a case-study page at `/work/your-project-slug`.

**Colours.** Keep two places in sync: `theme.extend.colors` in `tailwind.config.ts` and the `:root` variables in `src/styles/globals.css`. The palette is ivory `#F3EFE7`, sand `#E5DED2`, stone `#C9BCAA`, taupe `#A99178`, clay `#6F6254`, espresso `#403931` and charcoal `#1F1D1A`.

**Typography.** Fonts load in `index.html` and map to `font-display` (Fraunces) and `font-sans` (Inter) in `tailwind.config.ts`. To change one, update both.

**Contact form.** The form in `src/sections/Contact.tsx` posts `name`, `email` and `message` to `import.meta.env.VITE_CONTACT_ENDPOINT`. With nothing set it shows a simulated success state. To connect a real backend (Formspree, a serverless function and so on), create a `.env` file that is not committed:

```bash
VITE_CONTACT_ENDPOINT=https://your-endpoint.example.com/submit
```

## How the 3D works

`src/three/HeroScene.tsx` is the only React Three Fiber canvas in the project. It renders one textured plane that drifts on a sine wave, tilts toward the cursor with damping for a heavier, gallery-installation feel, and is lazy-loaded so Three.js only downloads for non-touch, motion-enabled visitors who reach the hero. Elsewhere the depth effects (About portrait tilt, project hover states, scroll-scrubbed hero recession) are 2D CSS and GSAP transforms, which keeps the rest of the page fast.

## Deploying to GitHub Pages

A GitHub Actions workflow is included in `.github/workflows/`.

1. Push the project to GitHub.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Make sure `base` in `vite.config.ts` matches your repository name:

   ```ts
   base: "/Portfolio-Website-Elenavoss/",
   ```

   Use `base: "/"` for a custom domain or a `<username>.github.io` site.
4. Push to `main`. The workflow builds and deploys automatically.

Routing uses React Router's `HashRouter` (URLs like `/#/work/earth-silk`). GitHub Pages has no server-side rewrites, and hash routes always resolve to `index.html`, so deep links and refreshes work under a project-site subpath.

## Media credits

The hero, about portrait, journal thumbnails and most project covers use freely licensed Unsplash photography, referenced by CDN URL. Supporting gallery imagery and all videos are procedurally generated placeholders. Full photographer and license details are in [`public/media-credits.md`](public/media-credits.md). Only use media you have rights to when replacing them.

## License

Released under the [MIT License](LICENSE). Third-party media, including Unsplash photography, remains under its own license.

---

<div align="center">

Designed and built by **Aivia Innovations**. Elena Voss is a fictional concept.

</div>
