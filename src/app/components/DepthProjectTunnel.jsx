'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ExternalLink, Layers, Box, Database, Zap, Cpu } from 'lucide-react'
import { GithubIcon } from './Icons'
import { PROJECTS } from '../../data/projects'
import { sound } from '../../utils/audio'

gsap.registerPlugin(ScrollTrigger)

export default function DepthProjectTunnel() {
  const containerRef = useRef(null)
  const tunnelStageRef = useRef(null)

  // Top 4 flagship projects for the vertical in-depth 3D spatial tunnel
  const tunnelProjects = PROJECTS.slice(0, 4)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.js-depth-card')
      const totalCards = cards.length

      // Scrub timeline tied to the container scroll without GSAP pin conflict (using native sticky viewport)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      cards.forEach((card, i) => {
        const step = 1 / totalCards
        const enterStart = i * step
        const peakStart = enterStart + step * 0.25
        const peakEnd = enterStart + step * 0.7
        const exitEnd = (i + 1) * step

        // Initial setup for cards after the first one
        if (i > 0) {
          gsap.set(card, {
            transform: 'translate3d(0, 0, -1000px) scale(0.65) rotateX(10deg)',
            opacity: 0,
            filter: 'blur(10px)',
            pointerEvents: 'none',
          })
        }

        // Animate entering to center stage
        tl.fromTo(
          card,
          {
            transform: 'translate3d(0, 0, -1000px) scale(0.65) rotateX(10deg)',
            opacity: 0,
            filter: 'blur(10px)',
            pointerEvents: 'none',
          },
          {
            transform: 'translate3d(0, 0, 0px) scale(1) rotateX(0deg)',
            opacity: 1,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            ease: 'power2.out',
            duration: 0.35,
          },
          enterStart
        )

        // Hold at peak focus then exit forward past camera (for all except the last card)
        if (i < totalCards - 1) {
          tl.to(
            card,
            {
              transform: 'translate3d(0, 0, 500px) scale(1.3) rotateX(-12deg)',
              opacity: 0,
              filter: 'blur(14px)',
              pointerEvents: 'none',
              ease: 'power2.in',
              duration: 0.35,
            },
            peakEnd
          )
        }
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#060709] border-b border-white/10">
      {/* Native Sticky 3D Depth Viewport Stage */}
      <div
        ref={tunnelStageRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 sm:p-12 overflow-hidden perspective-depth z-10"
      >
        {/* Top HUD Telemetry */}
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 z-30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>[ 04 / 3D SPATIAL DEPTH TUNNEL ]</span>
          </div>
          <span className="hidden sm:inline text-slate-300">
            VERTICAL SCROLL DRIVES Z-AXIS DEPTH ↓
          </span>
        </div>

        {/* 3D Depth Cards Staging Container */}
        <div className="relative w-full max-w-5xl mx-auto h-[80vh] sm:h-[75vh] md:h-[70vh] min-h-[480px] max-h-[720px] flex items-center justify-center preserve-3d my-auto">
          {tunnelProjects.map((proj, idx) => (
            <div
              key={proj.slug}
              className="js-depth-card absolute inset-0 rounded-3xl glass-panel-glow p-5 sm:p-8 md:p-10 flex flex-col justify-between preserve-3d will-change-transform shadow-[0_25px_90px_rgba(0,0,0,0.95)] overflow-hidden"
              style={{
                transform: idx === 0 ? 'translate3d(0, 0, 0px) scale(1)' : 'translate3d(0, 0, -1000px) scale(0.65)',
                opacity: idx === 0 ? 1 : 0,
              }}
            >
              {/* Card Top Telemetry */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 sm:pb-4 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-slate-200 font-bold shrink-0">
                    [ 0{idx + 1} / 0{tunnelProjects.length} ]
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 truncate">
                    {proj.tag}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                    {proj.category}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/10 text-slate-200 border border-white/20 font-bold">
                    {proj.year}
                  </span>
                </div>
              </div>

              {/* Main Card Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center my-auto overflow-y-auto no-scrollbar py-2">
                {/* Visual Thumbnail */}
                <div className="md:col-span-5 relative aspect-16/9 sm:aspect-16/10 rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 group shadow-lg shrink-0 max-h-[160px] sm:max-h-none">
                  <Image
                    src={proj.imageSrc}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-200 bg-black/70 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-xs">
                      {proj.highlight}
                    </span>
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="md:col-span-7 flex flex-col justify-center min-w-0">
                  <Link href={`/works/${proj.slug}`} data-cursor="EXPLORE">
                    <h3 className="font-syne font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-white hover:text-slate-200 transition-colors mb-2 break-words">
                      {proj.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-3 sm:mb-4 font-sans line-clamp-2 sm:line-clamp-3 break-words">
                    {proj.shortDesc}
                  </p>

                  {/* Architecture Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Direct Action Links */}
                  <div className="flex items-center gap-3 pt-1 sm:pt-2 flex-wrap">
                    <Link
                      href={`/works/${proj.slug}`}
                      data-cursor="CASE STUDY"
                      className="px-5 py-2.5 rounded-full bg-white text-black font-syne font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors shadow-md inline-flex items-center gap-2 shrink-0"
                    >
                      <span>Full Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="GITHUB"
                      className="p-2.5 rounded-full bg-white/5 border border-white/15 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                      title="Inspect GitHub Source"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="LIVE"
                        className="p-2.5 rounded-full bg-white/5 border border-white/15 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                        title="Live Production Build"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer HUD */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/10 pt-3 shrink-0">
                <span className="flex items-center gap-1.5 truncate">
                  <Database className="w-3 h-3 text-emerald-400 shrink-0" /> Relational Architecture &amp; Caching
                </span>
                <span className="text-slate-300 font-bold shrink-0">Scroll deeper to advance →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stage Footer */}
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-500 z-30">
          <span>Continuous Z-Axis Translation Matrix</span>
          <Link
            href="/works"
            data-cursor="ALL WORKS"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Browse All 8 Works in Archive →
          </Link>
        </div>
      </div>
    </section>
  )
}
