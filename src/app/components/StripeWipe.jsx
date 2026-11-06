'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function StripeWipe() {
  const container = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // Multi-layer scrubbed parallax choreography
      tl.fromTo(
        '.js-panel-1',
        { yPercent: 20 },
        { yPercent: -20, ease: 'none' },
        0
      )
        .fromTo(
          '.js-panel-center-top',
          { yPercent: -15, scale: 0.95 },
          { yPercent: 15, scale: 1.05, ease: 'none' },
          0
        )
        .fromTo(
          '.js-panel-center-bottom',
          { yPercent: 25 },
          { yPercent: -25, ease: 'none' },
          0
        )
        .fromTo(
          '.js-panel-3',
          { yPercent: 15, rotate: -2 },
          { yPercent: -15, rotate: 1, ease: 'none' },
          0
        )
        .fromTo(
          '.js-editorial-text',
          { opacity: 0.3, y: 40 },
          { opacity: 1, y: -20, ease: 'power1.out' },
          0.2
        )
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className="relative min-h-screen py-24 md:py-36 bg-[#060709] text-white overflow-hidden border-b border-white/10"
    >
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4 js-editorial-text">
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-slate-400 block mb-2 font-mono">
            [ 03 / KINETIC HARMONY ]
          </span>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-syne">
            Visual Harmony &amp; Motion
          </h3>
        </div>
        <p className="text-sm md:text-base text-neutral-400 max-w-md font-light font-sans">
          A synchronized composition where classical form, architectural geometry, and kinetic pacing converge into seamless digital narratives.
        </p>
      </div>

      {/* Parallax Panels Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
        {/* Left Column */}
        <div className="md:col-span-4 js-panel-1 flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl bg-neutral-900 group border border-white/10">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              src="/images/projects/gpm-studio/gpm-product.webp"
              alt="GPM Studio Collectibles"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">Edition 01</span>
              <h4 className="text-lg font-bold font-syne">Baroque Vault</h4>
            </div>
          </div>
        </div>

        {/* Center Dual Column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl shadow-2xl bg-neutral-900 js-panel-center-top group border border-white/10">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              src="/images/projects/parrallax.webp"
              alt="Parallax WebGL"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">Edition 02</span>
              <h4 className="text-lg font-bold font-syne">Parallax WebGL</h4>
            </div>
          </div>

          <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl shadow-2xl bg-neutral-900 js-panel-center-bottom group border border-white/10">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              src="/images/projects/weather.webp"
              alt="Weather Station"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">Edition 03</span>
              <h4 className="text-lg font-bold font-syne">Weather Telemetry</h4>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-3 js-panel-3 flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl bg-neutral-900 group border border-white/10">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              src="/images/projects/hotelabbasi.jpg"
              alt="Hotel Abbasi"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">Edition 04</span>
              <h4 className="text-lg font-bold font-syne">Velocity Transit</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
