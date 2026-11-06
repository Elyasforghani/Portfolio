# Parallax Portfolio

Personal portfolio of **Elyas Forghani** — front-end & creative developer, chemical engineer (University of Kurdistan).

**Live:** https://parallax-portfolio-xi.vercel.app

## What's inside

- **Next.js 16** (App Router) + React 19, plain JavaScript components
- **Three.js** particle field that reacts to the cursor and connects nearby points
- **GSAP ScrollTrigger** for pinned sections, reveals and page transitions
- **Lenis** smooth scrolling, synced with the GSAP ticker
- **Web Audio API** ambient loop with a mute toggle
- A **CLI drawer** (press `` ` ``), a command palette (**Ctrl/⌘ + K**), a Konami easter egg, and a classical Old-Masters hero with pointer parallax

## Routes

| Route | Content |
| --- | --- |
| `/` | Hero, background, selected works, how this site is built, maxims, contact |
| `/works` | Filterable archive of all projects (grid / index views) |
| `/works/[slug]` | Case study per project |
| `/about` | The long version — chemical engineering → web development |
| `/lab` | Experiments: fluid vortex, WebGL refraction, traffic-surge simulator |

## Projects featured

All projects link to real repositories on [github.com/Elyasforghani](https://github.com/Elyasforghani), plus one client production build ([gpm-studio.com](https://gpm-studio.com)).

## Run it

```bash
npm install
npm run dev
```

Sound is off by default; the toggle lives in the header. Respect `prefers-reduced-motion`.
