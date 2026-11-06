'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Parallax({ heading, caption, imageSrc, credit }) {
  const container = useRef(null)
  const imageWrapper = useRef(null)

  useGSAP(
    () => {
      if (!imageWrapper.current) return

      gsap.fromTo(
        imageWrapper.current,
        { yPercent: -23 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      )
    },
    { scope: container }
  )

  return (
    <div ref={container} className="relative h-screen w-full overflow-hidden">
      <div
        ref={imageWrapper}
        className="absolute -top-[15%] left-0 w-full h-[130%] will-change-transform"
      >
        <Image
          fill
          className="object-cover pointer-events-none"
          src={imageSrc}
          alt={heading}
          priority={false}
          sizes="100vw"
          quality={80}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Overlay */}
      <div className="relative h-full flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="text-white text-[12vw] font-black leading-none uppercase">
          {heading}
        </h1>

        <span className="text-white text-[5vw] font-subtitle mt-2">
          {caption}
        </span>

        <span className="absolute bottom-8 text-white/50 text-xs">
          {credit}
        </span>
      </div>
    </div>
  )
}