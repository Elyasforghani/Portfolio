'use client'

import React from 'react'
import { Command, Terminal } from 'lucide-react'
import { sound } from '../../utils/audio'

export default function HUDDock() {
  const handleOpenTeleport = () => {
    sound.playClick()
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-command-palette'))
    }
  }

  const handleOpenTerminal = () => {
    sound.playClick()
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-dev-terminal'))
    }
  }

  return (
    <div
      role="toolbar"
      aria-label="Developer and navigation HUD controls"
      className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 select-none pointer-events-auto"
    >
      {/* Teleport Button */}
      <button
        type="button"
        onClick={handleOpenTeleport}
        data-cursor="TELEPORT"
        aria-label="Open Command Teleport"
        aria-keyshortcuts="Meta+K Control+K"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 hover:border-slate-300/60 text-neutral-300 hover:text-white transition-all duration-300 text-xs font-mono shadow-2xl cursor-pointer group hover:scale-102"
      >
        <Command className="w-3.5 h-3.5 text-slate-300 group-hover:rotate-45 transition-transform duration-300" />
        <span>Teleport</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-neutral-300 border border-white/10 font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Dev CLI Button */}
      <button
        type="button"
        onClick={handleOpenTerminal}
        data-cursor="CLI"
        aria-label="Open Developer CLI"
        aria-keyshortcuts="` ~"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 hover:border-cyan-400/60 text-neutral-300 hover:text-white transition-all duration-300 text-xs font-mono shadow-2xl cursor-pointer group hover:scale-102"
      >
        <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
        <span>Dev CLI</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-neutral-300 border border-white/10 font-mono">
          ~
        </kbd>
      </button>
    </div>
  )
}
