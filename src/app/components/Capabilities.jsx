'use client'

import React, { useRef } from 'react'
import {
  Code2,
  Database,
  Boxes,
  Cpu,
  CheckCircle2,
} from 'lucide-react'
import { sound } from '../../utils/audio'
import AnimatedHeaderSection from './AnimatedHeaderSection'

const CAPABILITIES = [
  {
    number: '01',
    id: 'frontend',
    title: 'Frontend Architecture',
    subtitle: 'Next.js 16, React 19, JavaScript & TypeScript',
    icon: Code2,
    description:
      'Building responsive, snappy interfaces with Next.js 16 and React 19. JavaScript and TypeScript provide clear component boundaries, predictable state management, and modern Tailwind CSS styling.',
    skills: [
      'Next.js 16 & React 19',
      'JavaScript & TypeScript',
      'Tailwind CSS v4 Styling',
      'Server & Client Components',
      'Responsive RTL / LTR UI',
    ],
    highlights: [
      'Zero hydration flicker',
      'Clean component structure',
      'Mobile-first responsive layouts',
    ],
  },
  {
    number: '02',
    id: 'backend',
    title: 'Database & REST APIs',
    subtitle: 'PostgreSQL, REST integrations & CRUD pipelines',
    icon: Database,
    description:
      'Structured relational modeling with PostgreSQL, reliable REST API integrations (Weather API, MockAPI), validated modal forms with React Hook Form, and clean error states when data arrives late.',
    skills: [
      'PostgreSQL',
      'REST API Integrations',
      'CRUD Dashboards',
      'React Hook Form Validation',
      'Async Fetch Pipelines',
    ],
    highlights: [
      'Trustworthy database structure',
      'Clear request & error handling',
      'Form validation & live search',
    ],
  },
  {
    number: '03',
    id: 'motion',
    title: 'Motion & Visual Craft',
    subtitle: 'GSAP timelines, Lenis scroll & interactive scenes',
    icon: Boxes,
    description:
      'GSAP ScrollTrigger timelines, smooth Lenis inertial scrolling, interactive Three.js backgrounds, and Swiper sliders — motion that supports readability and feels responsive.',
    skills: [
      'GSAP 3 & ScrollTrigger',
      'Lenis Smooth Scrolling',
      'Three.js Scenes',
      'Swiper.js Sliders',
      'Web Audio Controls',
    ],
    highlights: [
      'Smooth inertial scroll feel',
      'Reduced-motion respected',
      'Responsive animation lifecycles',
    ],
  },
  {
    number: '04',
    id: 'rigor',
    title: 'Chemical Engineering Discipline',
    subtitle: 'First-principles debugging & system clarity',
    icon: Cpu,
    description:
      'Applying lessons from chemical process engineering and published Civilica research: find the rate-limiting bottleneck first, give modules solid support structure, and deploy reliably on Vercel and GitHub.',
    skills: [
      'Bottleneck Isolation',
      'Performance Profiling',
      'Vercel & Git Workflows',
      'Core Web Vitals',
      'Chemical Eng. Mindset',
    ],
    highlights: [
      'Measure before optimizing',
      'Modular decoupled design',
      'Design for real-world failures',
    ],
  },
]

export default function Capabilities() {
  const container = useRef(null)

  return (
    <section
      id="capabilities"
      ref={container}
      className="relative z-10 py-28 md:py-36 px-6 bg-[#14213d] text-[#f4ede0] border-b border-[#f4ede0]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated Masked Header */}
        <AnimatedHeaderSection
          title={['Core Capabilities', '& Stack Focus']}
          subtitle="Next.js, JavaScript, TypeScript, PostgreSQL, and GSAP — built to feel fast and stay reliable."
        />

        {/* Stacking Sticky Cards */}
        <div className="relative flex flex-col gap-8 pb-12">
          {CAPABILITIES.map((cap, idx) => {
            const CapIcon = cap.icon
            const topOffset = `calc(12vh + ${idx * 2.5}rem)`
            const marginBottom = `${(CAPABILITIES.length - idx - 1) * 3}rem`

            return (
              <div
                key={cap.number}
                className="sticky rounded-3xl p-6 sm:p-10 md:p-12 border border-[#f4ede0]/15 hover:border-[#ff6b5b]/50 bg-[#0f1a30]/95 backdrop-blur-2xl transition-all duration-500 shadow-2xl"
                style={{
                  top: topOffset,
                  marginBottom: marginBottom,
                }}
                onMouseEnter={() => sound.playHoverTick()}
              >
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Number & Identity */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#ff6b5b]">
                        [ {cap.number} ]
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#14213d] border border-[#f4ede0]/15 flex items-center justify-center text-[#f4ede0]">
                        <CapIcon className="w-4 h-4 text-[#ff6b5b]" />
                      </div>
                    </div>

                    <h3 className="font-syne font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#f4ede0] leading-tight">
                      {cap.title}
                    </h3>

                    <p className="text-xs font-mono text-[#c4b7a1] uppercase tracking-wider">
                      {cap.subtitle}
                    </p>
                  </div>

                  {/* Right Column: Description & System Highlights */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <p className="text-sm sm:text-base font-sans text-[#c4b7a1] font-light leading-relaxed break-words">
                      {cap.description}
                    </p>

                    {/* Key Principles Checklist */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#14213d]/60 border border-[#f4ede0]/10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff6b5b] block mb-3">
                        How I Work
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cap.highlights.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs font-mono text-[#f4ede0]/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#ff6b5b] shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Pills */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#c4b7a1] block mb-3">
                        Technologies
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cap.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-[#f4ede0]/10 text-xs font-mono text-[#f4ede0]/90 hover:border-[#ff6b5b]/40 transition-colors"
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
