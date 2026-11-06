'use client'

import React, { useState } from 'react'
import { Activity, Terminal, Cpu, Database, Box, Zap, Heart } from 'lucide-react'
import { sound } from '../../utils/audio'

const BADGES = [
  { label: 'Chemical Eng. Precision', icon: Activity, color: 'text-slate-200 border-slate-300/30' },
  { label: 'Next.js 16 + React 19', icon: Cpu, color: 'text-cyan-300 border-cyan-400/30' },
  { label: 'Docker Containerized', icon: Box, color: 'text-sky-300 border-sky-400/30' },
  { label: 'PostgreSQL + Prisma ORM', icon: Database, color: 'text-emerald-300 border-emerald-400/30' },
  { label: 'Redis Cache < 1ms', icon: Zap, color: 'text-rose-300 border-rose-400/30' },
  { label: 'Three.js Spatial WebGL', icon: Terminal, color: 'text-purple-300 border-purple-400/30' },
  { label: '100% Handcrafted Code', icon: Heart, color: 'text-pink-300 border-pink-400/30' },
]

export default function TactileBadges() {
  const [activeBadge, setActiveBadge] = useState(null)

  const handleBadgeClick = (idx) => {
    sound.playClick()
    setActiveBadge(idx)
    setTimeout(() => setActiveBadge(null), 1800)
  }

  return (
    <div className="py-12 border-y border-white/10 bg-black/40 backdrop-blur-md overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PLAYGROUND RADAR • TACTILE NODES</span>
          </span>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:inline">
            Hover or tap to activate node
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
          {BADGES.map((b, i) => {
            const Icon = b.icon
            const isSelected = activeBadge === i

            return (
              <button
                key={b.label}
                type="button"
                data-cursor="TICK"
                onClick={() => handleBadgeClick(i)}
                onMouseEnter={() => sound.playHoverTick()}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer border glass-holographic ${
                  isSelected
                    ? 'scale-105 bg-white text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                    : 'text-neutral-200 hover:text-white hover:border-white/40 hover:scale-105'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-transform group-hover:rotate-12 ${isSelected ? 'text-black' : b.color}`} />
                <span>{b.label}</span>
                {isSelected && (
                  <span className="text-[10px] text-emerald-600 font-bold ml-1">✓ Synced</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
