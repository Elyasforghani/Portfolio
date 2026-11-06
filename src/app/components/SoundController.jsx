'use client'

import React, { useEffect, useRef, useState } from 'react'
import { sound } from '../../utils/audio'

export default function SoundController() {
  const [isPlaying, setIsPlaying] = useState(() => (typeof sound !== 'undefined' ? Boolean(sound.isPlaying) : false))
  const barsRef = useRef([null, null, null])
  const animFrameRef = useRef(null)

  const startVisualizer = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    const dataArray = new Uint8Array(32)

    const loop = () => {
      sound.getFrequencyData(dataArray)

      const low = (dataArray[2] || 0) / 255
      const mid = (dataArray[6] || 0) / 255
      const high = (dataArray[12] || 0) / 255

      if (barsRef.current[0]) barsRef.current[0].style.height = `${Math.max(4, low * 14)}px`
      if (barsRef.current[1]) barsRef.current[1].style.height = `${Math.max(4, mid * 14)}px`
      if (barsRef.current[2]) barsRef.current[2].style.height = `${Math.max(4, high * 14)}px`

      animFrameRef.current = requestAnimationFrame(loop)
    }

    loop()
  }

  useEffect(() => {
    // Listen to global sound state change events dispatched by SoundEngine
    const handleSoundState = (e) => {
      const playing = Boolean(e?.detail?.isPlaying)
      setIsPlaying(playing)
      if (playing) {
        startVisualizer()
      } else {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        barsRef.current.forEach((b) => {
          if (b) b.style.height = '4px'
        })
      }
    }

    window.addEventListener('sound-state-change', handleSoundState)

    // Check initial state
    if (sound.isPlaying) {
      startVisualizer()
    }

    return () => {
      window.removeEventListener('sound-state-change', handleSoundState)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  const toggleSound = (e) => {
    if (e) e.stopPropagation()
    sound.init()
    const nowPlaying = sound.toggleSound()
    setIsPlaying(nowPlaying)
    if (nowPlaying) {
      startVisualizer()
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      barsRef.current.forEach((b) => {
        if (b) b.style.height = '4px'
      })
    }
  }

  return (
    <button
      onClick={toggleSound}
      type="button"
      data-cursor={isPlaying ? 'MUTE' : 'UNMUTE'}
      aria-label={isPlaying ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#f4ede0]/15 hover:border-[#ff6b5b]/60 bg-[#0c1527]/80 backdrop-blur-md transition-all duration-300 text-xs font-mono uppercase tracking-wider text-[#f4ede0] hover:text-[#ff6b5b] cursor-pointer shadow-lg"
    >
      {/* Real-time frequency bars */}
      <span className="flex items-end gap-[2px] h-3.5 w-3.5 justify-center">
        <span
          ref={(el) => (barsRef.current[0] = el)}
          className="w-[2.5px] bg-[#ff6b5b] rounded-full transition-[height] duration-75"
          style={{ height: isPlaying ? '8px' : '4px' }}
        />
        <span
          ref={(el) => (barsRef.current[1] = el)}
          className="w-[2.5px] bg-[#ff8577] rounded-full transition-[height] duration-75"
          style={{ height: isPlaying ? '12px' : '4px' }}
        />
        <span
          ref={(el) => (barsRef.current[2] = el)}
          className="w-[2.5px] bg-[#f4ede0] rounded-full transition-[height] duration-75"
          style={{ height: isPlaying ? '6px' : '4px' }}
        />
      </span>

      <span className="hidden sm:inline font-mono text-[11px]">
        {isPlaying ? 'Sound [ON]' : 'Sound [OFF]'}
      </span>
    </button>
  )
}
