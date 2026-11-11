'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sound } from '../../utils/audio'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons'
import {
  ArrowUpRight,
  ArrowUp,
  Copy,
  Check,
  Compass,
  Clock,
} from 'lucide-react'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const year = new Date().getFullYear().toString()

  const email = 'elyasfgidev@gmail.com'

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const utcString = now.toTimeString().split(' ')[0] + ' UTC'
      setCurrentTime(utcString)
    }

    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = (e) => {
    e.preventDefault()
    sound.playStickerPop()
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2400)
      })
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = email
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2400)
      } catch {}
      document.body.removeChild(textarea)
    }
  }

  const handleScrollTop = () => {
    sound.playClick()
    if (typeof window !== 'undefined') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.4 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="relative z-10 bg-[#0c1527] text-[#c4b7a1] pt-20 pb-12 px-6 sm:px-10 lg:px-16 border-t border-[#f4ede0]/10 overflow-hidden select-none">
      {/* Background Chromatic Aurora Radiance */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85vw] h-[450px] rounded-full pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at bottom, rgba(255, 107, 91, 0.16) 0%, rgba(244, 237, 224, 0.08) 40%, rgba(20, 33, 61, 0.5) 70%, transparent 85%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top HUD Telemetry Ribbon (Nesil Noble inspired) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-12 mb-16 border-b border-[#f4ede0]/10 text-xs font-mono tracking-wider">
          {/* Availability Beacon */}
          <div className="flex items-center gap-3 bg-white/5 border border-[#f4ede0]/15 px-4 py-2 rounded-full backdrop-blur-md">
           
            <span className="text-[#ff6b5b] font-semibold uppercase">
              Open to engineering roles &amp; freelance
            </span>
          </div>

          {/* Precision System Coordinates & Clock */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[#c4b7a1] text-[11px] uppercase">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#ff6b5b]" aria-hidden="true" />
              <span className="text-[#f4ede0] tabular-nums">{currentTime || 'SYNCHRONIZING...'}</span>
            </div>
            <span aria-hidden="true" className="text-[#f4ede0]/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#ff6b5b]" aria-hidden="true" />
              <span>Tehran &bull; Global Relay</span>
            </div>
          </div>
        </div>

        {/* Main 3-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-20 border-b border-[#f4ede0]/10">
          {/* Column 1: Identity & Portrait (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 min-w-0">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#c4b7a1] flex items-center gap-1.5 mb-2">
                <span>FRONT-END &bull; CREATIVE DEVELOPER</span>
              </span>

              <p className="font-serif italic text-base sm:text-lg text-[#f4ede0] mt-2 font-normal leading-normal">
                code, motion &amp; chemistry
              </p>
            </div>

            {/* Verified Engineer Portrait Card */}
            <div className="group relative w-full max-w-[280px] rounded-2xl p-1 bg-gradient-to-br from-[#f4ede0]/20 via-[#f4ede0]/5 to-[#f4ede0]/10 border border-[#f4ede0]/15 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-[#ff6b5b]/50 hover:shadow-[0_0_35px_rgba(255,107,91,0.2)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#0c1527] flex items-center justify-center">
                <Image
                  src="/images/ELyas.webp"
                  alt="Elyas Forghani portrait"
                  fill
                  sizes="400px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Master Navigation Index (Span 3) */}
          <div className="lg:col-span-3 space-y-4 min-w-0">
            <ul className="space-y-3 font-mono text-xs uppercase tracking-wider">
              {[
                { href: '/', label: 'Overview' },
                { href: '/works', label: 'Works Archive' },
                { href: '/about', label: 'Trajectory' },
                { href: '/lab', label: 'Spatial Lab' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="NAV"
                    onMouseEnter={() => sound.playHoverTick()}
                    className="group inline-flex items-center gap-2 text-[#c4b7a1] hover:text-[#ff6b5b] transition-colors"
                  >
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#f4ede0]/30 group-hover:bg-[#ff6b5b] transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Dispatch & Channels (Span 4) */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            {/* Interactive Haptic Email Card */}
            <div className="p-4 rounded-xl bg-[#0f1a30]/80 border border-[#f4ede0]/15 backdrop-blur-md relative group hover:border-[#ff6b5b]/50 transition-colors">
              <span className="text-xs font-mono uppercase tracking-wider text-[#c4b7a1] block mb-1">
                Direct Electronic Transmission
              </span>
              <div className="font-mono text-xs text-[#f4ede0] break-all mb-3 select-all font-semibold">
                {email}
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="COPY"
                className={`w-full py-2 px-3 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  copied
                    ? 'bg-[#ff6b5b] text-[#14213d] font-bold shadow-[0_0_20px_rgba(255,107,91,0.5)]'
                    : 'bg-[#ff6b5b] text-[#14213d] hover:bg-[#ff8577] font-bold shadow-md'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#14213d]" aria-hidden="true" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
              <span role="status" className="visually-hidden">
                {copied ? 'Email address copied to clipboard.' : ''}
              </span>
            </div>

            {/* Social Network Links */}
            <div className="space-y-2 text-xs font-mono">
              <a
                href="https://github.com/Elyasforghani"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                onMouseEnter={() => sound.playHoverTick()}
                className="group flex items-center justify-between p-2.5 rounded-lg border border-[#f4ede0]/10 hover:border-[#ff6b5b]/40 bg-[#0f1a30]/60 hover:bg-[#0f1a30] text-[#c4b7a1] hover:text-[#f4ede0] transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[#c4b7a1] group-hover:text-[#ff6b5b] transition-colors" aria-hidden="true" />
                  <span>GitHub</span>
                </span>
                <span className="text-xs text-[#c4b7a1]/90 group-hover:text-[#ff6b5b] flex items-center gap-1">
                  @Elyasforghani <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/elyas-forghani-b4746b263/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                onMouseEnter={() => sound.playHoverTick()}
                className="group flex items-center justify-between p-2.5 rounded-lg border border-[#f4ede0]/10 hover:border-[#ff6b5b]/40 bg-[#0f1a30]/60 hover:bg-[#0f1a30] text-[#c4b7a1] hover:text-[#f4ede0] transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[#c4b7a1] group-hover:text-[#ff6b5b] transition-colors" aria-hidden="true" />
                  <span>LinkedIn</span>
                </span>
                <span className="text-xs text-[#c4b7a1]/90 group-hover:text-[#ff6b5b] flex items-center gap-1">
                  Connect <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </a>

              <a
                href="https://www.instagram.com/elyasforghani.dev"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="INSTAGRAM"
                onMouseEnter={() => sound.playHoverTick()}
                className="group flex items-center justify-between p-2.5 rounded-lg border border-[#f4ede0]/10 hover:border-[#ff6b5b]/40 bg-[#0f1a30]/60 hover:bg-[#0f1a30] text-[#c4b7a1] hover:text-[#f4ede0] transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <InstagramIcon className="w-4 h-4 text-[#c4b7a1] group-hover:text-[#ff6b5b] transition-colors" aria-hidden="true" />
                  <span>Instagram</span>
                </span>
                <span className="text-xs text-[#c4b7a1]/90 group-hover:text-[#ff6b5b] flex items-center gap-1">
                  @elyasforghani.dev
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Monumental Typographic Watermark (Fluid SVG Scaler - Guaranteed No-Clip) */}
        <div aria-hidden="true" className="py-12 sm:py-16 text-center w-full max-w-6xl mx-auto px-4 select-none">
          <svg
            viewBox="0 0 1600 140"
            className="w-full h-auto max-h-24 sm:max-h-32 mx-auto pointer-events-none drop-shadow-[0_0_30px_rgba(244,237,224,0.1)]"
          >
            <text
              x="50%"
              y="54%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="font-syne font-black uppercase fill-transparent stroke-[#f4ede0]/20 hover:stroke-[#ff6b5b] transition-all duration-700 pointer-events-auto"
              style={{ fontSize: '78px', strokeWidth: 1.6, letterSpacing: '0.04em' }}
            >
              ELYAS FORGHANI
            </text>
          </svg>
        </div>

        {/* Bottom Architectural Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-mono uppercase tracking-widest text-[#c4b7a1] border-t border-[#f4ede0]/10">
          <div className="flex items-center gap-2 truncate">
            
            <span className="truncate">&copy; {year} ELYAS  &bull; ALL RIGHTS RESERVED</span>
          </div>

          <div className="hidden lg:inline text-[#c4b7a1]/80">
            BUILT WITH NEXT.JS &bull; THREE.JS &bull; GSAP &bull; LOTS OF COFFEE
          </div>

          {/* Magnetic Ascend Button */}
          <button
            type="button"
            onClick={handleScrollTop}
            data-cursor="TOP"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#f4ede0]/20 bg-[#f4ede0]/5 hover:bg-[#ff6b5b] hover:text-[#14213d] hover:border-[#ff6b5b] transition-all duration-300 text-[#f4ede0] font-mono text-xs cursor-pointer shadow-lg"
          >
            <span>Ascend to Orbit</span>
            <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
