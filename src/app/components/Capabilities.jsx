'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Code2, 
  Database, 
  Boxes, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight,
  Layers,
  Activity,
  Terminal,
  ShieldCheck
} from 'lucide-react'
import { sound } from '../../utils/audio'
import AnimatedHeaderSection from './AnimatedHeaderSection'

gsap.registerPlugin(ScrollTrigger)

const CAPABILITIES = [
  {
    number: '01',
    id: 'frontend',
    title: 'Frontend & Type-Safe Architecture',
    subtitle: 'Strict typing, modern React 19 & Next.js 16',
    icon: Code2,
    gradient: 'from-cyan-500/20 via-transparent to-transparent',
    accentBorder: 'border-cyan-400/30 hover:border-cyan-400/60',
    accentBadge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    telemetry: { label: 'TYPE RIGOR', value: '100% STRICT', status: 'optimal' },
    description:
      'Crafting pixel-perfect, highly responsive interfaces with Next.js 16 and React 19. Leveraging TypeScript for strictly typed component boundaries, resilient state management, and modern Tailwind CSS design tokens.',
    skills: [
      'Next.js 16 & React 19',
      'TypeScript (Type-Safe Pipelines)',
      'Tailwind CSS v4 Design Tokens',
      'Server & Client Components',
      'Zero-CLS Hydration',
    ],
    highlights: [
      'Zero hydration flicker architecture',
      'RSC streaming & Suspense boundaries',
      'Adaptive responsive viewport geometry',
    ],
  },
  {
    number: '02',
    id: 'backend',
    title: 'Backend & Data',
    subtitle: 'APIs, relational data & the glue in between',
    icon: Database,
    gradient: 'from-slate-400/20 via-transparent to-transparent',
    accentBorder: 'border-slate-300/30 hover:border-slate-300/60',
    accentBadge: 'bg-white/10 text-slate-200 border-white/20',
    telemetry: { label: 'COMFORT ZONE', value: 'REST + SQL', status: 'optimal' },
    description:
      'Route handlers and REST integrations (MockAPI, public APIs), relational data modeling with PostgreSQL and Prisma, and the discipline to keep the data layer simple until it genuinely needs not to be.',
    skills: [
      'PostgreSQL & Prisma ORM',
      'Redis (caching & sessions)',
      'Docker & Docker Compose',
      'Server Actions & API Handlers',
      'REST integration (MockAPI / public APIs)',
    ],
    highlights: [
      'Schema-first data modeling',
      'Clean request/response boundaries',
      'Environment parity with Docker & Compose',
    ],
  },
  {
    number: '03',
    id: 'spatial',
    title: '3D Spatial WebGL & Motion Craft',
    subtitle: 'Spatial depth cameras with Three.js & GSAP',
    icon: Boxes,
    gradient: 'from-purple-500/20 via-transparent to-transparent',
    accentBorder: 'border-purple-400/30 hover:border-purple-400/60',
    accentBadge: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    telemetry: { label: 'FRAME TIMING', value: '60 FPS LOCKED', status: 'optimal' },
    description:
      'Three.js canvas environments, interactive particle fields that push back against the cursor, GSAP ScrollTrigger timelines and depth-scroll tunnels — this portfolio is the live demo.',
    skills: [
      'Three.js Particle Meshes',
      'GSAP 3 & ScrollTrigger',
      'Vertical In-Depth 3D Tunnels',
      'Lenis Smooth Motion',
      'Web Audio Synchronization',
    ],
    highlights: [
      'Hardware-accelerated vector fields',
      'Scroll & tab visibility rAF throttling',
      'Smooth inertial scroll delta interpolation',
    ],
  },
  {
    number: '04',
    id: 'rigor',
    title: 'Engineering Rigor & Optimization',
    subtitle: 'Disciplined logic from chemical engineering',
    icon: Cpu,
    gradient: 'from-emerald-500/20 via-transparent to-transparent',
    accentBorder: 'border-emerald-400/30 hover:border-emerald-400/60',
    accentBadge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    telemetry: { label: 'CORE WEB VITALS', value: 'KEEPING IT GREEN', status: 'optimal' },
    description:
      'The transferable part of a chemical engineering degree: decompose the system, measure before changing anything, and keep runtime overhead low. Continuous deployment on Vercel and Netlify.',
    skills: [
      'Algorithmic Modeling',
      'Core Web Vitals Optimization',
      'Vercel CI/CD & Git Workflows',
      'Systemic Failure Diagnostics',
      'Chemical Eng. Discipline',
    ],
    highlights: [
      'Systematic bottleneck isolation',
      'Zero-memory-leak rAF lifecycles',
      'Thermodynamic feedback loop design',
    ],
  },
]

export default function Capabilities() {
  const container = useRef(null)

  return (
    <section
      id="capabilities"
      ref={container}
      className="relative z-10 py-28 md:py-36 px-6 bg-[#060709] text-white border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated Masked Header */}
        <AnimatedHeaderSection
          eyebrow="04 / Engineering Disciplines"
          title={["Architectural Stack", "& System Disciplines"]}
          subtitle="Multi-disciplinary engineering spanning strictly-typed Next.js systems, relational persistence, and hardware-accelerated WebGL."
        />

        {/* Stacking Sticky Cards ("Deck of Cards" Effect) */}
        <div className="relative flex flex-col gap-8 pb-12">
          {CAPABILITIES.map((cap, idx) => {
            const CapIcon = cap.icon
            // Incremental sticky offset creates the stacking deck
            const topOffset = `calc(12vh + ${idx * 2.5}rem)`
            const marginBottom = `${(CAPABILITIES.length - idx - 1) * 3}rem`

            return (
              <div
                key={cap.number}
                className={`sticky rounded-3xl p-6 sm:p-10 md:p-12 border bg-[#090c10]/95 backdrop-blur-2xl transition-all duration-500 shadow-2xl ${cap.accentBorder}`}
                style={{
                  top: topOffset,
                  marginBottom: marginBottom,
                }}
                onMouseEnter={() => sound.playHoverTick()}
              >
                {/* Background chromatic radiance glow */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${cap.gradient} pointer-events-none opacity-40`}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Number & Identity */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-slate-200">
                          [ {cap.number} ]
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                          <CapIcon className="w-4 h-4" />
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded-full uppercase border ${cap.accentBadge}`}>
                        {cap.telemetry.value}
                      </span>
                    </div>

                    <h3 className="font-syne font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white leading-tight">
                      {cap.title}
                    </h3>

                    <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      {cap.subtitle}
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/10 hidden sm:block">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                        QUICK FACTS
                      </span>
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{cap.telemetry.label} • {cap.telemetry.value}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Description & System Highlights */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <p className="text-sm sm:text-base font-sans text-neutral-300 font-light leading-relaxed break-words">
                      {cap.description}
                    </p>

                    {/* System Guarantees Checklist */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-3">
                        How I Work
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cap.highlights.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-200 shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Pills */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-3">
                        Core Technologies
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cap.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-200 hover:border-slate-300/40 hover:text-white transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
