'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export default function PageTransitionProvider({ children }) {
  const pathname = usePathname()
  const curtainRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip animation on initial mount so preloader handles it
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const curtain = curtainRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (curtain && !reducedMotion) {
      // Quick cinematic wipe across page on route change
      const tl = gsap.timeline()

      tl.set(curtain, {
        scaleY: 1,
        transformOrigin: 'bottom center',
        opacity: 1,
        pointerEvents: 'auto',
      }).to(curtain, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.75,
        ease: 'power4.inOut',
        delay: 0.05,
        onComplete: () => {
          gsap.set(curtain, { pointerEvents: 'none', opacity: 0 })
        },
      })
    }

    // Scroll to top on page navigation
    if (typeof window !== 'undefined') {
      if (window.__lenis && !reducedMotion) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }
  }, [pathname])

  return (
    <>
      {/* Transition Curtain Shutter */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="fixed inset-0 z-[9995] bg-[#0c1527] pointer-events-none opacity-0 select-none flex flex-col justify-between p-8"
        style={{ transformOrigin: 'top center' }}
      >
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-[#c4b7a1]">
          <span>ELYAS FORGHANI</span>
          <span>LOADING // ONE MOMENT</span>
        </div>

        <div className="text-center font-syne font-black text-2xl uppercase tracking-widest text-[#f4ede0]">
          {pathname === '/' ? 'OVERVIEW' : pathname.replace('/', '').toUpperCase()}
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff6b5b] to-transparent" />
      </div>

      {children}
    </>
  )
}
