'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef, useState } from 'react'
import MagneticButton from './MagneticButton'
import TransmissionDrawer from './TransmissionDrawer'
import { sound } from '../../utils/audio'
import { ArrowUpRight, Copy, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_1 = [
  'ELYAS FORGHANI',
  '•',
  'FRONT-END DEVELOPER',
  '•',
  'GPM STUDIO STOREFRONT',
  '•',
  'NEXT.JS & TYPESCRIPT',
  '•',
  'JAVASCRIPT & POSTGRESQL',
  '•',
  'GSAP MOTION',
  '•',
  'TAILWIND CSS',
  '•',
  'CHEMICAL ENGINEERING',
  '•',
]

const MARQUEE_2 = [
  'OPEN TO ROLES & FREELANCE',
  '•',
  'CLIENT E-COMMERCE',
  '•',
  'THIS SITE IS OPEN SOURCE',
  '•',
  'EN/FA FRIENDLY',
  '•',
  'BASED IN IRAN, WORKS REMOTE',
  '•',
  'LET’S BUILD SOMETHING',
  '•',
]

export default function ContactCTA() {
  const container = useRef(null)
  const [copied, setCopied] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const email = 'elyasfgidev@gmail.com'

  const handleCopyEmail = () => {
    sound.playStickerPop()
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reducedMotion) {
        gsap.set('.js-cta-content', { opacity: 1, y: 0 })
        return
      }

      const m1 = gsap.to('.js-marquee-1', {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: 'none',
        paused: true,
      })

      const m2 = gsap.fromTo(
        '.js-marquee-2',
        { xPercent: -50 },
        {
          xPercent: 0,
          repeat: -1,
          duration: 30,
          ease: 'none',
          paused: true,
        }
      )

      // Only animate marquees when container is visible in viewport
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          m1.play()
          m2.play()
        },
        onLeave: () => {
          m1.pause()
          m2.pause()
        },
        onEnterBack: () => {
          m1.play()
          m2.play()
        },
        onLeaveBack: () => {
          m1.pause()
          m2.pause()
        },
      })

      gsap.from('.js-cta-content', {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: container }
  )

  return (
    <section
      id="contact"
      ref={container}
      className="relative py-28 md:py-36 bg-[#14213d] text-[#f4ede0] overflow-hidden border-t border-[#f4ede0]/10"
    >
      {/* Decorative Kinetic Marquees */}
      <div aria-hidden="true" className="relative flex flex-col mb-20 md:mb-28 select-none overflow-hidden shadow-2xl">
        {/* Ribbon 1: High-Contrast Inverted Cream Tape */}
        <div className="bg-[#f4ede0] text-[#14213d] py-4 md:py-5 flex whitespace-nowrap overflow-hidden -rotate-1 scale-105 shadow-xl">
          <div className="js-marquee-1 flex items-center gap-8 font-syne font-black text-2xl md:text-5xl uppercase tracking-tighter will-change-transform">
            {[...MARQUEE_1, ...MARQUEE_1, ...MARQUEE_1, ...MARQUEE_1].map((text, i) => (
              <span key={i} className={text === '•' ? 'text-[#ff6b5b] text-xl md:text-3xl' : ''}>
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Ribbon 2: Dark Editorial Navy Monospace Tape */}
        <div className="bg-[#0c1527] text-[#f4ede0] py-3 md:py-4 flex whitespace-nowrap overflow-hidden rotate-1 scale-105 border-y border-[#f4ede0]/15">
          <div className="js-marquee-2 flex items-center gap-8 font-mono font-bold text-base md:text-2xl uppercase tracking-widest will-change-transform">
            {[...MARQUEE_2, ...MARQUEE_2, ...MARQUEE_2, ...MARQUEE_2].map((text, i) => (
              <span key={i} className={text === '•' ? 'text-[#ff6b5b] text-sm md:text-lg' : ''}>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="js-cta-content max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-syne uppercase tracking-tight leading-[1.02] max-w-full break-normal">
          <span className="inline-block ">Have something</span>
          <span className="block font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#f4ede0] my-2 leading-tight">
            worth building?
          </span>
          <span className="inline-block ">Let&apos;s talk about it.</span>
        </h2>

        <p className="mt-8 text-base md:text-xl text-[#c4b7a1] max-w-xl font-light font-sans leading-relaxed break-words">
          Open to front-end and full-stack roles, and freelance projects. If you’ve got a product, a redesign or an experiment in mind — my inbox is below.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 max-w-full">
          <MagneticButton strength={0.4}>
            <button
              type="button"
              onClick={() => {
                sound.playClick()
                setDrawerOpen(true)
              }}
              data-cursor="TRANSMIT"
              className="px-8 py-4 rounded-full bg-[#ff6b5b] text-[#14213d] font-syne font-bold text-xs uppercase tracking-widest hover:bg-[#ff8577] transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <button
              type="button"
              data-cursor="COPY"
              onClick={handleCopyEmail}
              className="px-6 py-4 rounded-full bg-[#0f1a30]/85 border border-[#f4ede0]/20 text-[#f4ede0] font-mono text-xs uppercase tracking-wider hover:bg-[#0f1a30] hover:border-[#ff6b5b]/60 transition-all duration-300 cursor-pointer max-w-full truncate inline-flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#ff8577] shrink-0" aria-hidden="true" />
                  <span className="truncate text-[#ff8577] font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#ff6b5b] shrink-0" aria-hidden="true" />
                  <span className="truncate">Copy: {email}</span>
                </>
              )}
            </button>
          </MagneticButton>
          <span role="status" className="visually-hidden">
            {copied ? 'Email address copied to clipboard.' : ''}
          </span>
        </div>

        {/* Tactile Transmission Drawer */}
        <TransmissionDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </section>
  )
}
