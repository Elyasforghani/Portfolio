'use client'

import React, { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            const currentProgress = (window.scrollY / totalHeight) * 100
            setScrollProgress(Math.min(Math.max(currentProgress, 0), 100))
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[9990] pointer-events-none bg-white/5"
    >
      <div
        className="h-full bg-gradient-to-r from-[#ff6b5b] via-[#ff8577] to-[#f4ede0] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(255,107,91,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}
