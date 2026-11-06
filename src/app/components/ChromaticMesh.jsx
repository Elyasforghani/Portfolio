'use client'

import React, { useEffect, useRef } from 'react'

export default function ChromaticMesh() {
  const blob1Ref = useRef(null)
  const blob2Ref = useRef(null)
  const blob3Ref = useRef(null)

  useEffect(() => {
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let curX = mouseX
    let curY = mouseY

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let animId
    const loop = () => {
      curX += (mouseX - curX) * 0.03
      curY += (mouseY - curY) * 0.03

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${curX * 0.08}px, ${curY * 0.08}px, 0)`
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(${-curX * 0.06}px, ${-curY * 0.06}px, 0)`
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate3d(${curX * 0.04}px, ${-curY * 0.04}px, 0)`
      }

      animId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 select-none"
    >
      {/* Aurora Blob 1: Electric Cyan & Soft Mint */}
      <div
        ref={blob1Ref}
        className="absolute -top-[15%] left-[10%] w-[50vw] h-[50vw] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.22) 0%, rgba(182, 255, 59, 0.08) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Aurora Blob 2: Warm Amber & Golden Radiance */}
      <div
        ref={blob2Ref}
        className="absolute top-[40%] -right-[10%] w-[55vw] h-[55vw] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(246, 216, 155, 0.2) 0%, rgba(255, 120, 60, 0.08) 50%, transparent 75%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Aurora Blob 3: Iridescent Pink & Deep Violet */}
      <div
        ref={blob3Ref}
        className="absolute bottom-[-10%] left-[25%] w-[60vw] h-[60vw] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(255, 59, 212, 0.16) 0%, rgba(120, 80, 255, 0.08) 50%, transparent 75%)',
          filter: 'blur(110px)',
        }}
      />
    </div>
  )
}
