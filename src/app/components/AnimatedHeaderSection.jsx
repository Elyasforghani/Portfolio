'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedHeaderSection({
  title,
  subtitle,
  action,
  className = '',
}) {
  const container = useRef(null)
  const titleRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        titleRef.current?.querySelectorAll('.js-mask-line') || [],
        { y: '120%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        }
      )
    },
    { scope: container }
  )

  const titleLines = Array.isArray(title) ? title : [title]

  return (
    <div
      ref={container}
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#f4ede0]/10 ${className}`}
    >
      <div>
        <div className="overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
          <h2
            ref={titleRef}
            className="font-syne font-black text-4xl sm:text-6xl uppercase tracking-tight text-[#f4ede0] leading-[1.05]"
          >
            {titleLines.map((line, idx) => (
              <span key={idx} className="js-mask-line block will-change-transform">
                {line}
              </span>
            ))}
          </h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {subtitle && (
          <p className="text-sm font-sans text-[#c4b7a1] max-w-md font-light leading-relaxed">
            {subtitle}
          </p>
        )}
        {action && <div>{action}</div>}
      </div>
    </div>
  )
}
