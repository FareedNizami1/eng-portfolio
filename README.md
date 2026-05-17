# Engineering Portfolio

A modern, single-page portfolio for **Syed Fareed Nizami Alam** — Mechatronics Engineer. Built with Next.js, TypeScript, and a glassmorphic dark/light UI with interactive 3D visuals, project deep-dives, and a CAD work showcase.

---

## Overview

This site presents professional background, education, experience, mechatronics projects, and CAD portfolio work in one scrollable experience. Content is driven from typed data files so updates do not require touching layout code.

**Highlights**

- Responsive single-page layout with smooth in-page navigation
- Dark / light theme with system preference support
- WebGL hero backdrop (React Three Fiber) with theme-aware styling
- Project cards with themed gradients, modal detail views (~95% viewport), and a cinematic media gallery (images + demo videos)
- CAD portfolio grid with expandable project dialogs and image lightbox
- Downloadable resume (`/public/resume.pdf`)
- Accessible dialogs, keyboard support (e.g. Escape to close), and reduced-motion awareness

---

## Tech Stack

| Layer | Technologies |
|--------|----------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI | React 19, [Tailwind CSS v4](https://tailwindcss.com/) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| 3D | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |

---

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Name, role, tagline, CTA to projects and resume |
| **Background** | Personal / professional narrative |
| **Education** | Degrees, achievements, institution logos |
| **Experience** | Roles, timelines, bullet highlights |
| **Projects** | Mechatronics builds with galleries, videos, and structured detail blocks |
| **CAD** | SolidWorks, AutoCAD, Inventor, Creo exercises and assemblies |
| **Connect** | Email and LinkedIn links |

---

## Project Structure

```
eng-portfolio/
├── public/                 # Static assets (images, videos, resume, logos)
│   ├── project1/           # Project photos & demo videos
│   ├── cadProjects/        # CAD previews
│   └── resume.pdf
├── src/
│   ├── app/                # Next.js App Router (layout, page, globals)
│   ├── components/         # UI components & section modules
│   │   └── sections/       # Page sections (Hero, Projects, CAD, …)
│   └── data/
│       ├── portfolio.ts    # Site copy, education, experience, projects
│       └── cadSoftware.ts  # CAD software groups & project entries
├── patches/                # patch-package overrides (if any)
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 20.x or later (LTS recommended)
- **npm** (or pnpm / yarn)

### Install & run

```bash
git clone https://github.com/<your-username>/eng-portfolio.git
cd eng-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Customizing Content

Most copy and listings live in two data modules:

### `src/data/portfolio.ts`

- `site` — name, role, tagline, contact
- `education`, `experience` — timelines and details
- `projects` — project cards, images, optional `video`, and dialog blocks (`paragraphs`, `bullets`, `stats`, etc.)
- `connect`, `resume`, `navLinks`

### `src/data/cadSoftware.ts`

- CAD tool groups (SolidWorks, AutoCAD, Inventor, Creo)
- Per-project titles, descriptions, specs, and image paths

### Assets

Place files under `public/` and reference them with root paths (e.g. `/project1/photo.jpg`, `/project1/videos/demo.mp4`).

---

## Deployment

Optimized for static-friendly hosting on [Vercel](https://vercel.com):

1. Push the repository to GitHub.
2. Import the project in Vercel and deploy (framework preset: **Next.js**).
3. Ensure large media in `public/` are committed or served from your chosen CDN.

For other hosts, run `npm run build` then `npm run start`, or follow your platform’s Next.js deployment guide.

---

## Environment

No `.env` variables are required for the default setup. Add secrets only if you integrate analytics, forms, or external APIs later.

---

## Author

**Syed Fareed Nizami Alam**  
Mechatronics Engineer · Product & mechanical design  

- Email: [fareedalam64@gmail.com](mailto:fareedalam64@gmail.com)
- LinkedIn: [syed-fareed-alam-nizami](https://www.linkedin.com/in/syed-fareed-alam-nizami/)

---

## License

This repository is a personal portfolio project. All rights reserved unless otherwise noted. Do not reuse content or assets without permission.
