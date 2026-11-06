'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedHeaderSection from './AnimatedHeaderSection'
import {
  ShoppingBag,
  Server,
  Zap,
  GraduationCap,
  Radio,
  ArrowUpRight,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  Box,
} from 'lucide-react'
import { GithubIcon } from './Icons'
import { sound } from '../../utils/audio'

gsap.registerPlugin(ScrollTrigger)

const GITHUB_REPOS = [
  {
    name: 'NextJs-Usermanagement',
    desc: 'User management dashboard with live search, validated forms and a Three.js starfield.',
    tech: 'Next.js • React Hook Form • MockAPI',
    url: 'https://github.com/Elyasforghani/NextJs-Usermanagement',
  },
  {
    name: 'Parallax-Portfolio',
    desc: 'This site — Three.js particles, GSAP scroll choreography, Lenis and ambient audio.',
    tech: 'Next.js • Three.js • GSAP',
    url: 'https://github.com/Elyasforghani/Parallax-Portfolio',
  },
  {
    name: 'password-strength-check',
    desc: 'Password strength meter driven by regex rules with live visual feedback.',
    tech: 'JavaScript • RegEx',
    url: 'https://github.com/Elyasforghani/password-strength-check',
  },
  {
    name: 'Weather',
    desc: 'Live weather forecasts with city search and dynamic condition cards.',
    tech: 'JavaScript • Weather API',
    url: 'https://github.com/Elyasforghani/Weather',
  },
  {
    name: 'hotelabbasi-tailwindproject',
    desc: 'Showcase site for Isfahan’s historic Abbasi Hotel, with interactive sliders.',
    tech: 'Tailwind CSS • Swiper.js',
    url: 'https://github.com/Elyasforghani/hotelabbasi-tailwindproject',
  },
  {
    name: 'dice-game',
    desc: 'Two-player dice game with turn-based scoring, built in vanilla JavaScript.',
    tech: 'JavaScript • DOM',
    url: 'https://github.com/Elyasforghani/dice-game',
  },
]

