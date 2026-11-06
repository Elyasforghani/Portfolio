'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { sound } from '../../utils/audio'
import { Trophy, X } from 'lucide-react'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export default function KonamiEasterEgg() {
  const [keys, setKeys] = useState([])
  const [isUnlocked, setIsUnlocked] = useState(false)

  const triggerEasterEgg = useCallback(() => {
    setIsUnlocked(true)
    sound.init()
    sound.playCelebrationChime()

    // Spawn 35 colorful confetti elements
    for (let i = 0; i < 35; i++) {
      const el = document.createElement('div')
      el.className = 'fixed pointer-events-none z-[10003] w-2.5 h-2.5 rounded-full'
      const colors = ['#00e5ff', '#f6d89b', '#ff3bd4', '#b6ff3b', '#ffffff']
      el.style.backgroundColor = colors[i % colors.length]
      el.style.left = `${50 + (Math.random() - 0.5) * 80}vw`
      el.style.top = `${50 + (Math.random() - 0.5) * 60}vh`
      document.body.appendChild(el)

      const startX = 0
      const startY = 0
      const endX = (Math.random() - 0.5) * 600
      const endY = (Math.random() - 0.5) * 600 - 150
      const startTime = performance.now()
      const duration = 1200 + Math.random() * 600

      const animate = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)

        const curX = startX + endX * ease
        const curY = startY + endY * ease + progress * 200
        const opacity = 1 - progress

        el.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(${1 - progress * 0.5})`
        el.style.opacity = `${opacity}`

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          el.remove()
        }
      }

      requestAnimationFrame(animate)
    }

    setTimeout(() => {
      setIsUnlocked(false)
    }, 5500)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key

      setKeys((prev) => {
        const next = [...prev, key].slice(-KONAMI_CODE.length)
        const isMatch = KONAMI_CODE.every(
          (k, idx) => k.toLowerCase() === next[idx]?.toLowerCase()
        )

        if (isMatch) {
          triggerEasterEgg()
          return []
        }
        return next
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [triggerEasterEgg])

  if (!isUnlocked) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Konami Code Secret Discovered"
      className="fixed inset-0 z-[10002] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
    >
      <div className="relative max-w-md w-full p-8 rounded-3xl glass-holographic text-center border border-slate-300/40 shadow-2xl">
        <button
          type="button"
          onClick={() => setIsUnlocked(false)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 border border-slate-300/30 flex items-center justify-center text-slate-200 shadow-lg">
          <Trophy className="w-8 h-8 animate-bounce" />
        </div>

        <span className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 block mb-2">
          SECRET DISCOVERED
        </span>

        <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-white mb-3">
          Konami Code Master
        </h3>

        <p className="text-sm font-sans text-neutral-300 font-light leading-relaxed mb-6">
          You unlocked the celestial frequency. Enjoy the dimensional spatial journey through Elyas Forghani&apos;s digital realm.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-mono text-neutral-400 bg-white/5 py-2 px-4 rounded-full border border-white/10">
          <Trophy className="w-3.5 h-3.5 text-slate-200" />
          <span>Status: Level 99 Full-Stack Dimension Unlocked</span>
        </div>
      </div>
    </div>
  )
}
