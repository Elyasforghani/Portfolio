'use client'

import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ThreeBackground from '../components/ThreeBackground'
import SystemPipelineSimulator from '../components/SystemPipelineSimulator'
import HorizontalGallery from '../components/HorizontalGallery'
import { Activity, Layers, Cpu, Compass, Radio, RotateCcw, Droplets, Gem } from 'lucide-react'
import { sound } from '../../utils/audio'
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

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500)
    let height = (canvas.height = 320)

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
        color: i % 2 === 0 ? 'rgba(0, 229, 255,' : 'rgba(253, 230, 138,',
      })
    }

    let mouse = { x: -999, y: -999, prevX: 0, prevY: 0 }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', onMouseMove)

    let animId
    const renderFluid = () => {
      ctx.fillStyle = 'rgba(6, 7, 9, 0.22)'
      ctx.fillRect(0, 0, width, height)

      const mouseVx = (mouse.x - mouse.prevX) * 0.25
      const mouseVy = (mouse.y - mouse.prevY) * 0.25

      particles.forEach((p) => {
        // Fluid vortex physics around mouse
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 100 && dist > 1) {
          const force = (100 - dist) / 100
          // Circular vortex tangential force
          p.vx += (-dy / dist) * force * 2.5 + mouseVx * 0.4
          p.vy += (dx / dist) * force * 2.5 + mouseVy * 0.4
        }

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96 // Fluid friction
        p.vy *= 0.96

        // Boundary wrap
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const alpha = Math.min(1, Math.max(0.1, (Math.abs(p.vx) + Math.abs(p.vy)) * 0.6))
        ctx.fillStyle = `${p.color} ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      animId = requestAnimationFrame(renderFluid)
    }

    renderFluid()

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  // --- EXPERIMENT 02: 3D Chromatic Refraction Crystal (Three.js) ---
  useEffect(() => {
    const mount = crystalMountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / 320, 0.1, 1000)
    camera.position.z = 4.2

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(mount.clientWidth, 320)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    mount.appendChild(renderer.domElement)

    // Polyhedron geometry with chromatic glass wireframe
    const geometry = new THREE.IcosahedronGeometry(1.6, 0)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
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

    // Inner glowing core
    const coreGeo = new THREE.OctahedronGeometry(0.8, 0)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
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

    let animId
    const animate = () => {
      crystal.rotation.x += 0.006 + mouseY * 0.02
      crystal.rotation.y += 0.008 + mouseX * 0.02
      core.rotation.x -= 0.01
      core.rotation.y -= 0.01

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      mount.removeEventListener('mousemove', onMountMouseMove)
      cancelAnimationFrame(animId)
      if (mount && renderer.domElement) mount.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative font-sans bg-[#14213d] text-[#f4ede0] min-h-screen selection:bg-[#f4ede0] selection:text-[#14213d]">
      <ThreeBackground />
      <Header />

      <main className="relative z-10 pt-36 pb-32 px-6 max-w-6xl mx-auto">
        {/* Lab Top Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-slate-300 mb-3">
            <Activity className="w-3.5 h-3.5 text-slate-300" />
            <span>[ R&amp;D EXPERIMENTAL TECHNOLOGY &bull; CHEMICAL ENG &bull; WEBGL ]</span>
          </div>
          <h1 className="font-syne text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 break-words">
            Spatial Motion &amp; Shader Lab
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed font-sans break-words">
            A sandboxed experimentation chamber exploring the frontier of fluid transport dynamics, 3D WebGL refraction shaders, and low-latency interactive vector physics.
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
                  <Droplets className="w-3.5 h-3.5" /> Fluid Vortex Dynamics
                </span>
              </div>
              <h3 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-[#f4ede0] mb-2 break-words">
                Navier-Stokes Streamlines
              </h3>
              <p className="text-xs text-[#c4b7a1] font-sans leading-relaxed mb-4 break-words">
                Derived from Chemical Engineering transport phenomena: move your cursor over the canvas to inject tangential vortex velocity and observe laminar fluid damping.
              </p>
            </div>

            <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-[#f4ede0]/15 bg-[#0c1527] shadow-inner">
              <canvas ref={fluidCanvasRef} className="w-full h-full cursor-crosshair" />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#c4b7a1]/70 uppercase tracking-wider pointer-events-none">
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
                  <Gem className="w-3.5 h-3.5" /> Three.js WebGL Core
                </span>
              </div>
              <h3 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-[#f4ede0] mb-2 break-words">
                Chromatic Refraction Polyhedron
              </h3>
              <p className="text-xs text-[#c4b7a1] font-sans leading-relaxed mb-4 break-words">
                Real-time 3D icosahedral wireframe with physical transmission properties and dual-axis rotational tracking tied to normalized viewport coordinates.
              </p>
            </div>

            <div
              ref={crystalMountRef}
              className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-[#f4ede0]/15 bg-[#0c1527] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-inner"
            >
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#c4b7a1]/70 uppercase tracking-wider pointer-events-none">
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
            <h3 className="font-syne font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#f4ede0] mb-2">
              System Pipeline Simulator
            </h3>
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
