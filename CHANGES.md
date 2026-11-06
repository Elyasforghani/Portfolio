# What Changed — Truth Pass & De-AI Edition

Your ask: *"the projects are not all mine… see what you can do more about removing the AI feeling."*
I checked every project against your real GitHub (github.com/Elyasforghani) and rewrote everything that wouldn't survive a click-through.

## 1. The fake projects — what I found

I opened each repo before touching anything:

| Portfolio claimed | Reality on GitHub | Verdict |
| --- | --- | --- |
| User Management: "PostgreSQL, Prisma, Redis, Docker, enterprise auth engine" | CRUD dashboard, **MockAPI** backend, React Hook Form, Three.js starfield | **Rewritten honestly** |
| "Global i18n Locale Router with Redis-cached dictionaries, Server Actions, SSR" | **City explorer demo** with EN/FA toggle + mock API | **Rewritten honestly** |
| "Vote Engine with Redis sliding-window rate limiting, optimistic UI" | Simple like/dislike feed, **no Redis anywhere** | **Rewritten honestly** |
| GPM Studio | Live real store (gpm-studio.com), Next.js + Tailwind + Vazirmatn RTL, but **no public repo** | **Kept as "Client Build — source not public"** |
| Portfolio repo link `github.com/Elyasforghani/para` | **404** — the real repo is `Parallax-Portfolio` | **Link fixed** (also in footer bento + CLI) |
| "Nominee Grade Motion" highlight | No such nomination exists | **Removed** |

Every project description now matches its actual README. The case-study pages no longer show the fabricated `Lighthouse 100/100 · Redis <0.2ms · Docker 48MB` strip — replaced with honest facts: **Year / Type / Source (Open Source vs Client Build) / Status (Live vs Code Only)**.

## 2. De-AI pass — the remaining tells

- **Fabricated metrics killed:** `99.4% CACHE HIT`, `0.72 ms Redis Read Latency`, `< 1ms` tiles, `1,000+ Hours of Code`. Home metrics are now real: **35 public repos · 9th Intl. Conf. publication · B.Sc. · live client store**.
- **Bento card replaced:** the fake "Docker•Postgres•Redis•Prisma telemetry buffer" card is now **"How This Site Is Built"** — the one stack you can actually verify by viewing source.
- **Vocabulary:** killed the buzzword salad (`spatial` ×50, `telemetry` ×48, `kinetic` ×17, "Awwwards-caliber", "museum-grade", "monumental", "architected"). Copy now reads like a person: *"The best compliment a page can get isn't 'looks expensive' — it's when someone scrolls it twice just because it feels good."*
- **Thermodynamic maxims kept** (your best, real angle) — but the resolutions no longer claim Redis caches that don't exist. "System Thesis" → "Field Notes".
- **Footer/marquees:** `DOCKER & POSTGRESQL ✦ PRISMA ORM & REDIS CACHING ✦ AWWWARDS CALIBER ✦ MISSION-CRITICAL TELEMETRY` → real stack + honest tags. Stack chips are now what this repo actually uses.
- **CLI kept** (you asked for it before) — but `docker ps`, `redis ping`, `prisma` fake outputs are gone; new honest commands: `bio`, `stack`, `projects`, `github`, `contact`, `matrix`.
- **13 orphaned AI components deleted** (WorldLoader, SlideLines, TactileBadges, StripeWipe, PinnedQuotes, ProjectShowcase, CanvasPlayground, HarmonicKeys, ChromaticMesh, CustomCursorTrail, GsapSetup, HUDDock, DepthProjectTunnel) — they still shipped fabricated copy to anyone reading the repo.
- **`StefanoProjectIndex` renamed** to `ProjectIndex` (a random other person's name in your repo).
- **Metadata fixed:** title/description/keywords no longer advertise Docker/PostgreSQL/Prisma/Redis or "Awwwards-grade".
- **Repo diet:** ~18 unused legacy images removed (~3 MB) and a short honest README added.
- **Bug fix:** the Manifesto headline rendered a literal `&AMP;` (entity in a JS string isn't decoded) — fixed in both places.

## 3. Kept 100% intact

Music/ambient sound controller, hover glow, parallax & particle field, CLI drawer, command palette (⌘K), Konami egg, theme switch, Old Masters hero, Lenis scroll, all 10 real projects, Ava Nama Noor / University of Kurdistan / conference paper facts, contact links (email/GitHub/LinkedIn/Instagram).

## 4. One judgment call you should confirm

- **GPM Studio stays** as client production (live site + your screenshots = real work). If it's *not* your build, delete the first block in `src/data/projects.js` and card 1 in `EngineeringBento.jsx` — everything renumbers automatically.
- Soft skill chips (PostgreSQL/Prisma/Redis/Docker under "Backend & Data") are kept as *skills* — if you don't want them claimed at all, they're in `about/page.jsx` (stackClusters) and `Capabilities.jsx`.
