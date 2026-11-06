'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PROJECTS } from '../../data/projects'
import { sound } from '../../utils/audio'

export default function StefanoProjectIndex({ limit = 5 }) {
  const [activeProject, setActiveProject] = useState(null)
  const previewRef = useRef(null)
  const mouseCoordsRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 })
  const animFrameIdRef = useRef(null)

  const displayedProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS

  // Bounded floating position loop - active only when a project is hovered/focused
  useEffect(() => {
    if (!activeProject) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
        animFrameIdRef.current = null
      }
      return
    }

    const preview = previewRef.current
    if (!preview) return

    const coords = mouseCoordsRef.current
    let isMounted = true

    const loop = () => {
      if (!isMounted) return
      coords.currentX += (coords.targetX - coords.currentX) * 0.18
      coords.currentY += (coords.targetY - coords.currentY) * 0.18

      if (preview && typeof window !== 'undefined') {
        const previewWidth = 288
        const previewHeight = 176
        const margin = 20

        // Horizontal boundary detection
        const isNearRight = coords.currentX + margin + previewWidth > window.innerWidth
        const xPos = isNearRight ? coords.currentX - previewWidth - margin : coords.currentX + margin

        // Vertical boundary containment: keeps preview inside viewport window
        const idealY = coords.currentY - previewHeight / 2
        const yPos = Math.max(margin, Math.min(window.innerHeight - previewHeight - margin, idealY))

        preview.style.transform = `translate3d(${Math.round(xPos)}px, ${Math.round(yPos)}px, 0)`
      }

      animFrameIdRef.current = requestAnimationFrame(loop)
    }

    animFrameIdRef.current = requestAnimationFrame(loop)

    return () => {
      isMounted = false
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
        animFrameIdRef.current = null
      }
    }
  }, [activeProject])

  // Track cursor position globally with passive listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseCoordsRef.current.targetX = e.clientX
      mouseCoordsRef.current.targetY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleProjectHover = useCallback((proj, e) => {
    if (e && e.clientX && e.clientY) {
      // Prime starting coords to prevent jump
      if (!activeProject) {
        mouseCoordsRef.current.targetX = e.clientX
        mouseCoordsRef.current.targetY = e.clientY
        mouseCoordsRef.current.currentX = e.clientX
        mouseCoordsRef.current.currentY = e.clientY
      }
    }
    setActiveProject(proj)
    sound.playHoverTick()
  }, [activeProject])

  return (
    <section id="works-index" className="relative z-20 py-28 md:py-36 px-6 max-w-7xl mx-auto border-b border-[#f4ede0]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#f4ede0]/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#ff6b5b] block mb-3 font-semibold">
            03 / Selected Works Index
          </span>
          <h2 className="font-syne font-black text-4xl sm:text-6xl uppercase tracking-tight text-[#f4ede0]">
            Curated Works <span className="text-[#c4b7a1]/70 font-normal">({displayedProjects.length.toString().padStart(2, '0')})</span>
          </h2>
        </div>
        <p className="text-sm font-sans text-[#c4b7a1] max-w-md font-light leading-relaxed">
          High-impact production systems, commercial e-commerce platforms, and spatial WebGL interfaces engineered with mathematical precision.
        </p>
      </div>

      {/* Floating Cursor-Following Image Preview (Desktop Only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 w-72 h-44 rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-opacity duration-300 will-change-transform hidden lg:block ${
          activeProject ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {activeProject && (
          <div className="relative w-full h-full bg-neutral-900">
            <Image
              src={activeProject.imageSrc}
              alt={activeProject.title}
              fill
              sizes="300px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-200">
              <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                {activeProject.category}
              </span>
              <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                {activeProject.year}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Editorial Index Rows */}
      <div
        className="group/index divide-y divide-white/10"
        onMouseLeave={() => setActiveProject(null)}
      >
        {displayedProjects.map((proj) => (
          <Link
            key={proj.slug}
            href={`/works/${proj.slug}`}
            onMouseEnter={(e) => handleProjectHover(proj, e)}
            onFocus={(e) => handleProjectHover(proj, e)}
            onBlur={() => setActiveProject(null)}
            data-cursor="VIEW"
            className="group/row flex flex-col sm:flex-row sm:items-center justify-between py-6 sm:py-8 transition-all duration-300 relative cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 rounded-lg px-2"
          >
            {/* Hover background line highlight */}
            <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover/row:opacity-100 group-focus-visible/row:opacity-100 transition-opacity -mx-2 sm:-mx-4 px-2 sm:px-4 rounded-xl pointer-events-none" />

            <div className="flex items-baseline gap-4 sm:gap-8 md:gap-10 min-w-0 flex-1 pr-2">
              <span className="font-mono text-xs text-neutral-500 group-hover/row:text-[#ff6b5b] transition-colors shrink-0">
                {proj.index}
              </span>

              <h3 className="font-syne font-bold text-lg sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-[#f4ede0] group-hover/index:text-[#f4ede0]/40 group-hover/row:!text-[#ff6b5b] group-hover/row:translate-x-2 sm:group-hover/row:translate-x-3 transition-all duration-300 break-words">
                {proj.title}
              </h3>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 shrink-0 mt-3 sm:mt-0">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 sm:text-neutral-500 group-hover/row:text-[#f4ede0] transition-colors text-right max-w-[180px] sm:max-w-none">
                {proj.tag}
              </span>

              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full border border-white/10 group-hover/row:border-[#ff6b5b] flex items-center justify-center transition-all duration-300 group-hover/row:bg-[#ff6b5b] group-hover/row:text-[#14213d]">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/row:-rotate-45 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Archive Callout */}
      {limit && PROJECTS.length > limit && (
        <div className="pt-10 mt-8 border-t border-[#f4ede0]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c4b7a1]">
            Showcasing 05 of {PROJECTS.length.toString().padStart(2, '0')} Flagship Artifacts
          </span>
          <Link
            href="/works"
            data-cursor="ALL WORKS"
            onMouseEnter={() => sound.playHoverTick()}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#ff6b5b] text-[#14213d] font-syne font-bold text-xs uppercase tracking-widest hover:bg-[#ff8577] transition-all duration-300 shadow-xl group cursor-pointer"
          >
            <span>Explore All {PROJECTS.length} Works in Archive</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </section>
  )
}
