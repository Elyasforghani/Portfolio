'use client'

import React, { useEffect, useRef, useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export default function CustomCursorTrail() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const particlesRef = useRef([])
  const animationIdRef = useRef(null)

  useEffect(() => {
    if (!mounted) return
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false })
    if (!ctx) return

    const colors = ['#ff6b5b', '#ff8577', '#f4ede0', '#e8dfd0']

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e

      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`
        cursorDotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`
      }

   
      if (particlesRef.current.length < 150) {
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            x,
            y,
            size: Math.random() * 2.5 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            alpha: 1,
            decay: Math.random() * 0.025 + 0.018,
          })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1)
          continue
        }

        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animationIdRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          body,
          a,
          button,
          input,
          textarea,
          select {
            cursor: none !important;
          }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{ background: 'transparent' }}
      />

      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border border-[#ff6b5b]/60 z-[9999] will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)',
          transition: 'opacity 0.2s',
        }}
      />

      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-[#ff6b5b] z-[9999] will-change-transform shadow-[0_0_10px_rgba(255,107,91,0.85)]"
        style={{
          transform: 'translate3d(0, 0, 0)',
        }}
      />
    </>
  )
}