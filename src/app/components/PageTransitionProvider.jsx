'use client'

import React, { useEffect, useRef, useState } from 'react'
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
    if (!curtain) return

    // Quick cinematic wipe across page on route change
    const tl = gsap.timeline()

    tl.set(curtain, {
      scaleY: 1,
      transformOrigin: 'bottom center',
      opacity: 1,
      pointerEvents: 'auto',
    })
      .to(curtain, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.75,
        ease: 'power4.inOut',
        delay: 0.05,
        onComplete: () => {
          gsap.set(curtain, { pointerEvents: 'none', opacity: 0 })
        },
      })

    // Scroll to top on page navigation
    if (typeof window !== 'undefined') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }
  }, [pathname])

  return (
    <>
      {/* Cinematic Transition Curtain Shutter */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="fixed inset-0 z-[9995] bg-[#060709] pointer-events-none opacity-0 select-none flex flex-col justify-between p-8"
        style={{ transformOrigin: 'top center' }}
      >
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
          <span>ELYAS FORGHANI</span>
          <span>LOADING // ONE MOMENT</span>
        </div>

        <div className="text-center font-syne font-black text-2xl uppercase tracking-widest text-amber-200/90 chromatic-text">
          {pathname === '/' ? 'OVERVIEW' : pathname.replace('/', '').toUpperCase()}
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      </div>

      {children}
    </>
  )
}
