'use client'

import React, { useState, useEffect, useRef } from 'react'
import { sound } from '../../utils/audio'
import { Terminal, X, CornerDownLeft, Check, Play } from 'lucide-react'

const COMMANDS = {
  help: `Available commands:
  • bio         : who I am, the short version
  • stack       : what this site runs on
  • projects    : the real repos & client work
  • github      : open my GitHub profile
  • contact     : how to reach me
  • matrix      : toggle CRT matrix rain overlay
  • clear       : clear console output
  • exit        : close the terminal`,

  bio: `Elyas Forghani
B.Sc. Chemical Engineering, University of Kurdistan.
Front-end & creative developer — Next.js, TypeScript, Three.js, GSAP.
Previously: control-room operator at Ava Nama Noor.
Currently: building the GPM Studio storefront (gpm-studio.com).`,

  stack: `THIS SITE, HONESTLY:
[Core]     : Next.js 16 (App Router), React 19, TypeScript
[3D/Motion]: Three.js particle field, GSAP ScrollTrigger, Lenis
[Sound]    : Web Audio API ambient loop (mute toggle in header)
[Styling]  : Tailwind CSS v4 — no UI kit, all hand-rolled
[Source]   : github.com/Elyasforghani/Parallax-Portfolio`,

  projects: `REAL WORK, ALL VERIFIABLE ON GITHUB:
01. GPM Studio storefront        (client, gpm-studio.com)
02. User Management Dashboard    (Next.js, MockAPI)
03. This portfolio               (Next.js, Three.js, GSAP)
04. Like & Dislike Feed          (Next.js)
05. Cities Explorer EN/FA        (Next.js, i18n)
06. Password Strength Checker    (JS, RegEx)
07. Weather Forecast App         (JS, Weather API)
08. Hotel Abbasi Showcase        (Tailwind, Swiper)
09. Dice Game                    (vanilla JS)`,
  github: `Opening github.com/Elyasforghani ...`,
  contact: `Email : elyasfgidev@gmail.com
GitHub: github.com/Elyasforghani
LinkedIn / Instagram: links in the footer`,
  matrix: 'MATRIX_TOGGLE',
}

export default function DevTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([
    { text: 'elyas@portfolio — Next.js 16 • Three.js • GSAP • type help', type: 'system' },
    { text: 'Type "help" to see available commands or click the chips below.', type: 'info' },
  ])
  const [isMatrixMode, setIsMatrixMode] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Listen to global open event from HUDDock and shortcuts
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      sound.playClick()
    }
    window.addEventListener('open-dev-terminal', handleOpen)
    return () => window.removeEventListener('open-dev-terminal', handleOpen)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle with backtick (`) or Tilde
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault()
        sound.playClick()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Freeze page scroll while terminal is open
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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const runCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase()
    sound.playClick()

    if (!cmd) return

    if (cmd === 'clear') {
      setHistory([])
      setInputVal('')
      return
    }

    if (cmd === 'exit') {
      setIsOpen(false)
      setInputVal('')
      return
    }

    const output = COMMANDS[cmd] || `command not found: "${cmd}". Type "help" for valid commands.`

    if (output === 'MATRIX_TOGGLE') {
      setIsMatrixMode((prev) => !prev)
      setHistory((prev) => [
        ...prev,
        { text: `$ ${cmdStr}`, type: 'input' },
        { text: '✓ Matrix rain mode toggled.', type: 'success' },
      ])
    } else {
      setHistory((prev) => [
        ...prev,
        { text: `$ ${cmdStr}`, type: 'input' },
        { text: output, type: 'output' },
      ])
    }

    setInputVal('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    runCommand(inputVal)
  }

  return (
    <>
      {/* Matrix rain canvas overlay if enabled */}
      {isMatrixMode && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 pointer-events-none bg-black/60 backdrop-blur-xs font-mono text-emerald-400 text-xs opacity-60 overflow-hidden"
          style={{ textShadow: '0 0 8px #10b981' }}
        >
          <div className="p-8 animate-pulse">
            [ MATRIX RAIN ACTIVE ] // 01000101 01001100 01011001 01000001 01010011 // NEXT THREE GSAP
          </div>
        </div>
      )}

      {/* Terminal Modal Window */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[10002] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Developer Telemetry Terminal"
        >
          <div
            className="w-full max-w-2xl h-[520px] rounded-2xl bg-[#090b10] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Top Titlebar */}
            <div className="px-4 py-3 bg-black/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close terminal window"
                  className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 cursor-pointer transition-colors"
                />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-neutral-400 ml-2">
                  elyas@kurdistan-lab: ~ (zsh)
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-500">
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-white text-neutral-400 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Command Action Chips */}
            <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] font-mono no-scrollbar">
              <span className="text-neutral-500 shrink-0">Quick run:</span>
              {['help', 'bio', 'stack', 'projects', 'github', 'contact', 'matrix'].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => runCommand(cmd)}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-cyan-300 border border-white/10 transition-colors shrink-0 cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Body Log */}
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3 bg-[#06070a]/90 select-text">
              {history.map((h, i) => (
                <div
                  key={i}
                  className={`leading-relaxed whitespace-pre-wrap break-words ${
                    h.type === 'system'
                      ? 'text-cyan-400 font-bold'
                      : h.type === 'info'
                      ? 'text-neutral-500'
                      : h.type === 'input'
                      ? 'text-slate-200 font-semibold'
                      : h.type === 'success'
                      ? 'text-emerald-400'
                      : 'text-neutral-300'
                  }`}
                >
                  {h.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Line */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 bg-black/80 border-t border-white/10 flex items-center gap-2"
            >
              <span className="text-cyan-400 font-mono text-xs font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type a command ('help' to list them)..."
                className="flex-1 bg-transparent text-xs font-mono text-white placeholder-neutral-600 focus:outline-none"
              />
              <button
                type="submit"
                className="p-1 rounded bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
