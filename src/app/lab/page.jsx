'use client'

import React, { useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ThreeBackground from '../components/ThreeBackground'
import SystemPipelineSimulator from '../components/SystemPipelineSimulator'
import HorizontalGallery from '../components/HorizontalGallery'
import { Droplets, Gem } from 'lucide-react'
import * as THREE from 'three'

export default function LabPage() {
  const fluidCanvasRef = useRef(null)
  const crystalMountRef = useRef(null)

  // --- EXPERIMENT 01: Chemical Fluid Flow & Vector Field Streamline Simulator ---
  useEffect(() => {
    const canvas = fluidCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const width = (canvas.width = canvas.parentElement?.clientWidth || 500)
    const height = (canvas.height = 320)

    const particles = []
    const numParticles = 180

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        life: Math.random() * 80 + 20,
        maxLife: 100,
        color: i % 2 === 0 ? 'rgba(255, 107, 91,' : 'rgba(244, 237, 224,',
      })
    }

    const mouse = { x: -999, y: -999, prevX: 0, prevY: 0 }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', onMouseMove)

    const drawStep = () => {
      ctx.fillStyle = 'rgba(12, 21, 39, 0.22)'
      ctx.fillRect(0, 0, width, height)

      const mouseVx = (mouse.x - mouse.prevX) * 0.25
      const mouseVy = (mouse.y - mouse.prevY) * 0.25

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100 && dist > 1) {
            const force = (100 - dist) / 100
            p.vx += (-dy / dist) * force * 2.5 + mouseVx * 0.4
            p.vy += (dx / dist) * force * 2.5 + mouseVy * 0.4
          }

          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.96
          p.vy *= 0.96

          if (p.x < 0) p.x = width
          if (p.x > width) p.x = 0
          if (p.y < 0) p.y = height
          if (p.y > height) p.y = 0
        }

        const alpha = prefersReducedMotion
          ? 0.65
          : Math.min(1, Math.max(0.1, (Math.abs(p.vx) + Math.abs(p.vy)) * 0.6))
        ctx.fillStyle = `${p.color} ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    let animId = 0
    let isInView = true
    let isPageVisible = !document.hidden

    const stopLoop = () => {
      cancelAnimationFrame(animId)
      animId = 0
    }

    const renderFluid = () => {
      if (!isInView || !isPageVisible || prefersReducedMotion) {
        stopLoop()
        return
      }
      drawStep()
      animId = requestAnimationFrame(renderFluid)
    }

    const syncLoop = () => {
      if (isInView && isPageVisible && !prefersReducedMotion && !animId) {
        animId = requestAnimationFrame(renderFluid)
      } else if ((!isInView || !isPageVisible) && animId) {
        stopLoop()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting
        syncLoop()
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    const onVisibility = () => {
      isPageVisible = !document.hidden
      syncLoop()
    }
    document.addEventListener('visibilitychange', onVisibility)

    drawStep()
    if (!prefersReducedMotion) {
      renderFluid()
    }

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      stopLoop()
    }
  }, [])

  // --- EXPERIMENT 02: 3D Chromatic Refraction Crystal (Three.js) ---
  useEffect(() => {
    const mount = crystalMountRef.current
    if (!mount) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / 320, 0.1, 1000)
    camera.position.z = 4.2

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(mount.clientWidth, 320)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    mount.appendChild(renderer.domElement)

    // Polyhedron geometry with Cream wireframe and Coral inner core
    const geometry = new THREE.IcosahedronGeometry(1.6, 0)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xf4ede0,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 1.2,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    })

    const crystal = new THREE.Mesh(geometry, material)
    scene.add(crystal)

    const coreGeo = new THREE.OctahedronGeometry(0.8, 0)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff6b5b,
      wireframe: true,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    scene.add(core)

    let mouseX = 0
    let mouseY = 0

    const onMountMouseMove = (e) => {
      const rect = mount.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }

    mount.addEventListener('mousemove', onMountMouseMove)

    let animId = 0
    let isInView = true
    let isPageVisible = !document.hidden

    const stopLoop = () => {
      cancelAnimationFrame(animId)
      animId = 0
    }

    const animate = () => {
      if (!isInView || !isPageVisible || prefersReducedMotion) {
        stopLoop()
        return
      }
      crystal.rotation.x += 0.006 + mouseY * 0.02
      crystal.rotation.y += 0.008 + mouseX * 0.02
      core.rotation.x -= 0.01
      core.rotation.y -= 0.01

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    const syncLoop = () => {
      if (isInView && isPageVisible && !prefersReducedMotion && !animId) {
        animId = requestAnimationFrame(animate)
      } else if ((!isInView || !isPageVisible) && animId) {
        stopLoop()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting
        syncLoop()
      },
      { threshold: 0.05 }
    )
    observer.observe(mount)

    const onVisibility = () => {
      isPageVisible = !document.hidden
      syncLoop()
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Render initial static frame cleanly even when reduced motion is enabled
    crystal.rotation.set(0.35, 0.5, 0)
    core.rotation.set(-0.25, -0.4, 0)
    renderer.render(scene, camera)
    if (!prefersReducedMotion) {
      animate()
    }

    return () => {
      mount.removeEventListener('mousemove', onMountMouseMove)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      stopLoop()
      if (mount && renderer.domElement) mount.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative font-sans bg-[#14213d] text-[#f4ede0] min-h-dvh selection:bg-[#f4ede0] selection:text-[#14213d]">
      <ThreeBackground />
      <Header />

      <main id="main-content" tabIndex={-1} className="relative z-10 pt-36 pb-32 px-6 max-w-6xl mx-auto">
        {/* Lab Top Header */}
        <div className="mb-14 pb-8 border-b border-[#f4ede0]/10">
          <h1 className="font-syne text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#f4ede0] mb-4 break-words">
            Motion &amp; <span className="text-[#ff6b5b]">Shader Lab</span>
          </h1>
          <p className="text-base sm:text-lg text-[#c4b7a1] max-w-2xl font-light leading-relaxed font-sans break-words">
            Interactive experiments combining chemical fluid dynamics, WebGL 3D geometry, and thermodynamic equilibrium modeling.
          </p>
        </div>

        {/* Experiment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Experiment 01: Navier-Stokes Fluid Streamlines */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1a30]/90 border border-[#f4ede0]/15 flex flex-col justify-between min-w-0 shadow-2xl">
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#c4b7a1] mb-2">
                <span className="font-bold text-[#f4ede0]">Experiment 01</span>
                <span className="text-[#ff6b5b] flex items-center gap-1 font-semibold">
                  <Droplets className="w-3.5 h-3.5" aria-hidden="true" /> Fluid Vortex Dynamics
                </span>
              </div>
              <h2 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-[#f4ede0] mb-2 break-words">
                Navier-Stokes Streamlines
              </h2>
              <p className="text-xs text-[#c4b7a1] font-sans leading-relaxed mb-4 break-words">
                Derived from Chemical Engineering transport phenomena: move your cursor over the canvas to inject tangential vortex velocity and observe laminar fluid damping.
              </p>
            </div>

            <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-[#f4ede0]/15 bg-[#0c1527] shadow-inner">
              <canvas
                ref={fluidCanvasRef}
                role="img"
                aria-label="Interactive Navier-Stokes fluid streamline simulation"
                className="w-full h-full cursor-crosshair"
              />
              <div className="absolute bottom-3 left-3 text-xs font-mono text-[#c4b7a1] uppercase tracking-wider pointer-events-none">
                Interactive: Drag cursor to stir fluid vortex
              </div>
            </div>
          </div>

          {/* Experiment 02: 3D Chromatic Crystal */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1a30]/90 border border-[#f4ede0]/15 flex flex-col justify-between min-w-0 shadow-2xl">
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#c4b7a1] mb-2">
                <span className="font-bold text-[#f4ede0]">Experiment 02</span>
                <span className="text-[#ff6b5b] flex items-center gap-1 font-semibold">
                  <Gem className="w-3.5 h-3.5" aria-hidden="true" /> Three.js WebGL Core
                </span>
              </div>
              <h2 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-[#f4ede0] mb-2 break-words">
                Chromatic Refraction Polyhedron
              </h2>
              <p className="text-xs text-[#c4b7a1] font-sans leading-relaxed mb-4 break-words">
                Real-time 3D icosahedral wireframe with physical transmission properties and dual-axis rotational tracking tied to normalized viewport coordinates.
              </p>
            </div>

            <div
              ref={crystalMountRef}
              role="img"
              aria-label="Interactive 3D polyhedron wireframe scene"
              className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-[#f4ede0]/15 bg-[#0c1527] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-inner"
            >
              <div className="absolute bottom-3 left-3 text-xs font-mono text-[#c4b7a1] uppercase tracking-wider pointer-events-none">
                Interactive: Orbit crystal via mouse position
              </div>
            </div>
          </div>
        </div>

        {/* Experiment 03: Thermodynamic Distributed Architecture Simulator */}
        <div className="mt-8">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b5b] mb-2 block font-semibold">
              Experiment 03 / Thermodynamic Telemetry
            </span>
            <h2 className="font-syne font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#f4ede0] mb-2">
              System Pipeline Simulator
            </h2>
            <p className="text-sm text-[#c4b7a1] font-light max-w-2xl">
              Interactive high-concurrency traffic surge and node equilibrium modeling based on chemical reactor thermodynamics.
            </p>
          </div>
          <SystemPipelineSimulator />
        </div>

        {/* Experiment 04: Multi-Axis Photographic Archive Reel */}
        <div className="mt-16">
          <HorizontalGallery />
        </div>
      </main>

      <Footer />
    </div>
  )
}
