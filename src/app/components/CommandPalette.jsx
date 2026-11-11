'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { sound } from '../../utils/audio'
import { Search, X, Terminal, ArrowRight } from 'lucide-react'
import { PROJECTS } from '../../data/projects'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()
  const listRef = useRef(null)
  const dialogRef = useRef(null)
  const backdropPress = useRef(false)

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

      if (e.key === 'ArrowDown') {
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
  }, [isOpen, filtered, activeIndex, handleSelect])

  // Sync native top-layer modal dialog state and pause Lenis wheel capture
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
      window.__lenis?.stop()
    } else {
      if (dialog.open) dialog.close()
      window.__lenis?.start()
    }
  }, [isOpen])

  const isOutsideRect = (e) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return false
    return (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    )
  }

  const handlePointerDown = (e) => {
    backdropPress.current = isOutsideRect(e)
  }

  const handlePointerUp = (e) => {
    if (backdropPress.current && isOutsideRect(e)) {
      closePalette()
    }
    backdropPress.current = false
  }

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-label="Command teleport"
      onClose={closePalette}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="m-0 mx-auto mt-20 sm:mt-24 w-[calc(100%-2rem)] max-w-xl rounded-2xl bg-[#0f1a30] text-[#f4ede0] border border-[#f4ede0]/20 shadow-2xl p-0 overflow-hidden"
    >
      <div className="flex flex-col w-full">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f4ede0]/10 bg-[#0c1527]">
          <Search className="w-4 h-4 text-[#ff6b5b] shrink-0" aria-hidden="true" />
          <label htmlFor="command-palette-search" className="visually-hidden">
            Search site navigation and projects
          </label>
          <input
            id="command-palette-search"
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
            placeholder="Teleport to any project, architecture layer, or route..."
            className="w-full bg-transparent text-sm text-[#f4ede0] placeholder:text-[#c4b7a1]/70 font-mono"
          />
          <button
            type="button"
            onClick={closePalette}
            aria-label="Close command palette"
            className="min-w-10 min-h-10 inline-flex items-center justify-center p-2 rounded-full text-[#c4b7a1] hover:text-[#f4ede0] hover:bg-[#14213d] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-80 overflow-y-auto p-2 divide-y divide-[#f4ede0]/10 font-mono text-xs"
        >
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-[#c4b7a1] flex flex-col items-center gap-2">
              <Terminal className="w-6 h-6 text-[#ff6b5b]" aria-hidden="true" />
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
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#ff6b5b]/15 border border-[#ff6b5b]/50 text-[#f4ede0] font-semibold'
                      : 'text-[#c4b7a1] hover:text-[#f4ede0] hover:bg-[#14213d]/70'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span
                      aria-hidden="true"
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isActive ? 'bg-[#ff6b5b]' : 'bg-[#f4ede0]/50'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs uppercase tracking-wider text-[#c4b7a1] px-2 py-0.5 rounded bg-[#0c1527] border border-[#f4ede0]/15">
                      {item.type}
                    </span>
                    {isActive && <ArrowRight className="w-3.5 h-3.5 text-[#ff6b5b]" aria-hidden="true" />}
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Teleport Footer Telemetry */}
        <div className="px-5 py-2.5 bg-[#0c1527] border-t border-[#f4ede0]/10 flex items-center justify-between text-xs font-mono text-[#c4b7a1]">
          <span className="flex items-center gap-2">
            <span>[↑↓] Navigate</span>
            <span aria-hidden="true">•</span>
            <span>[↵] Teleport</span>
            <span aria-hidden="true">•</span>
            <span>[ESC] Dismiss</span>
          </span>
          <span className="text-[#ff8577]">{filtered.length} targets</span>
        </div>
      </div>
    </dialog>
  )
}
