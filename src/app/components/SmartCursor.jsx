'use client'

import React, { useEffect, useRef, useSyncExternalStore } from 'react'
import { sound } from '../../utils/audio'

const emptySubscribe = () => () => {}
const getClientPointerFine = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches
const getServerPointer = () => false

export default function SmartCursor() {
  const auraRef = useRef(null)
  const textRef = useRef(null)

  const isFinePointer = useSyncExternalStore(
    emptySubscribe,
    getClientPointerFine,
    getServerPointer
  )

  useEffect(() => {
    if (!isFinePointer) return

    const aura = auraRef.current
    const textEl = textRef.current
    if (!aura) return

    let mouseX = -100
    let mouseY = -100
    let auraX = -100
    let auraY = -100
    let isHovering = false
    let currentLabel = ''
    let isVisible = false
    let lastHoveredInteractive = null

    const updateState = (target) => {
      if (!target) return
      const interactive = target.closest
        ? target.closest('[data-cursor], a, button, input, textarea, select, [role="button"]')
        : null

      if (interactive) {
        const label = interactive.getAttribute('data-cursor') || ''
        
        // Avoid redundant DOM updates if target didn't change state
        if (isHovering && currentLabel === label) return

        isHovering = true
        currentLabel = label

        if (label) {
          if (textEl) {
            textEl.textContent = label
            textEl.style.opacity = '1'
          }
          aura.style.width = '72px'
          aura.style.height = '72px'
          aura.style.backgroundColor = 'rgba(255, 107, 91, 0.95)'
          aura.style.borderColor = 'transparent'
          aura.style.boxShadow = '0 0 30px rgba(255, 107, 91, 0.6)'
        } else {
          if (textEl) {
            textEl.textContent = ''
            textEl.style.opacity = '0'
          }
          aura.style.width = '44px'
          aura.style.height = '44px'
          aura.style.backgroundColor = 'rgba(255, 107, 91, 0.15)'
          aura.style.borderColor = 'rgba(255, 107, 91, 0.7)'
          aura.style.boxShadow = '0 0 20px rgba(255, 107, 91, 0.3)'
        }
      } else {
        if (!isHovering && !currentLabel) return

        isHovering = false
        currentLabel = ''
        if (textEl) {
          textEl.textContent = ''
          textEl.style.opacity = '0'
        }
        aura.style.width = '32px'
        aura.style.height = '32px'
        aura.style.backgroundColor = 'transparent'
        aura.style.borderColor = 'rgba(244, 237, 224, 0.4)'
        aura.style.boxShadow = 'none'
      }
    }

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        aura.style.opacity = '1'
        auraX = mouseX
        auraY = mouseY
      }

      updateState(e.target)
    }

    // Single-trigger per interactive element - prevents audio machine-gun on nested children
    const onMouseOver = (e) => {
      const interactive = e.target?.closest?.('[data-cursor], a, button, [role="button"]')
      if (interactive && interactive !== lastHoveredInteractive) {
        lastHoveredInteractive = interactive
        sound.playHoverTick()
      } else if (!interactive) {
        lastHoveredInteractive = null
      }
    }

    const onClick = (e) => {
      if (e.target?.closest?.('a, button, [data-cursor], [role="button"]')) {
        sound.playClick()
      }
    }

    const onMouseLeave = () => {
      isVisible = false
      aura.style.opacity = '0'
      lastHoveredInteractive = null
    }

    const onMouseEnter = () => {
      isVisible = true
      aura.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    window.addEventListener('click', onClick, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    let animId
    const render = () => {
      const factor = isHovering ? 0.22 : 0.16
      auraX += (mouseX - auraX) * factor
      auraY += (mouseY - auraY) * factor

      const size = currentLabel ? 72 : isHovering ? 44 : 32
      const offset = size / 2

      aura.style.transform = `translate3d(${Math.round(auraX - offset)}px, ${Math.round(auraY - offset)}px, 0)`

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('click', onClick)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animId)
    }
  }, [isFinePointer])

  if (!isFinePointer) return null

  return (
    <div
      ref={auraRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 rounded-full border z-[9999] will-change-transform flex items-center justify-center transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out opacity-0 select-none"
      style={{ width: '32px', height: '32px' }}
    >
      <span
        ref={textRef}
        className="text-[10px] font-mono font-black uppercase tracking-wider text-black select-none pointer-events-none text-center px-1 opacity-0 transition-opacity duration-150"
      />
    </div>
  )
}
