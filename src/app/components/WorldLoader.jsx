'use client'

import React, { useEffect, useState, useRef, useSyncExternalStore } from 'react'
import { sound } from '../../utils/audio'
import { Volume2, VolumeX, ArrowRight, Compass } from 'lucide-react'
import gsap from 'gsap'

// Session-level entrance memory, read without setState-in-effect (prevents flash on refresh)
const sessionEnteredSubscribe = () => () => {}
const readSessionEntered = () =>
  typeof window !== 'undefined' && sessionStorage.getItem('elyas_world_entered') === 'true'
const sessionEnteredServer = () => false

export default function WorldLoader({ onEnter }) {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [hasEnteredNow, setHasEnteredNow] = useState(false)

  const sessionEntered = useSyncExternalStore(
    sessionEnteredSubscribe,
    readSessionEntered,
    sessionEnteredServer
  )

  const containerRef = useRef(null)
  const topCurtainRef = useRef(null)
  const bottomCurtainRef = useRef(null)
  const contentStageRef = useRef(null)
  const unlockScrollRef = useRef(null)

  const hasEntered = hasEnteredNow || sessionEntered

  useEffect(() => {
    // If already entered in this browser session, don't show and do not lock scroll
    if (readSessionEntered()) return

    // Pre-fetch & decode audio buffer in memory while preloader runs to ensure 0ms smooth playback
    sound.prefetch()

    // Lock scroll while the entrance ceremony is on stage (Lenis + native overflow)
    const unlockScroll = () => {
      window.__lenis?.start()
      document.documentElement.style.overflow = ''
    }
    window.__lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    unlockScrollRef.current = unlockScroll

    let current = 0
    const interval = setInterval(() => {
      const step = current < 60 ? Math.floor(Math.random() * 4) + 2 : Math.floor(Math.random() * 2) + 1
      current += step

      if (current >= 100) {
        current = 100
        setProgress(100)
        setIsLoaded(true)
        clearInterval(interval)
      } else {
        setProgress(current)
      }
    }, 22)

    return () => {
      clearInterval(interval)
      unlockScroll()
    }
  }, [])

  const toggleSound = (e) => {
    e.stopPropagation()
    const nextState = !soundEnabled
    setSoundEnabled(nextState)
    sound.setMuted(!nextState)
    if (nextState) {
      sound.init()
      sound.playHoverTick()
    }
  }

  const handleEnterWorld = (e) => {
    if (e) e.stopPropagation()

    sessionStorage.setItem('elyas_world_entered', 'true')

    if (soundEnabled) {
      sound.init()
      sound.setMuted(false)
      sound.startAmbient()
    } else {
      sound.setMuted(true)
    }

    // Release page scroll the moment the curtains start opening
    unlockScrollRef.current?.()

    // Disable pointer events on container during curtain exit
    if (containerRef.current) {
      containerRef.current.style.pointerEvents = 'none'
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setHasEnteredNow(true)
        if (onEnter) onEnter()
      },
    })

    // Fade out text first, then split curtains (Nesil Noble style transition)
    tl.to(contentStageRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    })

    if (topCurtainRef.current && bottomCurtainRef.current) {
      tl.to(
        [topCurtainRef.current, bottomCurtainRef.current],
        {
          scaleY: 0,
          transformOrigin: (i) => (i === 0 ? 'top center' : 'bottom center'),
          duration: 1.0,
          ease: 'power4.inOut',
          stagger: 0.04,
        },
        '-=0.15'
      )
    }

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
      },
      '-=0.25'
    )
  }

  if (hasEntered) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col justify-between overflow-hidden select-none bg-black text-white"
    >
      {/* Top Split Panel Curtain */}
      <div
        ref={topCurtainRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#060709] border-b border-white/10 z-0 will-change-transform"
      >
        <div
          className="absolute -top-32 left-1/4 w-[60vw] h-[60vw] rounded-full pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.25) 0%, rgba(246, 216, 155, 0.1) 50%, transparent 75%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* Bottom Split Panel Curtain */}
      <div
        ref={bottomCurtainRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#060709] border-t border-white/10 z-0 will-change-transform"
      >
        <div
          className="absolute -bottom-32 right-1/4 w-[60vw] h-[60vw] rounded-full pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255, 59, 212, 0.22) 0%, rgba(182, 255, 59, 0.1) 50%, transparent 75%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Nesil Noble Style Architectural Corner Reticles (+) */}
      <div className="absolute top-6 left-6 z-20 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 pointer-events-none hidden sm:flex items-center gap-1.5">
        <span className="text-slate-200">+</span>
        <span>LAT: 35.6895° N • LNG: 139.6917° E</span>
      </div>

      <div className="absolute top-6 right-6 z-20 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 pointer-events-none hidden md:flex items-center gap-1.5">
        <span className="text-cyan-300">+</span>
        <span>EDITION 2026 // SPATIAL ARCHITECTURE</span>
      </div>

      <div className="absolute bottom-6 left-6 z-20 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 pointer-events-none hidden md:flex items-center gap-1.5">
        <span className="text-pink-400">+</span>
        <span>ENGINE: NEXT.JS 16 • THREE.JS • REDIS</span>
      </div>

      <div className="absolute bottom-6 right-6 z-20 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 pointer-events-none hidden sm:flex items-center gap-1.5">
        <span className="text-emerald-400">+</span>
        <span>STATUS: {isLoaded ? 'AWAITING USER ENTRANCE' : 'SYNCHRONIZING BUFFERS'}</span>
      </div>

      {/* Central Interactive Stage */}
      <div
        ref={contentStageRef}
        className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-14 max-w-4xl mx-auto w-full my-auto text-center"
      >
        {/* Top Minimalist Studio Header */}
        <div className="pt-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Nesil Noble Inspired Ceremony</span>
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">
            ELYAS FORGHANI &bull; SPATIAL REALM
          </span>
        </div>

        {/* Central Stage: Loading or Gate */}
        <div className="flex flex-col items-center justify-center my-auto py-8">
          <h1 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-2 leading-tight break-words max-w-full">
            Architectural Logic
          </h1>

          <p className="font-subtitle text-2xl sm:text-4xl md:text-5xl text-slate-400 mb-8 lowercase break-words max-w-full">
            crafted in perpetual motion
          </p>

          {!isLoaded ? (
            /* Progress state */
            <div className="flex flex-col items-center w-full max-w-sm">
              <div className="font-syne font-black text-7xl sm:text-8xl tracking-tighter chromatic-text tabular-nums mb-4">
                {progress < 10 ? `0${progress}` : progress}%
              </div>

              {/* Minimalist gauge bar */}
              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-slate-200 to-pink-500 transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 animate-pulse">
                Calibrating WebGL Constellation &amp; Redis Nodes...
              </span>
            </div>
          ) : (
            /* Loaded state - Awaits User Input like nesilnoble.com */
            <div className="flex flex-col items-center w-full max-w-md animate-in fade-in duration-500">
              {/* Sound preference selector (Nesil Noble signature) */}
              <div className="flex items-center gap-3 p-2 px-4 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-8">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Audio Experience:
                </span>
                <button
                  type="button"
                  onClick={toggleSound}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    soundEnabled
                      ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(226,232,240,0.4)]'
                      : 'bg-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Sound On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                      <span>Muted</span>
                    </>
                  )}
                </button>
              </div>

              {/* Main Entrance Button (Does NOT open without asking!) */}
              <button
                type="button"
                onClick={handleEnterWorld}
                onMouseEnter={() => sound.playHoverTick()}
                className="group relative px-10 py-5 rounded-full bg-white text-black font-syne font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all duration-300 transform hover:scale-105 shadow-[0_0_50px_rgba(226,232,240,0.45)] flex items-center gap-3 cursor-pointer"
              >
                <span>ENTER THE EXPERIENCE</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>

              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mt-5">
                [ BEST EXPERIENCED WITH HEADPHONES &bull; CLICK TO ENTER ]
              </span>
            </div>
          )}
        </div>

        {/* Footer credits row */}
        <div className="pb-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-400 border-t border-white/10 pt-4">
          <span className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Ceremony Engine</span>
          </span>
          <span className="hidden sm:inline">Chemical Eng. Rigor &bull; Spatial Frontends</span>
        </div>
      </div>
    </div>
  )
}
