'use client'

import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedHeaderSection from './AnimatedHeaderSection'
import { sound } from '../../utils/audio'
import {
  Flame,
  Gauge,
  RotateCw,
  Compass,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const MAXIMS = [
  {
    id: '01',
    category: 'SUPPORT MATRIX & MODULARITY',
    icon: Flame,
    color: 'from-[#ff6b5b]/15 to-[#0c1527]/20',
    borderColor: 'group-hover:border-[#ff6b5b]/40',
    accentText: 'text-[#ff6b5b]',
    thermoLaw: 'Heterogeneous Photocatalysis (ZnO / Y-Zeolite Matrix)',
    title: 'Structure Prevents Agglomeration — In Catalysts and in Code',
    quote:
      'In my published study (Civilica #1949705, OGPCONF09_037), supporting 40 wt.% ZnO nanoparticles on a Y-Zeolite framework prevented particle clumping, maximized active surface area under UV light, and achieved 71% tetracycline degradation.',
    resolution:
      'Unstructured code clumps together the exact same way unsupported nanoparticles do. Treating Next.js components, JavaScript/TypeScript modules, and PostgreSQL tables as a structured support matrix keeps every piece small, reactive, and easy to maintain.',
    formula: 'ZnO / Zeolite-Y (71% Removal) ⟹ Decoupled Modular Architecture',
    paperUrl: 'https://civilica.com/doc/1949705/',
  },
  {
    id: '02',
    category: 'KINETICS & BOTTLENECK ANALYSIS',
    icon: Gauge,
    color: 'from-[#f4ede0]/10 to-[#0c1527]/20',
    borderColor: 'group-hover:border-[#ff6b5b]/40',
    accentText: 'text-[#ff6b5b]',
    thermoLaw: 'Chemical Reaction Kinetics (Rate-Determining Step)',
    title: 'The System Only Moves as Fast as Its Slowest Mechanism',
    quote:
      'A reaction’s throughput is never decided by its fastest intermediate; it is governed solely by the rate-limiting bottleneck. Accelerating anything else yields zero net gain.',
    resolution:
      'I profile before I optimize. A smooth GSAP animation means nothing if the REST API fetch or database query is the slow step — so I find the real bottleneck first, and only then decide what deserves the effort.',
    formula: 'r_net = min(k₁, k₂, …, kₙ) ⟹ Find the Slow Step First',
  },
  {
    id: '03',
    category: 'EQUILIBRIUM & BACKPRESSURE',
    icon: RotateCw,
    color: 'from-[#ff6b5b]/15 to-[#0c1527]/20',
    borderColor: 'group-hover:border-[#ff6b5b]/40',
    accentText: 'text-[#ff6b5b]',
    thermoLaw: "Le Chatelier's Principle of Dynamic Equilibrium",
    title: 'Systems Under Stress Must Counteract Perturbations',
    quote:
      'When an equilibrium system is subjected to sudden changes in temperature, pressure, or concentration, it shifts dynamically to mitigate the applied disturbance.',
    resolution:
      'A year running control-room displays at Ava Company taught me what real-time volatility looks like. I design for the bad day: loading states that hold the layout, error states that recover cleanly, and UI that never leaves the user stranded.',
    formula: 'Q < K_eq ⟹ Design for the Bad Day',
  },
  {
    id: '04',
    category: 'TRANSPORT PHENOMENA & MOTION',
    icon: Compass,
    color: 'from-[#f4ede0]/10 to-[#0c1527]/20',
    borderColor: 'group-hover:border-[#ff6b5b]/40',
    accentText: 'text-[#ff6b5b]',
    thermoLaw: 'Boundary Layer Theory & Momentum Transport',
    title: 'Friction at the Boundary Dictates Momentum Transfer',
    quote:
      'The boundary layer governs the transfer of mass, momentum, and heat between distinct phases. Small perturbations at the boundary ripple through the entire bulk phase.',
    resolution:
      'The screen is the boundary layer between a person and their intent. I tune GSAP timelines, Lenis scroll inertia, and responsive feedback so moving through a page feels fluid instead of flat.',
    formula: 'τ = μ (du/dy) ⟹ Motion That Serves Content',
  },
]

export default function EngineeringPhilosophy() {
  const container = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const current = MAXIMS[activeIndex]

  const handleSelect = (idx) => {
    if (idx === activeIndex) return
    sound.playClick()
    sound.playPentatonicNote(idx)
    setActiveIndex(idx)
  }

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + MAXIMS.length) % MAXIMS.length
    handleSelect(nextIdx)
  }

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % MAXIMS.length
    handleSelect(nextIdx)
  }

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('.js-maxim-card', { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        '.js-maxim-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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

  const CurrentIcon = current.icon

  return (
    <section
      id="philosophy"
      ref={container}
      className="relative z-10 py-28 md:py-36 px-6 border-b border-[#f4ede0]/10 bg-[#14213d]"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedHeaderSection
          
          title={['What Chemical Engineering', 'Taught Me About Code']}
          subtitle="Four ideas from thermodynamics and transport phenomena that survive the translation into front-end work — no lab required."
        />

        {/* Interactive Quote Showcase */}
        <div className="js-maxim-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Tab Selectors & Navigation (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c4b7a1] block mb-2">
                Pick a principle:
              </span>
              {MAXIMS.map((item, idx) => {
                const ItemIcon = item.icon
                const isActive = activeIndex === idx
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleSelect(idx)}
                    onMouseEnter={() => sound.playHoverTick()}
                    data-cursor="SELECT"
                    className={`w-full p-4 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-[#0f1a30] border-[#ff6b5b] shadow-xl'
                        : 'bg-[#0f1a30]/60 border-[#f4ede0]/10 hover:bg-[#0f1a30] hover:border-[#f4ede0]/25'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span
                        className={`p-2 rounded-xl text-xs font-mono font-bold shrink-0 ${
                          isActive
                            ? 'bg-[#ff6b5b] text-[#14213d] shadow-[0_0_15px_rgba(255,107,91,0.3)]'
                            : 'bg-white/5 text-[#c4b7a1]'
                        }`}
                      >
                        {item.id}
                      </span>
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <span className={`block text-xs font-mono tracking-wider uppercase truncate ${isActive ? 'text-[#ff6b5b] font-bold' : 'text-[#f4ede0]'}`}>
                          {item.category}
                        </span>
                        <span className="block text-[11px] text-[#c4b7a1]/70 font-sans truncate">
                          {item.thermoLaw}
                        </span>
                      </div>
                    </div>
                    <ItemIcon
                      aria-hidden="true"
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#ff6b5b]' : 'text-[#c4b7a1]/50'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            {/* Prev/Next Keyboard Nav Controls */}
            <div className="pt-4 border-t border-[#f4ede0]/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#c4b7a1]">
                Principle {activeIndex + 1} of {MAXIMS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  data-cursor="PREV"
                  aria-label="Previous Principle"
                  className="p-2.5 rounded-full bg-[#0f1a30] hover:bg-[#ff6b5b] hover:text-[#14213d] border border-[#f4ede0]/15 text-[#f4ede0] transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  data-cursor="NEXT"
                  aria-label="Next Principle"
                  className="p-2.5 rounded-full bg-[#0f1a30] hover:bg-[#ff6b5b] hover:text-[#14213d] border border-[#f4ede0]/15 text-[#f4ede0] transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Active Principle Detail Display (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-[#f4ede0]/15 bg-[#0f1a30]/90 backdrop-blur-xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            {/* Ambient Background Glow */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-gradient-to-br ${current.color} opacity-40 pointer-events-none transition-all duration-700`}
            />

            <div>
              {/* Category & Law Header */}
              <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="p-2.5 rounded-2xl bg-[#14213d] border border-[#f4ede0]/15">
                    <CurrentIcon className="w-5 h-5 text-[#ff6b5b]" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c4b7a1] block">
                      The Law
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#f4ede0]">
                      {current.thermoLaw}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#14213d] border border-[#f4ede0]/15 text-[10px] font-mono uppercase tracking-wider text-[#ff6b5b]">
                  {current.category}
                </span>
              </div>

              {/* Main Headline */}
              <h3 className="font-syne font-black text-2xl sm:text-4xl text-[#f4ede0] uppercase tracking-tight leading-tight mb-6">
                {current.title}
              </h3>

              {/* Quote Block */}
              <div className="relative pl-6 border-l-2 border-[#ff6b5b]/50 my-6">
                <Quote className="w-8 h-8 text-[#ff6b5b]/10 absolute -top-4 -left-3 -z-10" aria-hidden="true" />
                <p className="font-serif italic text-lg sm:text-2xl text-[#f4ede0] font-normal leading-relaxed">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </div>

              {/* Software Resolution */}
              <div className="mt-8 pt-6 border-t border-[#f4ede0]/10">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff6b5b] block mb-2 flex items-center gap-1.5 font-bold">
                  <ArrowRight className="w-3.5 h-3.5 text-[#ff6b5b]" aria-hidden="true" />
                  What I do with it
                </span>
                <p className="text-[#c4b7a1] text-sm sm:text-base font-light font-sans leading-relaxed">
                  {current.resolution}
                </p>
              </div>
            </div>

            {/* Formula Footer */}
            <div className="mt-8 pt-6 border-t border-[#f4ede0]/10 flex items-center justify-between gap-4 flex-wrap">
              <span className="font-mono text-[11px] sm:text-xs text-[#f4ede0] bg-[#0c1527] px-3.5 py-1.5 rounded-lg border border-[#f4ede0]/15 break-all sm:break-normal max-w-full">
                {current.formula}
              </span>
              {current.paperUrl ? (
                <a
                  href={current.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="RESEARCH"
                  onMouseEnter={() => sound.playHoverTick()}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#ff6b5b] hover:text-[#f4ede0] uppercase tracking-wider font-semibold transition-colors"
                >
                  <span>Read Published Paper (Civilica)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ) : (
                <span className="text-[11px] font-mono text-[#c4b7a1] uppercase tracking-wider">
                  Elyas Forghani &bull; Field Notes
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
