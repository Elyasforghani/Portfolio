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
  const mobileDialogRef = useRef(null)

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

  // Sync native top-layer mobile dialog state and pause Lenis wheel capture
  useEffect(() => {
    const dialog = mobileDialogRef.current
    if (!dialog) return

    if (mobileMenuOpen) {
      if (!dialog.open) dialog.showModal()
      window.__lenis?.stop()
    } else {
      if (dialog.open) dialog.close()
      window.__lenis?.start()
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
      <a href="#main-content" className="visually-hidden skip-link">
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-10 py-4 flex items-center justify-between pointer-events-none transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Left: Signature Brand Mark */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#ff6b5b] border border-[#f4ede0]/20 shadow-xl shrink-0">
          <Link
            href="/"
            data-cursor="HOME"
            className="group flex items-center gap-2 text-[#14213d] hover:text-[#0c1527] transition-colors shrink-0"
          >
            <span className="font-syne font-black tracking-tight text-sm sm:text-base whitespace-nowrap">
              ELYAS
            </span>
          </Link>
        </div>

        {/* Center: Primary Navigation */}
        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden md:flex items-center px-2.5 py-1.5 rounded-full bg-[#0c1527]/85 backdrop-blur-xl border border-[#f4ede0]/15 text-xs font-mono uppercase tracking-wider shadow-2xl"
        >
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    data-cursor="NAV"
                    className={`inline-flex items-center px-4 py-1.5 rounded-full transition-all duration-300 font-medium ${
                      isActive
                        ? 'bg-[#ff6b5b] text-[#14213d] font-bold shadow-md underline decoration-[#14213d]/60 decoration-2 underline-offset-4'
                        : 'text-[#f4ede0]/80 hover:text-[#f4ede0] hover:bg-[#f4ede0]/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right: Ambient Controls & Contact CTA */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="sm:flex items-center px-3 py-1.5 rounded-full bg-[#0c1527]/80 backdrop-blur-xl border border-[#f4ede0]/15 shadow-xl">
            <SoundController />
          </div>

          <a
            href="mailto:elyasfgidev@gmail.com"
            data-cursor="CONTACT"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase font-syne font-bold tracking-wider px-4 py-2 rounded-full border border-[#ff6b5b]/40 bg-[#ff6b5b] text-[#14213d] hover:bg-[#ff8577] transition-all duration-300 shadow-lg transform hover:scale-105 shrink-0"
          >
            <span>Let&apos;s Talk</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick()
              setMobileMenuOpen((prev) => !prev)
            }}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="md:hidden min-w-11 min-h-11 inline-flex items-center justify-center p-2.5 rounded-full bg-[#0c1527]/85 backdrop-blur-md border border-[#f4ede0]/20 text-[#f4ede0] hover:text-[#ff6b5b] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Native Modal Mobile Navigation Drawer */}
      <dialog
        ref={mobileDialogRef}
        id="mobile-nav-drawer"
        aria-labelledby="mobile-nav-title"
        closedby="any"
        onClose={() => setMobileMenuOpen(false)}
        className="md:hidden m-0 p-0 max-w-none max-h-none w-full h-dvh bg-[#0c1527]/95 backdrop-blur-2xl text-[#f4ede0] border-0"
      >
        <div className="flex flex-col justify-between min-h-dvh p-6 sm:p-8 pt-6 overflow-y-auto">
          {/* Top Bar with brand mark and explicit close button */}
          <div className="flex items-center justify-between pb-6 border-b border-[#f4ede0]/10">
            <span id="mobile-nav-title" className="font-syne font-black text-lg text-[#f4ede0]">
              ELYAS
            </span>
            <button
              type="button"
              onClick={() => {
                sound.playClick()
                setMobileMenuOpen(false)
              }}
              aria-label="Close navigation menu"
              className="min-w-11 min-h-11 inline-flex items-center justify-center p-2.5 rounded-full bg-[#14213d] border border-[#f4ede0]/15 text-[#f4ede0] hover:text-[#ff6b5b] hover:border-[#ff6b5b]/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Nav Links */}
          <nav aria-label="Mobile" className="py-8">
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              {navLinks.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={handleMobileNav}
                      className={`text-2xl sm:text-3xl font-syne font-black uppercase tracking-tight py-2.5 border-b border-[#f4ede0]/10 flex items-center justify-between ${
                        isActive
                          ? 'text-[#ff6b5b] border-l-2 border-l-[#ff6b5b] pl-3'
                          : 'text-[#f4ede0]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#c4b7a1]" aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Mobile Tools & Channels */}
          <div className="space-y-4 pt-6 border-t border-[#f4ede0]/15">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openTeleportFromMobile}
                className="flex-1 min-h-11 py-2.5 px-3 rounded-full bg-[#14213d] border border-[#f4ede0]/15 text-[#f4ede0] text-xs font-mono flex items-center justify-center gap-1.5 hover:border-[#ff6b5b]/50"
              >
                <Command className="w-3.5 h-3.5 text-[#ff6b5b]" aria-hidden="true" />
                <span>Teleport</span>
              </button>
              <button
                type="button"
                onClick={openTerminalFromMobile}
                className="flex-1 min-h-11 py-2.5 px-3 rounded-full bg-[#14213d] border border-[#f4ede0]/15 text-[#f4ede0] text-xs font-mono flex items-center justify-center gap-1.5 hover:border-[#ff6b5b]/50"
              >
                <Terminal className="w-3.5 h-3.5 text-[#ff6b5b]" aria-hidden="true" />
                <span>Dev CLI</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-[#f4ede0]/85">
              <a
                href="https://github.com/Elyasforghani"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 py-2 hover:text-[#ff6b5b]"
              >
                GitHub <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
              <span aria-hidden="true">•</span>
              <a
                href="https://www.linkedin.com/in/elyas-forghani-b4746b263/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 py-2 hover:text-[#ff6b5b]"
              >
                LinkedIn <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
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
      </dialog>
    </>
  )
}
