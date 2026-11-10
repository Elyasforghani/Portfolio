'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { sound } from '../../utils/audio'
import { Search, Command, X, Terminal, ArrowRight } from 'lucide-react'
import { PROJECTS } from '../../data/projects'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()
  const listRef = useRef(null)

  const actions = [
    { label: 'Overview [Home]', href: '/', type: 'Navigation' },
    { label: 'Real Samples & Repositories', href: '/works', type: 'Navigation' },
    { label: 'About & Trajectory', href: '/about', type: 'Navigation' },
    { label: 'Motion & Shader Lab', href: '/lab', type: 'Navigation' },
    { label: 'Flagship: GPM Studio E-Commerce Store', external: 'https://gpm-studio.com', type: 'Live Production' },
    { label: 'Research: ZnO / Y-Zeolite Photocatalysis (Civilica)', external: 'https://civilica.com/doc/1949705/', type: 'Published Paper' },
    { label: 'Jump: Work & Story Bento', href: '/#bento', type: 'Section' },
    { label: 'Jump: Engineering Philosophy', href: '/#philosophy', type: 'Section' },
    { label: 'Jump: Core Capabilities Deck', href: '/about#capabilities', type: 'Section' },
    { label: 'Developer CLI Drawer (~)', action: 'cli', type: 'System Tool' },
    ...PROJECTS.map((p) => ({
      label: `Project: ${p.title}`,
      href: `/works/${p.slug}`,
      type: p.category,
    })),
  ]

  const filtered = query
    ? actions.filter(
        (a) =>
          a.label.toLowerCase().includes(query.toLowerCase()) ||
          a.type.toLowerCase().includes(query.toLowerCase())
      )
    : actions

  // Keep the active option in view during keyboard navigation
  useEffect(() => {
    const node = listRef.current?.children?.[activeIndex]
    node?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const closePalette = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const handleSelect = useCallback((item) => {
    sound.playClick()
    closePalette()
    if (item.action === 'cli') {
      window.dispatchEvent(new CustomEvent('open-dev-terminal'))
    } else if (item.external) {
      window.open(item.external, '_blank', 'noopener,noreferrer')
    } else if (item.href) {
      router.push(item.href)
    }
  }, [closePalette, router])

  const openPalette = useCallback(() => {
    setIsOpen(true)
    setActiveIndex(0)
    sound.playClick()
  }, [])

  // Listen to global open event
  useEffect(() => {
    const handleOpen = () => openPalette()
    window.addEventListener('open-command-palette', handleOpen)
    return () => window.removeEventListener('open-command-palette', handleOpen)
  }, [openPalette])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => {
          const next = !prev
          if (next) {
            setActiveIndex(0)
          }
          sound.playClick()
          return next
        })
        return
      }

      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        closePalette()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        sound.playHoverTick()
        setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        sound.playHoverTick()
        setActiveIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
        )
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault()
        handleSelect(filtered[activeIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filtered, activeIndex, closePalette, handleSelect])

  // Freeze page scroll while the palette is open
  useEffect(() => {
    if (!isOpen) return
    window.__lenis?.stop()
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.__lenis?.start()
      document.documentElement.style.overflow = prevOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[10001] bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200"
      onClick={closePalette}
      role="dialog"
      aria-modal="true"
      aria-label="Command teleport"
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-neutral-900 border border-white/20 shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-black/40">
          <Search className="w-4 h-4 text-slate-300 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
            placeholder="Teleport to any project, architecture layer, or route..."
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
          />
          <button
            type="button"
            onClick={closePalette}
            aria-label="Close command palette"
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5 font-mono text-xs"
        >
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-neutral-500 flex flex-col items-center gap-2">
              <Terminal className="w-6 h-6 text-neutral-600" />
              <span>No destinations matching &quot;{query}&quot;</span>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={(item.href || item.label) + idx}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => {
                    setActiveIndex(idx)
                    sound.playHoverTick()
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/10 border border-white/30 text-white font-semibold'
                      : 'text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {item.type}
                    </span>
                    {isActive && <ArrowRight className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Teleport Footer Telemetry */}
        <div className="px-5 py-2.5 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span className="flex items-center gap-2">
            <span>[↑↓] Navigate</span>
            <span>•</span>
            <span>[↵] Teleport</span>
            <span>•</span>
            <span>[ESC] Dismiss</span>
          </span>
          <span className="text-slate-300">{filtered.length} targets</span>
        </div>
      </div>
    </div>
  )
}
