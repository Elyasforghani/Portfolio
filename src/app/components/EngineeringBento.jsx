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
          subtitle="wanna see more just check the github"
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
          <div className="js-bento-card lg:col-span-7 rounded-3xl border border-[#f4ede0]/10 bg-[#0f1a30]/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-[#ff6b5b]/40 transition-all duration-500 shadow-2xl">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#ff6b5b]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff6b5b]/20 transition-all duration-700" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-white/10 border border-[#f4ede0]/20 text-[#f4ede0]">
                    <ShoppingBag className="w-4 h-4 text-[#ff6b5b]" />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#c4b7a1]">
                    Client Production
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff6b5b]/10 border border-[#ff6b5b]/25 text-[10px] font-mono text-[#ff6b5b] tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b5b] animate-pulse" />
                  LIVE STORE
                </div>
              </div>

              <h3 className="font-syne font-black text-2xl sm:text-3xl text-[#f4ede0] uppercase tracking-tight mb-3">
                GPM Studio — Gaming Art &amp; Collectibles
              </h3>
              <p className="text-[#c4b7a1] text-sm sm:text-base font-light font-sans leading-relaxed mb-6">
                I designed and built the online store for GPM Studio, a Persian shop for collectible trading cards and gaming posters — product gallery, collection pages and a cart/checkout flow, fully RTL with the Vazirmatn typeface.
              </p>

              {/* Showcase preview image */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#f4ede0]/10 mb-6 bg-[#0c1527]">
                <Image
                  src="/images/projects/gpm-studio/gpm-main.webp"
                  alt="GPM Studio E-Commerce Preview"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1527]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#f4ede0]">
                  <span className="bg-[#0c1527]/75 backdrop-blur-md px-3 py-1 rounded-full border border-[#f4ede0]/15">
                    Next.js • Persian RTL • Cart &amp; Checkout
                  </span>
                  <span className="text-[#f4ede0] font-bold hidden sm:inline">gpm-studio.com</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#f4ede0]/10 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-[#c4b7a1]">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-[#f4ede0]/10 text-[#f4ede0]/80">
                  Next.js 16
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-[#f4ede0]/10 text-[#f4ede0]/80">
                  React 19
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-[#f4ede0]/10 text-[#f4ede0]/80">
                  JavaScript
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-[#f4ede0]/10 text-[#f4ede0]/80">
                  Core Web Vitals
                </span>
              </div>
              <a
                href="https://gpm-studio.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="VISIT"
                onMouseEnter={() => sound.playHoverTick()}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#ff6b5b] hover:text-[#f4ede0] transition-colors font-semibold"
              >
                <span>Store</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: This Site Under The Hood (5 Cols) */}
          <div className="js-bento-card lg:col-span-5 rounded-3xl border border-[#f4ede0]/10 bg-[#0f1a30]/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-[#ff6b5b]/40 transition-all duration-500 shadow-2xl">
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#ff6b5b]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff6b5b]/20 transition-all duration-700" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-[#ff6b5b]/10 border border-[#ff6b5b]/20 text-[#ff6b5b]">
                    <Server className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff6b5b]">
                    Under The Hood
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#ff6b5b]/10 border border-[#ff6b5b]/25 text-[10px] font-mono text-[#ff6b5b]">
                  Zero UI Kits
                </span>
              </div>

              <h3 className="font-syne font-black text-2xl sm:text-3xl text-[#f4ede0] uppercase tracking-tight mb-3">
                How This Site Is Built
              </h3>
              <p className="text-[#c4b7a1] text-sm sm:text-base font-light font-sans leading-relaxed mb-6">
                Every pixel here is hand-rolled: a Three.js particle field reacts to your cursor, GSAP drives the pinned sections, Lenis smooths the scroll, and a Web Audio loop hums underneath until you mute it.
              </p>

              {/* Honest Spec Box */}
              <div className="rounded-2xl bg-[#0c1527]/80 border border-[#f4ede0]/10 p-4 font-mono text-xs space-y-3 mb-6">
                <div className="flex items-center justify-between text-[#c4b7a1] pb-2 border-b border-[#f4ede0]/10">
                  <span className="flex items-center gap-1.5 text-[#f4ede0]">
                    <Activity className="w-3.5 h-3.5 text-[#ff6b5b]" />
                    <span>Running right now</span>
                  </span>
                  <span className="text-[#ff6b5b] text-[10px]">VIEW SOURCE ↓</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="min-w-0">
                    <span className="text-[#c4b7a1]/70 block text-[9px] uppercase truncate">Framework</span>
                    <span className="text-[#f4ede0] font-bold text-sm block">Next.js 16</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#c4b7a1]/70 block text-[9px] uppercase truncate">3D Field</span>
                    <span className="text-[#f4ede0] font-bold text-sm block">Three.js</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#c4b7a1]/70 block text-[9px] uppercase truncate">Motion &amp; Scroll</span>
                    <span className="text-[#f4ede0] font-bold text-sm block">GSAP + Lenis</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#c4b7a1]/70 block text-[9px] uppercase truncate">Ambient Sound</span>
                    <span className="text-[#ff6b5b] font-bold text-sm block">Web Audio API</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#f4ede0]/10 flex items-center justify-between gap-4">
              <span className="text-[10px] font-mono text-[#c4b7a1] uppercase tracking-wider">
                Creative Development
              </span>
              <a
                href="https://github.com/Elyasforghani/Parallax-Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="INSPECT"
                onMouseEnter={() => sound.playHoverTick()}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#f4ede0] hover:text-[#ff6b5b] transition-colors"
              >
                <span>Inspect Repo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Academic Chemical Engineering Foundations (4 Cols) */}
          <div className="js-bento-card lg:col-span-4 rounded-3xl border border-[#f4ede0]/10 bg-[#0f1a30]/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-[#ff6b5b]/40 transition-all duration-500 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 rounded-xl bg-[#ff6b5b]/10 border border-[#ff6b5b]/20 text-[#ff6b5b]">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff6b5b]">
                  Academic Research
                </span>
              </div>

              <h4 className="font-syne font-black text-xl text-[#f4ede0] uppercase tracking-tight mb-2">
                B.Sc. Chemical Engineering
              </h4>
              <span className="text-xs font-mono text-[#c4b7a1] block mb-4">
                University of Kurdistan &bull; 2018–2023
              </span>
              <p className="text-[#c4b7a1] text-sm font-light font-sans leading-relaxed mb-4">
                Published research on <strong className="text-[#f4ede0]">Photocatalytic Degradation of Tetracycline Using ZnO Nanoparticles in a Y-Zeolite Matrix</strong> (9th International Conference on Chemical Engineering). Modeling mass transfer and heterogeneous supports taught me how structure prevents bottlenecks.
              </p>
            </div>

            <div className="pt-4 border-t border-[#f4ede0]/10 flex items-center justify-between text-xs font-mono">
              <a
                href="https://civilica.com/doc/1949705/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="PAPER"
                onMouseEnter={() => sound.playHoverTick()}
                className="inline-flex items-center gap-1.5 text-[#ff6b5b] hover:text-[#f4ede0] transition-colors uppercase tracking-wider font-semibold"
              >
                <span>Read Research (Civilica)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[#c4b7a1]/70">OGPCONF09_037</span>
            </div>
          </div>

          {/* Card 4: Ava Company Operations (4 Cols) */}
          <div className="js-bento-card lg:col-span-4 rounded-3xl border border-[#f4ede0]/10 bg-[#0f1a30]/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-[#ff6b5b]/40 transition-all duration-500 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 rounded-xl bg-white/5 border border-[#f4ede0]/15 text-[#f4ede0]">
                  <Radio className="w-4 h-4 text-[#ff6b5b]" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#f4ede0]">
                  Operations &bull; 2023–2024
                </span>
              </div>

              <h4 className="font-syne font-black text-xl text-[#f4ede0] uppercase tracking-tight mb-2">
                Control Room Operator
              </h4>
              <span className="text-xs font-mono text-[#c4b7a1] block mb-4">
                Ava Company
              </span>
              <p className="text-[#c4b7a1] text-sm font-light font-sans leading-relaxed mb-4">
                Ran multi-stream video and sensor display walls where a blank screen meant an incident. Chasing hardware and network failures in real time is where I learned to never trust a system that looks fine.
              </p>
            </div>

            <div className="pt-4 border-t border-[#f4ede0]/10 flex items-center justify-between text-xs font-mono text-[#ff6b5b]">
              <span>Calm Under Pressure</span>
              <span className="text-[#c4b7a1]">Real-Time Monitoring</span>
            </div>
          </div>

          {/* Card 5: Real GitHub Repositories Index (4 Cols) */}
          <div className="js-bento-card lg:col-span-4 rounded-3xl border border-[#f4ede0]/10 bg-[#0f1a30]/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-[#ff6b5b]/40 transition-all duration-500 shadow-2xl">
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-white/5 border border-[#f4ede0]/15 text-[#f4ede0]">
                    <GithubIcon className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#c4b7a1]">
                    Open-Source Hub
                  </span>
                </div>
              </div>

              <h4 className="font-syne font-black text-xl text-[#f4ede0] uppercase tracking-tight mb-4">
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
                    className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-[#f4ede0]/10 hover:border-[#ff6b5b]/40 transition-colors group/repo"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#f4ede0] group-hover/repo:text-[#ff6b5b] truncate">
                        {repo.name}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-[#c4b7a1] group-hover/repo:text-[#ff6b5b] shrink-0" />
                    </div>
                    <span className="block text-[10px] font-mono text-[#c4b7a1] truncate mt-1">
                      {repo.tech}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#f4ede0]/10">
              <a
                href="https://github.com/Elyasforghani?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="REPOS"
                onMouseEnter={() => sound.playHoverTick()}
                className="inline-flex items-center justify-between w-full text-xs font-mono uppercase tracking-wider text-[#f4ede0] hover:text-[#ff6b5b] transition-colors"
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
