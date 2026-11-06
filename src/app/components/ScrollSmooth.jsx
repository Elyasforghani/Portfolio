'use client'

import ReactLenis from 'lenis/react'
import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollSmooth({ children }) {
  const lenisRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenisInstance = lenisRef.current?.lenis
    if (lenisInstance) {
      window.__lenis = lenisInstance
      lenisInstance.on('scroll', ScrollTrigger.update)
    }

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(timer)
      if (lenisInstance) {
        lenisInstance.off('scroll', ScrollTrigger.update)
      }
      gsap.ticker.remove(update)
      window.__lenis = null
    }
  }, [])

  // Reset scroll position to top whenever navigating between routes
  useEffect(() => {
    const lenis = window.__lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
    // Refresh ScrollTrigger pins & triggers for the new page
    const t = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <ReactLenis
      ref={lenisRef}
      autoRaf={false}
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
