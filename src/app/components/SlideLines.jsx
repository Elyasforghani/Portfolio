'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight, ArrowRight, Terminal, Compass, Layers } from 'lucide-react'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const RIBBON_LINES = [
  { text: 'ALGORITHMIC EQUILIBRIUM', dir: -1, font: 'syne' },
  { text: 'crafted in perpetual motion', dir: 1, font: 'subtitle' },
  { text: 'RESILIENT BACKENDS &bull; SPATIAL FRONTENDS', dir: -1, font: 'syne' },
]

export default function SlideLines() {
  const container = useRef(null)

  useGSAP(
    () => {
      gsap.utils.toArray('.js-ribbon-line').forEach((line) => {
        const dir = Number(line.dataset.dir)
        gsap.fromTo(
          line,
          { xPercent: dir * 18 },
          {
            xPercent: dir * -14,
            ease: 'none',
            scrollTrigger: {
              trigger: container.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      })

      // Reveal hero elements
      gsap.from('.js-hero-fade', {
        opacity: 0,
        y: 40,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.2,
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className="relative min-h-screen pt-36 pb-20 md:pt-44 md:pb-28 bg-[#060709] text-neutral-100 flex flex-col justify-between overflow-hidden border-b border-white/10"
    >
      {/* Nesil Noble Style Architectural Corner Reticles */}
      <div className="absolute top-8 left-8 text-neutral-600 font-mono text-[10px] select-none pointer-events-none hidden md:block uppercase tracking-widest">
        + [ 35.6895&deg; N &bull; 51.2415&deg; E ]
      </div>
      <div className="absolute top-8 right-8 text-neutral-600 font-mono text-[10px] select-none pointer-events-none hidden md:block uppercase tracking-widest">
        [ SYSTEM VELOCITY // 60FPS ] +
      </div>

      {/* Main Hero Stage */}
      <div className="max-w-7xl mx-auto px-6 w-full my-auto z-10">
        <div className="max-w-4xl">
          {/* Top category pill */}
          <div className="js-hero-fade inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.25em] text-slate-300 mb-8 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Spatial Full-Stack &bull; Creative Developer</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="js-hero-fade font-syne font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-[0.95] mb-6 max-w-full break-words">
            Architecting <br />
            <span className="text-neutral-500 font-normal">Resilient Systems</span>
            <span className="block font-serif italic lowercase text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-slate-200 my-2 leading-tight break-words max-w-full">
              in perpetual motion
            </span>
          </h1>

          {/* Editorial Philosophy Statement */}
          <p className="js-hero-fade text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl font-sans mb-10 break-words">
            B.Sc. Chemical Engineering from the University of Kurdistan. Engineering high-throughput backends with <strong className="text-white font-medium">Docker, Redis, PostgreSQL &amp; Prisma ORM</strong>, paired with high-touch 3D WebGL spatial frontends.
          </p>

          {/* Action CTAs */}
          <div className="js-hero-fade flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <MagneticButton strength={0.35}>
              <Link
                href="/works"
                data-cursor="WORKS"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-syne font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all duration-300 shadow-xl"
              >
                <span>Explore Works &amp; Index</span>
                <ArrowDownRight className="w-4 h-4" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <Link
                href="/about"
                data-cursor="ABOUT"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 border border-white/20 text-neutral-200 hover:text-white hover:bg-white/10 hover:border-white/40 font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
              >
                <span>Read Trajectory</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Kinetic Scrubbed Typography Ribbons */}
      <div className="relative py-8 my-auto overflow-hidden border-t border-white/10 select-none">
        <div className="flex flex-col gap-2">
          {RIBBON_LINES.map((r, i) => (
            <div
              key={i}
              data-dir={r.dir}
              className={`js-ribbon-line whitespace-nowrap will-change-transform ${
                r.font === 'subtitle'
                  ? 'font-serif italic text-3xl sm:text-5xl md:text-6xl text-slate-200 pl-12'
                  : 'font-syne font-black uppercase text-3xl sm:text-5xl md:text-6xl text-white/40 tracking-tighter'
              }`}
            >
              {r.text} &bull; {r.text} &bull; {r.text}
            </div>
          ))}
        </div>
      </div>

      {/* Hero Bottom Telemetry */}
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 pt-6">
        <span className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next.js 16 &bull; Three.js &bull; Redis Cache</span>
        </span>
        <span className="text-slate-300 font-bold hidden sm:inline">
          Scroll down to plunge into depth ↓
        </span>
      </div>
    </section>
  )
}
