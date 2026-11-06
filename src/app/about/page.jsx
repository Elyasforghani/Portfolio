'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ThreeBackground from '../components/ThreeBackground'
import Capabilities from '../components/Capabilities'
import { Code2, Database, Box, Zap, Layers, GraduationCap, Radio, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const timeline = [
    {
      period: '2025 — PRESENT',
      role: 'Front-End & Creative Developer',
      org: 'Independent / Open Source',
      description:
        'Building client work — including the GPM Studio storefront (gpm-studio.com) — and shipping open-source projects with Next.js, TypeScript, Tailwind, Three.js and GSAP. This portfolio is the playground.',
      icon: Code2,
      badge: 'Active Focus',
    },
    {
      period: '2023 — 2024',
      role: 'Control Room Operator',
      org: 'Ava Nama Noor Company',
      description:
        'Ran multi-stream telemetry and live video display walls where nothing was allowed to go dark. First responder for hardware and network failures — and a masterclass in staying calm while diagnosing live systems.',
      icon: Radio,
      badge: 'Systems Monitoring',
    },
    {
      period: '2018 — 2023',
      role: 'B.Sc. Chemical Engineering',
      org: 'University of Kurdistan',
      description:
        'Mass and energy transport modeling, systemic feedback loops, numerical methods. Published dynamic matrix data verification at the 9th International Conference on Chemical Engineering.',
      icon: GraduationCap,
      badge: 'Degree & Research',
    },
  ]

  const stackClusters = [
    {
      name: 'Backend & Data',
      skills: [
        'PostgreSQL (relational modeling)',
        'Prisma ORM (schema migrations)',
        'Redis (in-memory caching & sessions)',
        'Docker & Docker Compose',
        'REST APIs & Server Actions',
      ],
      icon: Database,
    },
    {
      name: 'Frontend',
      skills: [
        'Next.js 16 (App Router & SSR)',
        'React 19 & Server Components',
        'TypeScript',
        'Tailwind CSS v4 design tokens',
        'Responsive mobile-first UX',
      ],
      icon: Code2,
    },
    {
      name: '3D & Motion',
      skills: [
        'Three.js (particles & scenes)',
        'GSAP 3 & ScrollTrigger',
        'Lenis smooth scrolling',
        'Web Audio API',
        'Custom cursor & interaction states',
      ],
      icon: Layers,
    },
  ]

  return (
    <div className="relative font-sans bg-[#14213d] text-[#f4ede0] min-h-screen selection:bg-[#f4ede0] selection:text-[#14213d]">
      <ThreeBackground />
      <Header />

      <main className="relative z-10 pt-36 pb-32 px-6 max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-slate-300 mb-3">
            <span>[ ABOUT / THE LONG VERSION ]</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-syne text-white mb-6 break-words">
            Chemical Engineering <br />
            <span className="text-neutral-500 font-normal">Meets The Front-End</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl font-sans break-words">
            My path into web development didn’t start in a computer science lecture hall. It started in the chemical engineering labs of the University of Kurdistan, solving mass-transfer equations and thermodynamic systems.
          </p>
        </div>

        {/* Narrative & Portrait Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-5">
            <div className="group relative rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl">
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <Image
                  src="/images/elyas-editorial.webp"
                  alt="Elyas Forghani"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-white mb-1">
                  Elyas Forghani
                </h3>
                <span className="text-xs font-mono text-slate-300 block mb-4">
                  Front-End &amp; Creative Developer
                </span>
                <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
                  B.Sc. Chemical Engineering • University of Kurdistan • Open to engineering roles and freelance work.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-neutral-300 font-light text-base sm:text-lg leading-relaxed font-sans min-w-0">
            <h2 className="font-syne font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              From Process Systems to Web Systems
            </h2>
            <p>
              In chemical process engineering, every system has inputs, conversion steps, and one rate-limiting bottleneck that decides the throughput of everything else. If you don’t measure honestly, the system fails under stress.
            </p>
            <p>
              When I moved into web development, that mindset carried over. I care about where an app actually gets slow, what happens when the data is late, and whether the interface answers the user immediately. <strong className="text-white font-medium">Next.js</strong> and <strong className="text-white font-medium">TypeScript</strong> give me the structure; <strong className="text-white font-medium">Three.js</strong> and <strong className="text-white font-medium">GSAP</strong> let me make it move.
            </p>
            <p>
              The best compliment a page can get isn’t “looks expensive” — it’s when someone scrolls it twice just because it feels good. That’s the standard I build to.
            </p>

            <div className="pt-4">
              <Link
                href="/lab"
                data-cursor="LAB"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-syne font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-lg"
              >
                <span>Explore the 3D WebGL Shader Lab</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Stack Radar */}
        <div className="mb-24">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 block mb-3">
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-syne text-white mb-10">
            Tools I Work With
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stackClusters.map((cluster) => {
              const Icon = cluster.icon
              return (
                <div
                  key={cluster.name}
                  className="p-6 sm:p-8 rounded-3xl glass-panel flex flex-col justify-between hover:border-slate-300/40 transition-all duration-300 min-w-0"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <Icon className="w-5 h-5 text-slate-200" />
                      </div>
                      <h3 className="font-syne font-bold text-lg uppercase tracking-tight text-white">
                        {cluster.name}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {cluster.skills.map((s) => (
                        <li
                          key={s}
                          className="text-xs font-mono text-neutral-300 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Chronological Timeline */}
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 block mb-3">
            Trajectory
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-syne text-white mb-12">
            Timeline
          </h2>

          <div className="space-y-8">
            {timeline.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl glass-panel hover:border-slate-300/40 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                      <Icon className="w-5 h-5 text-slate-200" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono text-slate-400 font-bold">
                          {item.period}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="font-syne font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                        {item.role}
                      </h3>
                      <span className="text-xs font-mono text-neutral-400 block mb-3">
                        {item.org}
                      </span>
                      <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-2xl font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Interactive Capabilities & Disciplines Deck */}
      <Capabilities />

      <Footer />
    </div>
  )
}
