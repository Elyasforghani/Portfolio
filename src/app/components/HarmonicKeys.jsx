'use client'

import React, { useState, useEffect } from 'react'
import { sound } from '../../utils/audio'
import { Music, Radio } from 'lucide-react'

const NOTES = [
  { key: '1', note: 'C4', freq: '261Hz' },
  { key: '2', note: 'D4', freq: '293Hz' },
  { key: '3', note: 'E4', freq: '329Hz' },
  { key: '4', note: 'G4', freq: '392Hz' },
  { key: '5', note: 'A4', freq: '440Hz' },
  { key: '6', note: 'C5', freq: '523Hz' },
  { key: '7', note: 'D5', freq: '587Hz' },
  { key: '8', note: 'E5', freq: '659Hz' },
]

export default function HarmonicKeys() {
  const [activeKey, setActiveKey] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      // If typing in input, don't trigger musical keys
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return

      const num = parseInt(e.key, 10)
      if (num >= 1 && num <= 8) {
        e.preventDefault()
        const idx = num - 1
        sound.playPentatonicNote(idx)
        setActiveKey(e.key)
        setTimeout(() => setActiveKey(null), 250)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const triggerNote = (idx, keyStr) => {
    sound.playPentatonicNote(idx)
    setActiveKey(keyStr)
    setTimeout(() => setActiveKey(null), 250)
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden xl:flex items-center gap-1 select-none pointer-events-auto">
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-2xl">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          data-cursor="SYNTH"
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 hover:text-slate-200 transition-colors pr-1 cursor-pointer"
          title="Toggle Pentatonic Chimes"
        >
          <Music className="w-3 h-3 text-slate-200" />
          <span className="hidden lg:inline">Chimes:</span>
        </button>

        {/* 8 Pentatonic note pills */}
        <div className="flex items-center gap-1">
          {NOTES.map((n, i) => {
            const isPlaying = activeKey === n.key

            return (
              <button
                key={n.key}
                type="button"
                onClick={() => triggerNote(i, n.key)}
                className={`w-6 h-6 rounded-full text-[10px] font-mono font-bold flex items-center justify-center transition-all duration-150 cursor-pointer ${
                  isPlaying
                    ? 'scale-125 bg-white text-black shadow-[0_0_15px_rgba(226,232,240,0.8)]'
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/15 hover:border-slate-300/40'
                }`}
                title={`Play ${n.note} (${n.freq}) or press key ${n.key}`}
              >
                {n.key}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
