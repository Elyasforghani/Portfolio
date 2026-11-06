'use client'

import React, { useState, useEffect, useRef } from 'react'
import { sound } from '../../utils/audio'
import { Trash2, X, Plus, Move, Layers } from 'lucide-react'

const STICKER_TEMPLATES = [
  { id: 'rigor', label: '🧪 Chemical Rigor', bg: 'bg-slate-200 text-black border-slate-300' },
  { id: 'redis', label: '⚡ Redis < 1ms', bg: 'bg-rose-500/90 text-white border-rose-400' },
  { id: 'handcrafted', label: '100% Handcrafted', bg: 'bg-cyan-400/90 text-black border-cyan-300' },
  { id: 'docker', label: '🐳 Docker Shipped', bg: 'bg-sky-500/90 text-white border-sky-400' },
  { id: 'awwwards', label: 'Awwwards Nominee', bg: 'bg-white text-black border-neutral-300 font-bold' },
  { id: 'heart', label: '❤️ Love Your Work', bg: 'bg-pink-500/90 text-white border-pink-400' },
]

export default function CanvasPlayground() {
  const [stickers, setStickers] = useState([])
  const [isStickerDrawerOpen, setIsStickerDrawerOpen] = useState(false)
  const [activeStamp, setActiveStamp] = useState(null)
  
  // Selection box state
  const [isDragging, setIsDragging] = useState(false)
  const [dragBox, setDragBox] = useState(null)
  const startPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseDown = (e) => {
      // Don't trigger on interactive elements or inside modals
      if (e.target.closest('a, button, input, textarea, [data-cursor], .no-select-box')) {
        return
      }

      // If in stamp mode, place sticker at click position
      if (activeStamp) {
        sound.playStickerPop()
        const newSticker = {
          id: Date.now(),
          template: activeStamp,
          x: e.clientX,
          y: e.clientY + window.scrollY,
          rotation: (Math.random() - 0.5) * 22,
        }
        setStickers((prev) => [...prev, newSticker])
        setActiveStamp(null)
        return
      }

      // Start Figma selection box
      setIsDragging(true)
      startPos.current = { x: e.clientX, y: e.clientY }
      setDragBox({
        startX: e.clientX,
        startY: e.clientY,
        curX: e.clientX,
        curY: e.clientY,
      })
    }

    const handleMouseMove = (e) => {
      if (!isDragging) return

      setDragBox({
        startX: startPos.current.x,
        startY: startPos.current.y,
        curX: e.clientX,
        curY: e.clientY,
      })
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        setTimeout(() => setDragBox(null), 150)
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, activeStamp])

  const selectStamp = (template) => {
    sound.playClick()
    setActiveStamp(template)
    setIsStickerDrawerOpen(false)
  }

  const clearStickers = () => {
    sound.playClick()
    setStickers([])
  }

  // Calculate box geometry
  const boxLeft = dragBox ? Math.min(dragBox.startX, dragBox.curX) : 0
  const boxTop = dragBox ? Math.min(dragBox.startY, dragBox.curY) : 0
  const boxWidth = dragBox ? Math.abs(dragBox.curX - dragBox.startX) : 0
  const boxHeight = dragBox ? Math.abs(dragBox.curY - dragBox.startY) : 0

  return (
    <>
      {/* 1. Nesil Noble Figma Selection Box */}
      {dragBox && boxWidth > 8 && boxHeight > 8 && (
        <div
          aria-hidden="true"
          className="fixed pointer-events-none z-50 border border-blue-400 bg-blue-500/15 border-dashed rounded-xs shadow-[0_0_15px_rgba(96,165,250,0.3)] select-none"
          style={{
            left: `${boxLeft}px`,
            top: `${boxTop}px`,
            width: `${boxWidth}px`,
            height: `${boxHeight}px`,
          }}
        >
          {/* Dimension Telemetry Tag */}
          <div className="absolute -bottom-6 left-0 px-2 py-0.5 rounded bg-blue-600 text-[10px] font-mono text-white font-bold whitespace-nowrap shadow-md">
            W: {Math.round(boxWidth)}px &nbsp; H: {Math.round(boxHeight)}px
          </div>
        </div>
      )}

      {/* 2. Persistent Stamped Canvas Stickers */}
      {stickers.map((s) => (
        <div
          key={s.id}
          className={`absolute z-30 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border shadow-2xl transition-transform hover:scale-110 pointer-events-auto cursor-pointer animate-in zoom-in duration-200 ${s.template.bg}`}
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
          }}
          onClick={(e) => {
            e.stopPropagation()
            sound.playClick()
            setStickers((prev) => prev.filter((item) => item.id !== s.id))
          }}
          title="Click to remove sticker"
        >
          {s.template.label}
        </div>
      ))}

      {/* 3. Floating Sticker Stamp Control HUD */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 no-select-box">
        {activeStamp && (
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-black text-xs font-mono font-bold animate-pulse shadow-xl">
            <span>Stamp Ready: Click anywhere</span>
            <button
              type="button"
              onClick={() => setActiveStamp(null)}
              className="p-0.5 hover:bg-black/10 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {stickers.length > 0 && (
          <button
            type="button"
            onClick={clearStickers}
            data-cursor="CLEAR"
            aria-label="Clear all stickers"
            className="p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-neutral-400 hover:text-rose-400 transition-colors shadow-lg cursor-pointer"
            title="Clear all stamps"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {/* Sticker Drawer Toggle */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              sound.playClick()
              setIsStickerDrawerOpen((prev) => !prev)
            }}
            data-cursor="STICKERS"
            aria-label="Open tactile sticker palette"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 hover:border-slate-300/60 text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-2xl cursor-pointer group"
          >
            <Plus className="w-3.5 h-3.5 text-slate-200 group-hover:rotate-90 transition-transform" />
            <span className="hidden sm:inline">Stamps</span>
            <span className="text-[10px] text-slate-100 font-bold px-1.5 py-0.2 rounded bg-white/10">
              {stickers.length}
            </span>
          </button>

          {/* Palette Popover */}
          {isStickerDrawerOpen && (
            <div className="absolute bottom-12 right-0 w-64 p-3 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-200 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                <span>Select &amp; Stamp Canvas</span>
                <button
                  type="button"
                  onClick={() => setIsStickerDrawerOpen(false)}
                  className="hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {STICKER_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => selectStamp(tmpl)}
                    className={`flex items-center justify-start px-3 py-2 rounded-xl text-xs font-mono text-left transition-all duration-200 cursor-pointer border ${tmpl.bg} hover:scale-102`}
                  >
                    <span>{tmpl.label}</span>
                  </button>
                ))}
              </div>
              <span className="text-[9px] font-mono text-neutral-500 text-center pt-1">
                Drag on canvas for Figma selection box
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
