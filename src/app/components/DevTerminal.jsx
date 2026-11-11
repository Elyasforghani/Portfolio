'use client'

import React, { useState, useEffect, useRef } from 'react'
import { sound } from '../../utils/audio'
import { X, CornerDownLeft } from 'lucide-react'

const COMMANDS = {
  help: `Available commands:
  • bio         : who I am, the short version
  • research    : published chemical engineering paper (Civilica #1949705)
  • stack       : what this site runs on
  • projects    : the 8 real repos & client work
  • github      : open my GitHub profile
  • contact     : how to reach me
  • matrix      : toggle CRT matrix rain overlay
  • clear       : clear console output
  • exit        : close the terminal`,

  bio: `Elyas Forghani
B.Sc. Chemical Engineering, University of Kurdistan.
Front-end & creative developer — Next.js, JavaScript, TypeScript, PostgreSQL, GSAP.
Previously: control-room operator at Ava Company.
Currently: building the GPM Studio storefront (gpm-studio.com).`,

  research: `PUBLISHED CONFERENCE PAPER:
Title : Photocatalytic Degradation of Tetracycline Using ZnO Nanoparticles Supported in a Y-Zeolite Matrix
Venue : 9th International Conference on Chemical Engineering
Code  : OGPCONF09_037
URL   : https://civilica.com/doc/1949705/`,

  stack: `THIS SITE, HONESTLY:
[Core]     : Next.js 16 (App Router), React 19, JavaScript / TypeScript
[Database] : PostgreSQL, REST APIs, MockAPI
[Motion]   : GSAP ScrollTrigger, Lenis, Three.js
[Sound]    : Web Audio API ambient loop (mute toggle in header)
[Styling]  : Tailwind CSS v4 — no UI kit, all hand-rolled
[Source]   : github.com/Elyasforghani/Parallax-Portfolio`,

  projects: `REAL WORK, ALL VERIFIABLE ON GITHUB:
01. GPM Studio storefront        (client, gpm-studio.com)
02. Weather Forecast App         (JS, Weather API)
03. This portfolio               (Next.js, GSAP, Lenis)
04. Hope Church Website          (Tailwind, JS)
05. Hotel Abbasi Showcase        (Tailwind, Swiper)
06. Password Strength Checker    (JS, RegEx)
07. User Management Dashboard    (Next.js, REST API)
08. Dice Game                    (vanilla JS)`,
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
  const dialogRef = useRef(null)
  const backdropPress = useRef(false)

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
      // Toggle with backtick (`) when not typing inside a form field
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault()
        sound.playClick()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Sync native top-layer dialog state and pause Lenis wheel capture
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
      setIsOpen(false)
    }
    backdropPress.current = false
  }

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
      {/* Matrix rain overlay if enabled */}
      {isMatrixMode && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 pointer-events-none bg-[#0c1527]/75 backdrop-blur-xs font-mono text-[#ff8577] text-xs opacity-75 overflow-hidden"
        >
          <div className="p-8 animate-pulse motion-reduce:animate-none">
            [ MATRIX RAIN ACTIVE ] // 01000101 01001100 01011001 01000001 01010011 // NEXT THREE GSAP
          </div>
        </div>
      )}

      {/* Native Modal Developer CLI Dialog */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="dev-terminal-title"
        onClose={() => setIsOpen(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl h-[520px] max-h-[90dvh] rounded-2xl bg-[#0f1a30] text-[#f4ede0] border border-[#f4ede0]/20 shadow-2xl p-0 overflow-hidden"
      >
        <div className="flex flex-col w-full h-full">
          {/* Window Top Titlebar */}
          <div className="px-4 py-3 bg-[#0c1527] border-b border-[#f4ede0]/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#ff6b5b] shrink-0" />
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#f4ede0]/60 shrink-0" />
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#ff8577]/70 shrink-0" />
              <h2
                id="dev-terminal-title"
                className="text-xs font-mono text-[#c4b7a1] ml-2 truncate"
              >
                elyas@kurdistan-lab: ~ (zsh)
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono shrink-0">
              <span className="text-[#ff8577] flex items-center gap-1.5">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#ff6b5b] animate-pulse motion-reduce:animate-none" />
                ONLINE
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close developer terminal"
                className="min-w-10 min-h-10 inline-flex items-center justify-center p-2 rounded-full text-[#c4b7a1] hover:text-[#f4ede0] hover:bg-[#14213d] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Quick Command Action Chips */}
          <div className="px-4 py-2 bg-[#14213d]/60 border-b border-[#f4ede0]/10 flex items-center gap-2 overflow-x-auto text-xs font-mono no-scrollbar">
            <span className="text-[#c4b7a1] shrink-0">Quick run:</span>
            {['help', 'bio', 'research', 'stack', 'projects', 'github', 'contact', 'matrix'].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => runCommand(cmd)}
                className="px-2.5 py-1 rounded bg-[#0c1527] hover:bg-[#14213d] text-[#f4ede0] hover:text-[#ff8577] border border-[#f4ede0]/15 transition-colors shrink-0 cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Body Log */}
          <div
            role="log"
            aria-live="polite"
            className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3 bg-[#0c1527] select-text"
          >
            {history.map((h, i) => (
              <div
                key={i}
                className={`leading-relaxed whitespace-pre-wrap break-words ${
                  h.type === 'system'
                    ? 'text-[#ff6b5b] font-bold'
                    : h.type === 'info'
                    ? 'text-[#c4b7a1]'
                    : h.type === 'input'
                    ? 'text-[#f4ede0] font-semibold'
                    : h.type === 'success'
                    ? 'text-[#ff8577]'
                    : 'text-[#f4ede0]/90'
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
            className="px-4 py-3 bg-[#0c1527] border-t border-[#f4ede0]/10 flex items-center gap-2"
          >
            <label htmlFor="dev-terminal-input" className="text-[#ff6b5b] font-mono text-xs font-bold shrink-0">
              <span aria-hidden="true">$</span>
              <span className="visually-hidden">Developer CLI command input</span>
            </label>
            <input
              id="dev-terminal-input"
              ref={inputRef}
              autoFocus
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a command ('help' to list them)..."
              className="flex-1 bg-transparent text-xs font-mono text-[#f4ede0] placeholder:text-[#c4b7a1]/70"
            />
            <button
              type="submit"
              aria-label="Run terminal command"
              className="min-w-10 min-h-10 inline-flex items-center justify-center p-2 rounded bg-[#ff6b5b] text-[#14213d] hover:bg-[#ff8577] transition-colors cursor-pointer"
            >
              <CornerDownLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </dialog>
    </>
  )
}