export default function EngineeringBento() {
  const container = useRef(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.js-bento-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    },
    { scope: container }
  )

  return (
    <section
      id="bento"
      ref={container}
      className="relative z-10 py-28 md:py-36 px-6 border-b border-[#f4ede0]/10 bg-[#14213d]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Masked Typography */}
        <AnimatedHeaderSection
          eyebrow="04 / Background &amp; Stack"
          title={['The Work', '& The Story Behind It']}
          subtitle="Client production, open-source repos, a chemical engineering degree and a control-room year in between — the short version of how I got here."
          action={
            <a
              href="https://github.com/Elyasforghani"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GITHUB"
              onMouseEnter={() => sound.playHoverTick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-all duration-300"
            >
              <GithubIcon className="w-4 h-4 text-slate-300" />
              <span>@Elyasforghani</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          }
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Card 1: GPM Studio Flagship (7 Cols) */}
          <div className="js-bento-card lg:col-span-7 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-slate-300/40 transition-all duration-500 shadow-2xl">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-slate-400/20 transition-all duration-700" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-white/10 border border-white/20 text-slate-200">
                    <ShoppingBag className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
                    Client Production
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono text-emerald-400 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE STORE
                </div>
              </div>

              <h3 className="font-syne font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-3">
                GPM Studio — Gaming Art &amp; Collectibles
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base font-light font-sans leading-relaxed mb-6">
                I designed and built the online store for GPM Studio, a Persian shop for collectible trading cards and gaming posters — product gallery, collection pages and a cart/checkout flow, fully RTL with the Vazirmatn typeface.
              </p>

              {/* Showcase preview image */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black">
                <Image
                  src="/images/projects/gpm-studio/gpm-main.webp"
                  alt="GPM Studio E-Commerce Preview"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    Next.js • Persian RTL • Cart &amp; Checkout
                  </span>
                  <span className="text-slate-200 font-bold hidden sm:inline">gpm-studio.com</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-neutral-400">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300">
                  Next.js 16
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300">
                  React 19
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300">
                  TypeScript
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300">
                  Core Web Vitals
                </span>
              </div>
              <a
                href="https://gpm-studio.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="VISIT"
                onMouseEnter={() => sound.playHoverTick()}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-200 hover:text-white transition-colors"
              >
                <span>Launch Store</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: This Site Under The Hood (5 Cols) */}
          <div className="js-bento-card lg:col-span-5 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-red-400/40 transition-all duration-500 shadow-2xl">
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-red-500/20 transition-all duration-700" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <Server className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-red-400">
                    Under The Hood
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-[10px] font-mono text-red-300">
                  Zero UI Kits
                </span>
              </div>

              <h3 className="font-syne font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-3">
                How This Site Is Built
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base font-light font-sans leading-relaxed mb-6">
                Every pixel here is hand-rolled: a Three.js particle field reacts to your cursor, GSAP drives the pinned sections, Lenis smooths the scroll, and a Web Audio loop hums underneath until you mute it.
              </p>

              {/* Honest Spec Box */}
              <div className="rounded-2xl bg-black/60 border border-white/10 p-4 font-mono text-xs space-y-3 mb-6">
                <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-white/10">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Activity className="w-3.5 h-3.5 text-red-400" />
                    <span>Running right now</span>
                  </span>
                  <span className="text-emerald-400 text-[10px]">VIEW SOURCE ↓</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="min-w-0">
                    <span className="text-neutral-500 block text-[9px] uppercase truncate">Framework</span>
                    <span className="text-slate-100 font-bold text-sm block">Next.js 16</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-neutral-500 block text-[9px] uppercase truncate">3D Field</span>
                    <span className="text-white font-bold text-sm block">Three.js</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-neutral-500 block text-[9px] uppercase truncate">Motion &amp; Scroll</span>
                    <span className="text-neutral-200 font-bold text-sm block">GSAP + Lenis</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-neutral-500 block text-[9px] uppercase truncate">Ambient Sound</span>
                    <span className="text-emerald-400 font-bold text-sm block">Web Audio API</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                Creative Development
              </span>
              <a
                href="https://github.com/Elyasforghani/Parallax-Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="INSPECT"
                onMouseEnter={() => sound.playHoverTick()}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-200 hover:text-white transition-colors"
              >
                <span>Inspect Repo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Academic Chemical Engineering Foundations (4 Cols) */}
          <div className="js-bento-card lg:col-span-4 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-cyan-400/40 transition-all duration-500 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-300">
                  Academic Rigor
                </span>
              </div>

              <h4 className="font-syne font-black text-xl text-white uppercase tracking-tight mb-2">
                B.Sc. Chemical Engineering
              </h4>
              <span className="text-xs font-mono text-neutral-400 block mb-4">
                University of Kurdistan &bull; 2018–2023
              </span>
              <p className="text-neutral-400 text-sm font-light font-sans leading-relaxed mb-4">
                Published research in the <strong className="text-neutral-200">9th International Conference on Chemical Engineering</strong>. Modeling mass and energy transport taught me to break a big system into balances and bottlenecks — a habit I never dropped when the systems became software.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-300">
              <span>Conference Paper</span>
              <span className="text-neutral-400">Thermodynamics</span>
            </div>
          </div>

          {/* Card 4: Ava Nama Noor Mission-Critical Telemetry (4 Cols) */}
          <div className="js-bento-card lg:col-span-4 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-emerald-400/40 transition-all duration-500 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <Radio className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300">
                  Operations &bull; 2023–2024
                </span>
              </div>

              <h4 className="font-syne font-black text-xl text-white uppercase tracking-tight mb-2">
                Control Room Operator
              </h4>
              <span className="text-xs font-mono text-neutral-400 block mb-4">
                Ava Nama Noor Company
              </span>
              <p className="text-neutral-400 text-sm font-light font-sans leading-relaxed mb-4">
                Ran multi-stream video and sensor display walls where a blank screen meant an incident. Chasing hardware and network failures in real time is where I learned to never trust a system that looks fine.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-300">
              <span>Calm Under Pressure</span>
              <span className="text-neutral-400">Live Telemetry</span>
            </div>
          </div>

          {/* Card 5: Real GitHub Repositories Index (4 Cols) */}
          <div className="js-bento-card lg:col-span-4 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-slate-300/40 transition-all duration-500 shadow-2xl">
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-white/5 border border-white/15 text-white">
                    <GithubIcon className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300">
                    Open-Source Hub
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-200 bg-white/10 px-2 py-0.5 rounded border border-white/20">
                  6 Repositories
                </span>
              </div>

              <h4 className="font-syne font-black text-xl text-white uppercase tracking-tight mb-4">
                GitHub Artifacts
              </h4>

              <div className="space-y-3">
                {GITHUB_REPOS.slice(0, 4).map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="CODE"
                    onMouseEnter={() => sound.playHoverTick()}
                    className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group/repo"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-white group-hover/repo:text-slate-200 truncate">
                        {repo.name}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover/repo:text-slate-200 shrink-0" />
                    </div>
                    <span className="block text-[10px] font-mono text-neutral-400 truncate mt-1">
                      {repo.tech}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href="https://github.com/Elyasforghani?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="REPOS"
                onMouseEnter={() => sound.playHoverTick()}
                className="inline-flex items-center justify-between w-full text-xs font-mono uppercase tracking-wider text-slate-200 hover:text-white transition-colors"
              >
                <span>View All Repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
