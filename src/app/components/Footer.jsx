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
  Terminal,
  Cpu,
  ShieldCheck,
  Radio,
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
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b5b] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff6b5b]" />
            </span>
            <span className="text-[#ff6b5b] font-semibold uppercase">
              Open to engineering roles &amp; freelance
            </span>
          </div>

          {/* Precision System Coordinates & Clock */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-neutral-400 text-[11px] uppercase">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-white tabular-nums">{currentTime || 'SYNCHRONIZING...'}</span>
            </div>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>Tehran &bull; Global Relay</span>
            </div>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              <span>Next.js &bull; Three.js &bull; GSAP</span>
            </div>
          </div>
        </div>

        {/* Main 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-20 border-b border-white/10">
          {/* Column 1: Identity & 3D Character Hologram (Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 min-w-0">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 flex items-center gap-1.5 mb-2">
                <span className="text-slate-300">+</span>
                <span>FRONT-END &bull; CREATIVE DEVELOPER</span>
              </span>
              <h3 className="font-syne font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-none break-words">
                ELYAS FORGHANI
              </h3>
              <p className="font-serif italic text-base sm:text-lg text-slate-200 mt-2 font-normal leading-normal">
                code, motion &amp; chemistry
              </p>
              <p className="text-xs text-neutral-400 mt-4 leading-relaxed font-light max-w-sm break-words">
                B.Sc. Chemical Engineering, University of Kurdistan. Now building for the web with Next.js, TypeScript and Three.js.
              </p>
            </div>

            {/* Verified Engineer Portrait Card */}
            <div className="group relative w-full max-w-[280px] rounded-2xl p-1 bg-gradient-to-br from-[#f4ede0]/20 via-[#f4ede0]/5 to-[#f4ede0]/10 border border-[#f4ede0]/15 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-[#ff6b5b]/50 hover:shadow-[0_0_35px_rgba(255,107,91,0.2)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#0c1527] flex items-center justify-center">
                <Image
                  src="/images/elyas-portrait.webp"
                  alt="Elyas Forghani portrait"
                  fill
                  sizes="280px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Master Navigation Index (Span 2) */}
          <div className="lg:col-span-2 space-y-4 min-w-0">
            <ul className="space-y-3 font-mono text-xs uppercase tracking-wider">
              {[
                { href: '/', label: 'Overview [01]' },
                { href: '/works', label: 'Works Archive [02]' },
                { href: '/about', label: 'Trajectory [03]' },
                { href: '/lab', label: 'Spatial Lab [04]' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="NAV"
                    onMouseEnter={() => sound.playHoverTick()}
                    className="group inline-flex items-center gap-2 text-[#c4b7a1] hover:text-[#ff6b5b] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f4ede0]/30 group-hover:bg-[#ff6b5b] transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick()
                    const sim = document.getElementById('pipeline-simulator')
                    if (sim) sim.scrollIntoView({ behavior: 'smooth' })
                  }}
                  onMouseEnter={() => sound.playHoverTick()}
                  className="group inline-flex items-center gap-2 text-[#c4b7a1] hover:text-[#ff6b5b] transition-colors cursor-pointer text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4ede0]/30 group-hover:bg-[#ff6b5b] transition-colors" />
                  <span>Architecture [05]</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Engineering Arsenal (Span 3) */}
          <div className="lg:col-span-3 space-y-4 min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c4b7a1]/70 block mb-6">
              TECHNICAL ARSENAL
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Next.js 16', tag: 'CORE' },
                { name: 'React 19', tag: 'UI' },
                { name: 'TypeScript', tag: 'LANG' },
                { name: 'Tailwind CSS v4', tag: 'STYLE' },
                { name: 'Three.js / WebGL', tag: '3D' },
                { name: 'GSAP 3', tag: 'MOTION' },
                { name: 'Lenis', tag: 'SCROLL' },
                { name: 'Web Audio API', tag: 'AUDIO' },
                { name: 'Git & Vercel', tag: 'DEPLOY' },
              ].map((tech) => (
                <span
                  key={tech.name}
                  onMouseEnter={() => sound.playHoverTick()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-slate-300/40 text-neutral-300 hover:text-white text-[11px] font-mono transition-all duration-200 cursor-default"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>

            <div className="pt-4 text-[11px] font-mono text-neutral-500 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Open source — every line of this site is on GitHub</span>
            </div>
          </div>

          {/* Column 4: Direct Dispatch & Channels (Span 3) */}
          <div className="lg:col-span-3 space-y-6 min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c4b7a1]/70 block mb-6">
              DIRECT DISPATCH &amp; CHANNELS
            </span>

            {/* Interactive Haptic Email Card */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/15 backdrop-blur-md relative group hover:border-slate-300/50 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                Direct Electronic Transmission
              </span>
              <div className="font-mono text-xs text-white break-all mb-3 select-all font-semibold">
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
                    <Check className="w-3.5 h-3.5 text-black" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Network Links */}
            <div className="space-y-2 text-xs font-mono">
              <a
                href="https://github.com/Elyasforghani"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                onMouseEnter={() => sound.playHoverTick()}
                className="group flex items-center justify-between p-2.5 rounded-lg border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/5 text-neutral-300 hover:text-white transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-neutral-400 group-hover:text-slate-200 transition-colors" />
                  <span>GitHub</span>
                </span>
                <span className="text-[10px] text-neutral-500 group-hover:text-slate-200 flex items-center gap-1">
                  @Elyasforghani <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/elyas-forghani-b4746b263/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                onMouseEnter={() => sound.playHoverTick()}
                className="group flex items-center justify-between p-2.5 rounded-lg border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/5 text-neutral-300 hover:text-white transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-neutral-400 group-hover:text-slate-200 transition-colors" />
                  <span>LinkedIn</span>
                </span>
                <span className="text-[10px] text-neutral-500 group-hover:text-slate-200 flex items-center gap-1">
                  Connect <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>

              <a
                href="https://www.instagram.com/elyasforghani.dev"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="INSTAGRAM"
                onMouseEnter={() => sound.playHoverTick()}
                className="group flex items-center justify-between p-2.5 rounded-lg border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/5 text-neutral-300 hover:text-white transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <InstagramIcon className="w-4 h-4 text-neutral-400 group-hover:text-slate-200 transition-colors" />
                  <span>Instagram</span>
                </span>
                <span className="text-[10px] text-neutral-500 group-hover:text-slate-200 flex items-center gap-1">
                  @elyasforghani.dev <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Monumental Typographic Watermark (Fluid SVG Scaler - Guaranteed No-Clip) */}
        <div className="py-12 sm:py-16 text-center w-full max-w-6xl mx-auto px-4 select-none">
          <svg
            viewBox="0 0 1600 140"
            className="w-full h-auto max-h-24 sm:max-h-32 mx-auto pointer-events-none drop-shadow-[0_0_30px_rgba(244,237,224,0.1)]"
            aria-label="ELYAS FORGHANI"
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
            <span className="text-[#ff6b5b]">+</span>
            <span className="truncate">&copy; {year} ELYAS FORGHANI &bull; ALL RIGHTS RESERVED</span>
          </div>

          <div className="hidden lg:inline text-[#c4b7a1]/70">
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
            <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
