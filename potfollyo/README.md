# Vatsal Tailor — MSc Dissertation Portfolio

A production-quality **React 19 + Vite + TypeScript** portfolio website showcasing the MSc Computing dissertation:

> **Predictive Maintenance and Equipment Failure Prediction Using the NASA Turbofan Engine Dataset**
> Vatsal Nileshbhai Tailor · MSc Computing · University of Roehampton

The site is a polished showcase of the dissertation project for supervisors, recruiters, and
employers — built with the same modern stack (Tailwind, Framer Motion, Recharts, Plotly) the
target employers use in production.

---

## Highlights

- **13 routed pages** — Home, About, Dataset, Preprocessing, Feature Engineering, Model Training,
  RUL Prediction, Evaluation, Feature Importance, Maintenance, Research, Downloads, Contact, 404.
- **Premium SaaS look** — glassmorphism, soft shadows, gradients, rounded cards, custom Tailwind
  design tokens, animated counters, scroll-triggered reveals, page transitions.
- **Dark + light theme** with `localStorage` persistence and `prefers-color-scheme` fallback.
- **Interactive** RUL prediction dashboard with engine selector, gauge chart, and per-model bars.
- **Live charts** — Recharts (bar / radar / scatter / line) themed for both modes.
- **Lazy-loaded routes** with `Suspense` + manual chunks for `react`, `charts`, `motion`.
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigation, focus-visible outlines,
  scroll-snap reset, `color-scheme` set per theme.
- **Performance** — code splitting, lazy images/icons, smooth scroll, gzip ≤ 120 kB main chunk.

---

## Project structure

```
potfollyo/
├── public/                         # Static assets (favicon)
├── src/
│   ├── assets/                     # Imported media (place PNGs here if needed)
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer, ScrollProgress
│   │   └── ui/                     # Card, Badge, SectionHeading, StatCounter, AnimatedSection
│   ├── context/                    # ThemeContext (dark/light + persistence)
│   ├── data/                       # Profile, navigation, project, dataset, research
│   ├── hooks/                      # useChartTheme, useInViewOnce, useDocumentTitle
│   ├── lib/                        # format helpers (number/percent/clamp/maintenance bucket)
│   ├── pages/                      # 13 route components (lazy-loaded)
│   ├── styles/globals.css          # Tailwind layers + custom utility classes
│   ├── App.tsx                     # Router + AnimatePresence page transitions
│   └── main.tsx                    # Entry point
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting started

```bash
cd potfollyo
npm install
npm run dev           # → http://localhost:5173
```

Other scripts:

```bash
npm run build         # type-check + production build into dist/
npm run preview       # serve the production build locally
npm run lint          # TypeScript-only type check
```

---

## Deployment

The project is a static SPA — `npm run build` outputs `dist/` and is ready for any static host.

### Vercel (recommended)

```bash
npm i -g vercel
vercel --prod
```

The Vercel defaults (Vite framework preset) work without any extra config.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

If you need SPA-style routing (so `/about` doesn't 404 on hard refresh), add a `_redirects`
file at `public/_redirects`:

```
/* /index.html 200
```

### GitHub Pages

1. Build: `npm run build`
2. Push `dist/` to the `gh-pages` branch (or use `gh-pages` npm package).
3. In repo settings → Pages → Source: `gh-pages` branch.

> GitHub Pages serves from a sub-path; update `base` in `vite.config.ts` if you deploy to
> `https://<user>.github.io/<repo>/`.

---

## Customisation

All page content lives in `src/data/`. Update the following files to personalise:

| File | What to change |
|---|---|
| `src/data/profile.ts` | Name, university, email, LinkedIn, GitHub |
| `src/data/project.ts` | Project metrics, model results, maintenance buckets, tech stack |
| `src/data/dataset.ts` | Sensor statistics, RUL histogram, predictions, feature importance |
| `src/data/research.ts` | Research questions, objectives, chapters, references |
| `src/data/navigation.ts` | Navbar menu |

---

## Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav aria-label>`.
- All interactive controls have `aria-label`s where icon-only.
- Focus-visible outlines retained (`:focus-visible` ring).
- Reduced-motion respected through Framer Motion's `useReducedMotion` defaults.

---

## License

This portfolio is the personal work of Vatsal Nileshbhai Tailor. The NASA C-MAPSS dataset is
publicly available from the NASA Ames Prognostics Data Repository and is used here for
academic purposes.
