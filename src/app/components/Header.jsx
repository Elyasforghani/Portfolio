'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SoundController from './SoundController'
import { Menu, X, ArrowUpRight, Command, Terminal } from 'lucide-react'
import { sound } from '../../utils/audio'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  // Smart scroll: hide header on scroll down and auto-hide when reaching the footer to prevent collisions
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      // Auto-hide completely when near footer to prevent visual collision
      if (currentScrollY + winHeight >= docHeight - 420) {
        setVisible(false)
        return
      }

      if (currentScrollY < 60) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY.current + 8) {
        setVisible(false)
      } else if (currentScrollY < lastScrollY.current - 8) {
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/works', label: 'Works' },
    { href: '/about', label: 'About' },
    { href: '/lab', label: 'Lab' },
  ]

  const handleMobileNav = () => {
    sound.playClick()
    setMobileMenuOpen(false)
  }

  // Escape key closes the mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileMenuOpen])

  // Freeze background page scroll while mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return
    window.__lenis?.stop()
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.__lenis?.start()
      document.documentElement.style.overflow = prevOverflow
    }
  }, [mobileMenuOpen])

  const openTeleportFromMobile = () => {
    setMobileMenuOpen(false)
    sound.playClick()
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-command-palette'))
    }, 150)
  }

  const openTerminalFromMobile = () => {
    setMobileMenuOpen(false)
    sound.playClick()
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-dev-terminal'))
    }, 150)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-10 py-4 flex items-center justify-between pointer-events-none transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Left: Clean Signature Brand Mark in Glass Capsule */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0c1527]/80 backdrop-blur-xl border border-[#f4ede0]/15 shadow-xl shrink-0">
          <Link
            href="/"
            data-cursor="HOME"
            className="group flex items-center gap-2 text-[#f4ede0] hover:text-[#ff6b5b] transition-colors shrink-0"
          >
            <span className="font-syne font-black tracking-tight text-sm sm:text-base whitespace-nowrap">
              ELYAS FORGHANI
            </span>
            <span className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ff6b5b]/10 border border-[#ff6b5b]/25 text-[10px] font-mono tracking-wider text-[#ff6b5b] uppercase shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b5b] animate-pulse" />
              <span>Available</span>
            </span>
          </Link>
        </div>

        {/* Center: Minimalist Floating Capsule Nav */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#0c1527]/80 backdrop-blur-xl border border-[#f4ede0]/15 text-xs font-mono uppercase tracking-wider shadow-2xl">
          {navLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="NAV"
                className={`px-4 py-1.5 rounded-full transition-all duration-300 font-medium ${
                  isActive
                    ? 'bg-[#ff6b5b] text-[#14213d] font-bold shadow-md'
                    : 'text-[#f4ede0]/70 hover:text-[#f4ede0] hover:bg-[#f4ede0]/10'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: Ambient Controls & Contact CTA */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-[#0c1527]/80 backdrop-blur-xl border border-[#f4ede0]/15 shadow-xl">
            <SoundController />
          </div>

          <a
            href="mailto:elyasfgidev@gmail.com"
            data-cursor="CONTACT"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase font-syne font-bold tracking-wider px-4 py-2 rounded-full border border-[#ff6b5b]/40 bg-[#ff6b5b] text-[#14213d] hover:bg-[#ff8577] transition-all duration-300 shadow-lg transform hover:scale-105 shrink-0"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick()
              setMobileMenuOpen((prev) => !prev)
            }}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:text-slate-300 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[10001] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 pt-6 md:hidden animate-in fade-in duration-200 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Top Bar with brand mark and explicit close button */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10" onClick={(e) => e.stopPropagation()}>
            <span className="font-syne font-black text-lg text-white">ELYAS FORGHANI</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick()
                setMobileMenuOpen(false)
              }}
              aria-label="Close navigation menu"
              className="p-2 rounded-full bg-white/10 text-white hover:text-slate-300 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-4 py-8" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-2">
              NAVIGATION DIRECTORY
            </span>
            {navLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleMobileNav}
                  className={`text-2xl sm:text-3xl font-syne font-black uppercase tracking-tight py-2 border-b border-[#f4ede0]/10 flex items-center justify-between ${
                    isActive ? 'text-[#ff6b5b]' : 'text-[#f4ede0]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#c4b7a1]" />
                </Link>
              )
            })}
          </nav>

          {/* Mobile Tools & Channels */}
          <div className="space-y-4 pt-6 border-t border-[#f4ede0]/15" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openTeleportFromMobile}
                className="flex-1 py-2 px-3 rounded-full bg-white/5 border border-[#f4ede0]/15 text-[#f4ede0] text-xs font-mono flex items-center justify-center gap-1.5 hover:bg-white/10"
              >
                <Command className="w-3.5 h-3.5 text-[#ff6b5b]" />
                <span>Teleport</span>
              </button>
              <button
                type="button"
                onClick={openTerminalFromMobile}
                className="flex-1 py-2 px-3 rounded-full bg-white/5 border border-[#f4ede0]/15 text-[#f4ede0] text-xs font-mono flex items-center justify-center gap-1.5 hover:bg-white/10"
              >
                <Terminal className="w-3.5 h-3.5 text-[#ff6b5b]" />
                <span>Dev CLI</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-[#f4ede0]/80">
              <a
                href="https://github.com/Elyasforghani"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[#ff6b5b]"
              >
                GitHub <ArrowUpRight className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/elyas-forghani-b4746b263/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[#ff6b5b]"
              >
                LinkedIn <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <a
              href="mailto:elyasfgidev@gmail.com"
              onClick={handleMobileNav}
              className="block w-full text-center py-3.5 rounded-full bg-[#ff6b5b] text-[#14213d] font-syne font-bold text-xs uppercase tracking-widest hover:bg-[#ff8577] transition-colors"
            >
              Initiate Contact →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
