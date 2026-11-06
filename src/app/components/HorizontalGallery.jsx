'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Compass } from 'lucide-react'
import { sound } from '../../utils/audio'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_ITEMS = [
  {
    id: '01',
    title: 'GPM Studio Store',
    subtitle: 'Persian collectibles e-commerce — client production',
    image: '/images/projects/gpm-studio/gpm-main.webp',
    year: '2026',
    category: 'E-Commerce Production',
  },
  {
    id: '02',
    title: 'This Portfolio',
    subtitle: 'Three.js particles, GSAP timelines & Lenis scroll',
    image: '/images/projects/parrallax.webp',
    year: '2026',
    category: 'Spatial Computation',
  },
  {
    id: '03',
    title: 'Weather App',
    subtitle: 'Live forecasts from the OpenWeather API',
    image: '/images/projects/weather.webp',
    year: '2024',
    category: 'Live API Telemetry',
  },
  {
    id: '04',
    title: 'Hotel Abbasi',
    subtitle: 'Historic Isfahan hotel showcase with Tailwind',
    image: '/images/projects/hotelabbasi.jpg',
    year: '2024',
    category: 'Cultural Architecture',
  },
  {
    id: '05',
    title: 'Hope Church Digital Portal',
    subtitle: 'Accessible responsive community website with Tailwind CSS',
    image: '/images/projects/hope-church.webp',
    year: '2024',
    category: 'Accessible Frontend',
  },
  {
    id: '06',
    title: 'Dice Game',
    subtitle: 'Two-player dice challenge in vanilla JS',
    image: '/images/projects/dice.webp',
    year: '2024',
    category: 'Game Logic Engine',
  },
  {
    id: '07',
    title: 'Password Strength Checker',
    subtitle: 'Regex rules with a live strength meter',
    image: '/images/projects/password-strength.png',
    year: '2024',
    category: 'Algorithmic Security',
  },
  {
    id: '08',
    title: 'Depth Scroll Tunnel',
    subtitle: 'A camera that dives as you scroll',
    image: '/images/projects/parrallax-2.webp',
    year: '2026',
    category: '3D Spatial Depth',
  },
]

export default function HorizontalGallery() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track) return

      // Recomputed dynamically so window resizes / late image loads stay accurate
      const getScrollAmount = () =>
        Math.max(track.scrollWidth - window.innerWidth + 120, 0)

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: containerRef, revertOnUpdate: true }
  )

  return (
    <section
      ref={containerRef}
      className="relative bg-[#14213d] text-[#f4ede0] overflow-hidden border-b border-[#f4ede0]/10"
    >
      <div className="h-screen w-full flex flex-col justify-between py-8 px-6 sm:px-12">
        {/* Top Header telemetry */}
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-[#c4b7a1]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6b5b] animate-pulse" />
            <span className="text-[#f4ede0]">[ 04 / HORIZONTAL VISUAL ARCHIVE ]</span>
          </div>
          <span className="hidden sm:inline text-[#ff6b5b]">
            SCROLL DOWN TO ADVANCE HORIZONTALLY →
          </span>
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-8 will-change-transform my-auto select-none pl-4 pr-16"
        >
          {/* Section Introductory Title Card */}
          <div className="w-[300px] sm:w-[420px] shrink-0 p-6 sm:p-8 rounded-3xl glass-panel-glow flex flex-col justify-between h-[60vh] sm:h-[55vh] min-h-[420px] max-h-[580px] overflow-hidden">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-3 block">
                Visual Editions
              </span>
              <h3 className="font-syne font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white mb-3 sm:mb-4 leading-tight break-words">
                Architectural <br />
                <span className="font-serif italic lowercase text-2xl sm:text-4xl md:text-5xl text-slate-200 leading-tight">
                  geometry
                </span>
                <br />
                &amp; Motion
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-sans text-neutral-300 font-light leading-relaxed break-words">
              A curated photographic reel documenting structural thermodynamics, raw materials, and light dynamics across architectural spaces.
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>{GALLERY_ITEMS.length} Curated Editions</span>
              <ArrowRight className="w-4 h-4 text-slate-300 animate-bounce" />
            </div>
          </div>

          {/* Photo Cards */}
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              data-cursor="INSPECT"
              className="group relative w-[280px] sm:w-[380px] h-[60vh] sm:h-[55vh] min-h-[420px] max-h-[580px] shrink-0 rounded-3xl overflow-hidden glass-panel border border-white/15 hover:border-slate-300/50 transition-all duration-500 shadow-2xl flex flex-col justify-between p-6 cursor-pointer"
            >
              {/* Background Photo with Parallax Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="400px"
                  className="object-cover filter brightness-85 group-hover:brightness-100 group-hover:scale-108 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/40 pointer-events-none" />
              </div>

              {/* Card Top Header */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-widest">
                <span className="text-[#f4ede0] font-bold px-2.5 py-1 rounded-full bg-[#0c1527]/85 backdrop-blur-md border border-[#f4ede0]/15">
                  [ {item.id} / 0{GALLERY_ITEMS.length} ]
                </span>
                <span className="text-[#c4b7a1] px-2.5 py-1 rounded-full bg-[#0c1527]/85 backdrop-blur-md border border-[#f4ede0]/15 text-[10px]">
                  {item.category}
                </span>
              </div>

              {/* Card Bottom Meta */}
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                  {item.year} Series
                </span>
                <h4 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-white group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-300 font-light font-sans line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom telemetry line */}
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-500">
          <span className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Multi-Axis Scrubbed Reel</span>
          </span>
          <span>© Elyas Forghani Visual Lab</span>
        </div>
      </div>
    </section>
  )
}
