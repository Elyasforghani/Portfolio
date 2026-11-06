'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const QUOTES = [
  [
    { text: 'Architect of', font: 'syne', align: 'text-center' },
    { text: 'Digital', font: 'syne', align: 'text-right pr-4 sm:pr-[6vw]' },
    { text: 'Worlds', font: 'subtitle', align: 'text-left pl-4 sm:pl-[6vw]' },
  ],
  [
    { text: 'Crafting', font: 'syne', align: 'text-center' },
    { text: 'Immersive', font: 'syne', align: 'text-right pr-4 sm:pr-[6vw]' },
    { text: 'Experiences', font: 'subtitle', align: 'text-left pl-4 sm:pl-[6vw]' },
  ],
]

export default function PinnedQuotes() {
  const container = useRef(null)
  const bgImage = useRef(null)

  useGSAP(() => {
    const q0Lines = gsap.utils.toArray('.quote-line-0')
    const q1Lines = gsap.utils.toArray('.quote-line-1')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    // Subtle continuous zoom on background image across scroll
    tl.to(
      bgImage.current,
      {
        scale: 1.15,
        ease: 'none',
        duration: 10,
      },
      0
    )

    // Sequence 1: First Quote
    tl.fromTo(
      q0Lines,
      { opacity: 0, y: 70, rotateX: 20 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.18, duration: 1.6, ease: 'power2.out' },
      0.6
    ).to(
      q0Lines,
      { opacity: 0, y: -60, rotateX: -15, stagger: 0.1, duration: 1.2, ease: 'power2.in' },
      3.6
    )

    // Sequence 2: Second Quote
    tl.fromTo(
      q1Lines,
      { opacity: 0, y: 70, rotateX: 20 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.18, duration: 1.6, ease: 'power2.out' },
      5.6
    ).to(
      q1Lines,
      { opacity: 0, y: -60, rotateX: -15, stagger: 0.1, duration: 1.2, ease: 'power2.in' },
      8.6
    )
  }, { scope: container })

  return (
    <section ref={container} className="relative h-[400vh] bg-[#060709]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <video
          width={1920}
          height={1080}
          ref={bgImage}
          autoPlay
          loop
          muted
          playsInline
          src="/videos/me.webm"
          className="absolute inset-0 w-full h-full object-cover will-change-transform brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />

        {/* Section Badge */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-white/60 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-200 animate-pulse" />
          <span>[ 09 / MILESTONES &amp; PHILOSOPHY ]</span>
        </div>

        {QUOTES.map((lines, qi) => (
          <div
            key={qi}
            className="text-white absolute inset-x-0 flex flex-col px-4 sm:px-[6vw] z-10 pointer-events-none select-none max-w-full overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            {lines.map((l, li) => (
              <span
                key={li}
                className={`block leading-[0.95] opacity-0 quote-line-${qi} ${l.align} max-w-full truncate overflow-hidden ${
                  l.font === 'subtitle'
                    ? 'font-subtitle text-[8vw] sm:text-[7.5vw] md:text-[7vw] text-amber-200/90'
                    : 'font-syne font-black uppercase text-[8.5vw] sm:text-[8vw] md:text-[7.5vw] tracking-tighter text-white'
                }`}
              >
                {l.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
