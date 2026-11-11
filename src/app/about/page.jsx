'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ThreeBackground from '../components/ThreeBackground'
import Capabilities from '../components/Capabilities'
import { Code2, Database, Layers, GraduationCap, Radio, ArrowRight, ArrowUpRight } from 'lucide-react'

export default function AboutPage() {
  const timeline = [
    {
      period: '2025 — PRESENT',
      role: 'Front-End & Full-Stack Developer',
      org: 'Independent / Client Production',
      description:
        'Building commercial storefronts — including GPM Studio (gpm-studio.com) — along with REST API dashboards, PostgreSQL schemas, and interactive interfaces powered by Next.js, JavaScript, TypeScript, and GSAP.',
      icon: Code2,
      badge: 'Active Focus',
    },
    {
      period: '2023 — 2024',
      role: 'Control Room Operator',
      org: 'Ava Company',
      description:
        'Ran multi-stream video and sensor display walls where a blank screen meant an incident. Diagnosing hardware and network failures in real time taught me never to trust a system that merely looks fine.',
      icon: Radio,
      badge: 'Operations',
    },
    {
      period: '2018 — 2023',
      role: 'B.Sc. Chemical Engineering',
      org: 'University of Kurdistan',
      description:
        'Published research on Photocatalytic Degradation of Tetracycline Using ZnO Nanoparticles Supported in a Y-Zeolite Matrix (9th International Conference on Chemical Engineering, Civilica OGPCONF09_037). Mass-transfer and heterogeneous support modeling shaped how I structure software systems.',
      icon: GraduationCap,
      badge: 'Degree & Research',
      paperUrl: 'https://civilica.com/doc/1949705/',
    },
  ]

  const stackClusters = [
    {
      name: 'Backend & Database',
      skills: [
        'PostgreSQL (relational schema design)',
        'REST APIs & Async Fetch Pipelines',
        'MockAPI & Full CRUD Data Loops',
        'React Hook Form Validation',
        'Data Integrity & Error Recovery',
      ],
      icon: Database,
    },
    {
      name: 'Frontend',
      skills: [
        'Next.js 16 (App Router & SSR)',
        'React 19 Components',
        'JavaScript (ES6+) & TypeScript',
        'Tailwind CSS v4 Styling',
        'Responsive RTL / LTR Layouts',
      ],
      icon: Code2,
    },
    {
      name: 'Motion & Visuals',
      skills: [
        'GSAP 3 & ScrollTrigger Timelines',
        'Lenis Smooth Inertial Scrolling',
        'Three.js Interactive Scenes',
        'Swiper.js Sliders',
        'Custom Interaction & Hover States',
      ],
      icon: Layers,
    },
  ]

  return (
    <div className="relative font-sans bg-[#14213d] text-[#f4ede0] min-h-dvh selection:bg-[#f4ede0] selection:text-[#14213d]">
      <ThreeBackground />
      <Header />

      <main id="main-content" tabIndex={-1} className="relative z-10 pt-36 pb-24 px-6 max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="mb-16 pb-8 border-b border-[#f4ede0]/10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-syne text-[#f4ede0] mb-6 break-words">
            Engineering Logic <br />
            <span className="text-[#ff6b5b] font-normal">Trustworthy Systems</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#c4b7a1] font-light leading-relaxed max-w-3xl font-sans break-words">
            My path into web development started in the chemical engineering labs of the University of Kurdistan. Studying reaction kinetics, catalyst support matrices, and fluid dynamics gave me the habits I bring to databases and front-end code today.
          </p>
        </div>

        {/* Narrative & Portrait Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-5">
            <div className="group relative rounded-3xl overflow-hidden border border-[#f4ede0]/15 bg-[#0f1a30] shadow-2xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/images/elyas.webp"
                  alt="Elyas Forghani"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a30] via-[#0f1a30]/25 to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-[#f4ede0] mb-1">
                  Elyas Forghani
                </h3>
                <span className="text-xs font-mono text-[#ff6b5b] block mb-4">
                  Front-End &amp; Creative Developer
                </span>
                <p className="text-xs text-[#c4b7a1] font-light leading-relaxed font-sans">
                  B.Sc. Chemical Engineering &bull; University of Kurdistan &bull; Handling big projects with chemistry and care.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[#c4b7a1] font-light text-base sm:text-lg leading-relaxed font-sans min-w-0">
            <h2 className="font-syne font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#f4ede0]">
              From Chemical Engineering to Web Systems
            </h2>
            <p>
              In chemical engineering, performance comes down to structure and bottlenecks. Whether dispersing active nanoparticles inside a Y-Zeolite framework or designing a web interface, giving every component the right support prevents the system from collapsing under load.
            </p>
            <p>
              Most of my work focuses on building clean front-ends and dependable data flows: <strong className="text-[#f4ede0] font-medium">Next.js, JavaScript, and TypeScript</strong> for structure, <strong className="text-[#f4ede0] font-medium">PostgreSQL</strong> and REST APIs for reliable data, and <strong className="text-[#f4ede0] font-medium">GSAP and Tailwind CSS</strong> so every interaction responds smoothly.
            </p>
            <p>
              After a year monitoring live control-room displays at <strong className="text-[#f4ede0] font-medium">Ava Company</strong>, I learned to design interfaces for real conditions — slow networks, edge cases, and clear state feedback — instead of just ideal demos.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/works"
                data-cursor="WORKS"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff6b5b] text-[#14213d] font-syne font-bold text-xs uppercase tracking-widest hover:bg-[#ff8577] transition-colors shadow-lg"
              >
                <span>View Works</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://civilica.com/doc/1949705/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="PAPER"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f1a30] border border-[#f4ede0]/20 text-[#f4ede0] font-mono text-xs uppercase tracking-wider hover:border-[#ff6b5b]/50 hover:text-[#ff6b5b] transition-colors"
              >
                <span>Published Research (Civilica)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Technical Stack Radar */}
        <div className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-syne text-[#f4ede0] mb-10">
            Tools I Work With
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stackClusters.map((cluster) => {
              const Icon = cluster.icon
              return (
                <div
                  key={cluster.name}
                  className="p-6 sm:p-8 rounded-3xl bg-[#0f1a30]/85 border border-[#f4ede0]/15 flex flex-col justify-between hover:border-[#ff6b5b]/50 transition-all duration-300 min-w-0 shadow-xl"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-[#14213d] border border-[#f4ede0]/15">
                        <Icon className="w-5 h-5 text-[#ff6b5b]" />
                      </div>
                      <h3 className="font-syne font-bold text-lg uppercase tracking-tight text-[#f4ede0]">
                        {cluster.name}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {cluster.skills.map((s) => (
                        <li
                          key={s}
                          className="text-xs font-mono text-[#c4b7a1] flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b5b]/80 shrink-0" />
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
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-syne text-[#f4ede0] mb-12">
            Timeline
          </h2>

          <div className="space-y-6">
            {timeline.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-[#0f1a30]/85 border border-[#f4ede0]/15 hover:border-[#ff6b5b]/50 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-[#14213d] border border-[#f4ede0]/15 shrink-0">
                      <Icon className="w-5 h-5 text-[#ff6b5b]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-[#ff6b5b] font-bold">
                          {item.period}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-[#f4ede0]/15 text-[#c4b7a1]">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="font-syne font-black text-xl sm:text-2xl text-[#f4ede0] uppercase tracking-tight">
                        {item.role}
                      </h3>
                      <span className="text-xs font-mono text-[#c4b7a1] block mb-3">
                        {item.org}
                      </span>
                      <p className="text-sm text-[#c4b7a1] font-light leading-relaxed max-w-2xl font-sans">
                        {item.description}
                      </p>
                      {item.paperUrl && (
                        <a
                          href={item.paperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="PAPER"
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#ff6b5b] hover:text-[#f4ede0] transition-colors mt-4 font-semibold"
                        >
                          <span>Inspect Conference Paper on Civilica</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
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
