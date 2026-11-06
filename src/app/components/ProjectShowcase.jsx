'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, ArrowUpRight, Layers, FileText, Zap } from 'lucide-react'
import { GithubIcon } from './Icons'
import { PROJECTS } from '../../data/projects'
import { sound } from '../../utils/audio'

gsap.registerPlugin(ScrollTrigger)

function TiltCard({ proj, isEven }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -7
    const rotateY = ((x - centerX) / centerX) * 7

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setTransform({ rotateX, rotateY, glareX, glareY, opacity: 1 })
  }

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, opacity: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className="block group relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-neutral-900 border border-white/15 shadow-2xl cursor-pointer will-change-transform"
    >
      {/* Liquid Ripple & Specular Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, rgba(0, 229, 255, 0.25) 0%, rgba(253, 230, 138, 0.18) 30%, transparent 65%)`,
          opacity: transform.opacity,
        }}
      />
      {transform.opacity > 0 && (
        <div
          className="pointer-events-none absolute z-20 w-32 h-32 rounded-full border border-cyan-400/40 animate-ping opacity-40"
          style={{
            left: `${transform.glareX}%`,
            top: `${transform.glareY}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      <Image
        src={proj.imageSrc}
        alt={proj.title}
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="js-project-img object-cover will-change-transform filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
      />

      {/* Top Pill / Badge inside Visual */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
        <span className="px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/70 backdrop-blur-md text-slate-200 border border-white/15">
          {proj.highlight}
        </span>
      </div>

      {/* Quick Access Overlay Buttons inside Image */}
      <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
        <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold group-hover:bg-slate-200 transition-colors shadow-lg">
          <FileText className="w-3.5 h-3.5" />
          <span>Case Study</span>
        </span>
      </div>
    </div>
  )
}

export default function ProjectShowcase() {
  const container = useRef(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.js-project-card')

      cards.forEach((card) => {
        const content = card.querySelector('.js-project-content')

        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    },
    { scope: container }
  )

  return (
    <section
      id="works"
      ref={container}
      className="relative z-10 py-32 px-6 bg-neutral-950 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-3">
              <Layers className="w-3.5 h-3.5 text-slate-100" />
              <span>[ 07 / FEATURED CASE STUDIES &amp; ARCHITECTURAL LAB ]</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-syne text-white">
              Engineered Works
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm md:text-base text-neutral-400 max-w-md font-light leading-relaxed">
              Live repositories and production builds featuring full-stack architecture, Redis caching, Docker pipelines, and 3D WebGL motion.
            </p>
            <Link
              href="/works"
              data-cursor="ALL WORKS"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-slate-300 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-slate-200 hover:text-white transition-all whitespace-nowrap shadow-lg"
            >
              <span>Explore All Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-28">
          {PROJECTS.map((proj, idx) => {
            const isEven = idx % 2 === 0
            return (
              <div
                key={proj.slug}
                className={`js-project-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual / 3D Tilt Mockup Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Link
                    href={`/works/${proj.slug}`}
                    data-cursor="INSPECT"
                  >
                    <TiltCard proj={proj} isEven={isEven} />
                  </Link>
                </div>

                {/* Content Details Column */}
                <div
                  className={`lg:col-span-5 js-project-content flex flex-col justify-center ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
                    <span className="text-slate-100 font-bold">
                      [ {proj.index} ]
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {proj.tag}
                    </span>
                  </div>

                  <Link href={`/works/${proj.slug}`} data-cursor="CASE STUDY">
                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight font-syne text-white mb-4 hover:text-slate-200 transition-colors">
                      {proj.title}
                    </h3>
                  </Link>

                  <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-light mb-6">
                    {proj.shortDesc}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:border-slate-300/50 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                    <Link
                      href={`/works/${proj.slug}`}
                      data-cursor="EXPLORE"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-slate-200 hover:text-white transition-colors"
                    >
                      <span>Deep Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="GITHUB"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-slate-200 transition-colors group ml-auto"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-slate-200 transition-colors" />
                      <span>Code</span>
                    </a>

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="LIVE"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-colors group"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live</span>
                      </a>
                    )}
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
