'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedHeaderSection from './AnimatedHeaderSection'
import { Code2, Box, Layers, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const container = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('.js-manifesto-reveal', { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        '.js-manifesto-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power2.out',
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
      id="about"
      ref={container}
      className="relative z-10 py-28 md:py-36 px-6 border-b border-[#f4ede0]/10 bg-gradient-to-b from-[#0c1527] via-[#14213d] to-[#0c1527] overflow-hidden"
    >
      {/* Ambient Palette Atmospheric Gradient Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-[#ff6b5b]/5 blur-[140px]" />
        <div className="absolute -bottom-32 right-1/4 w-[700px] h-[700px] rounded-full bg-[#f4ede0]/[0.03] blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Masked Header */}
        <AnimatedHeaderSection
          title={['Engineering Logic', 'Trustworthy Database']}
          subtitle="Front-end developer. I build interfaces with Next.js, TypeScript and GSAP."
          action={
            <Link
              href="/about"
              data-cursor="TRAJECTORY"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#ff6b5b] hover:text-[#14213d] border border-[#f4ede0]/15 text-xs font-mono uppercase tracking-widest text-[#f4ede0] transition-colors"
            >
              <span>Full Background</span>
              
            </Link>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Live Badges */}
          <div className="lg:col-span-5 js-manifesto-reveal">
            <div className="group relative rounded-3xl overflow-hidden border border-[#f4ede0]/15 bg-[#0f1a30] shadow-2xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/images/Elyas.webp"
                  alt="Elyas Forghani portrait"
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a30] via-[#0f1a30]/30 to-transparent" />
              </div>

              {/* Card Bottom Meta */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <p className="font-syne font-black text-2xl uppercase tracking-tight text-[#f4ede0]">
                    Elyas Forghani
                  </p>
                
                </div>
                <p className="text-sm sm:text-base text-[#c4b7a1] font-sans font-light leading-relaxed mb-5">
                  Handling big Projects is my pleasure. I build for the web the way I was taught to read a process: find the bottleneck, then fix it.
                </p>

                {/* Tech Badges on Profile */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#f4ede0]/10">
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-[#f4ede0]/10 text-xs font-mono text-[#f4ede0]/85 flex items-center gap-1.5 hover:border-[#ff6b5b]/40 transition-colors">
                    <Code2 className="w-3 h-3 text-[#ff6b5b]" aria-hidden="true" /> Next.js 16
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-[#f4ede0]/10 text-xs font-mono text-[#f4ede0]/85 flex items-center gap-1.5 hover:border-[#ff6b5b]/40 transition-colors">
                    <Code2 className="w-3 h-3 text-[#ff6b5b]" aria-hidden="true" /> JavaScript
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-[#f4ede0]/10 text-xs font-mono text-[#f4ede0]/85 flex items-center gap-1.5 hover:border-[#ff6b5b]/40 transition-colors">
                    <Code2 className="w-3 h-3 text-[#ff6b5b]" aria-hidden="true" /> TypeScript
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-[#f4ede0]/10 text-xs font-mono text-[#f4ede0]/85 flex items-center gap-1.5 hover:border-[#ff6b5b]/40 transition-colors">
                    <Zap className="w-3 h-3 text-[#ff6b5b]" aria-hidden="true" /> GSAP
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-[#f4ede0]/10 text-xs font-mono text-[#f4ede0]/85 flex items-center gap-1.5 hover:border-[#ff6b5b]/40 transition-colors">
                    <Box className="w-3 h-3 text-[#ff6b5b]" aria-hidden="true" /> Tailwind CSS
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-[#f4ede0]/10 text-xs font-mono text-[#f4ede0]/85 flex items-center gap-1.5 hover:border-[#ff6b5b]/40 transition-colors">
                    <Layers className="w-3 h-3 text-[#ff6b5b]" aria-hidden="true" /> PostgreSQL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Statement & Engineering Background */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="js-manifesto-reveal">
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-syne leading-[1.05] text-[#f4ede0]">
                Backends that stay solid <br />
                <span className="text-[#ff6b5b]/70 font-normal">Frontends that feel alive.</span>
              </h3>
            </div>

            <div className="js-manifesto-reveal space-y-5 text-[#c4b7a1] text-base md:text-lg leading-relaxed font-light font-sans">
              <p>
                I hold a <strong className="text-[#f4ede0] font-medium">B.Sc. in Chemical Engineering</strong> — my codes have chemistry and love.
              </p>
              <p>
                Most of my work is front-end: <strong className="text-[#f4ede0] font-medium">Next.js, JavaScript and TypeScript</strong> for structure, <strong className="text-[#f4ede0] font-medium">Tailwind CSS</strong> for styling, and <strong className="text-[#f4ede0] font-medium">Three.js and GSAP</strong> when a page needs to move. I care about the things users actually feel — load time, scroll smoothness, and whether an interaction answers instantly.
              </p>
              <p>
                Before web development, I spent a year running control-room displays, watching real systems misbehave in real time. It taught me to respect error states and slow data — the parts of an app you only notice when they go wrong.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="js-manifesto-reveal grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[#f4ede0]/10">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-[#f4ede0]/10 min-w-0 flex flex-col justify-between">
                <span className="block text-xl sm:text-2xl md:text-3xl font-black font-syne text-[#ff6b5b]">
                  35
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#c4b7a1] block break-words mt-1">
                  Public Repos
                </span>
              </div>
              
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-[#f4ede0]/10 min-w-0 flex flex-col justify-between">
                <span className="block text-xl sm:text-2xl md:text-3xl font-black font-syne text-[#ff6b5b]">
                  B.Sc.
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#c4b7a1] block break-words mt-1">
                  Chem. Eng
                </span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-[#f4ede0]/10 min-w-0 flex flex-col justify-between">
                <span className="block text-xl sm:text-2xl md:text-3xl font-black font-syne text-[#f4ede0]">
                  LIVE
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#c4b7a1] block break-words mt-1 leading-tight">
                  Client Store
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
