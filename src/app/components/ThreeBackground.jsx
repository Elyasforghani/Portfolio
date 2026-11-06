'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Screen, mobile, and accessibility detection
    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const particleCount = isMobile ? 80 : 160
    const connectionDistance = isMobile ? 85 : 120
    const mouseDistance = isMobile ? 100 : 150
    const motionScale = prefersReducedMotion ? 0.25 : 1

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x060709, 0.001)

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1600
    )
    camera.position.z = 250

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    mount.appendChild(renderer.domElement)

    // Signature 60-30-10 palette: Coral, Cream, Navy tint
    const colors = [
      new THREE.Color(0xff6b5b), // Vibrant Coral (10%)
      new THREE.Color(0xff8577), // Soft Coral
      new THREE.Color(0xf4ede0), // Architectural Cream (30%)
      new THREE.Color(0xe8dfd0), // Muted Cream
      new THREE.Color(0x4a6572), // Atmospheric Navy Tone
    ]

    // Particles Data
    const positions = new Float32Array(particleCount * 3)
    const velocities = []
    const particleColors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800
      positions[i * 3 + 2] = (Math.random() - 0.5) * 500

      velocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
        z: (Math.random() - 0.5) * 0.2,
      })

      const color = colors[Math.floor(Math.random() * colors.length)]
      particleColors[i * 3] = color.r
      particleColors[i * 3 + 1] = color.g
      particleColors[i * 3 + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const material = new THREE.PointsMaterial({
      size: isMobile ? 3 : 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Dynamic Connection Lines (Neural Constellation - Sane bounds for performance)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x485c72,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    })

    const maxLineSegments = particleCount * 40
    const linePositions = new Float32Array(maxLineSegments * 6)
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Deep architectural wireframe floor plane
    const gridGeometry = new THREE.PlaneGeometry(2200, 2200, 40, 40)
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x1d2230,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    })
    const gridPlane = new THREE.Mesh(gridGeometry, gridMaterial)
    gridPlane.rotation.x = -Math.PI / 2.3
    gridPlane.position.y = -240
    scene.add(gridPlane)

    // Mouse coordinates in normalized space
    const mouse = new THREE.Vector2(-9999, -9999)
    const targetMouse = new THREE.Vector2(-9999, -9999)

    const onMouseMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        targetMouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
        targetMouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
      }
    }

    let scrollTargetY = 0
    let currentScrollY = 0
    const onScroll = () => {
      scrollTargetY = window.scrollY
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const handleResize = () => {
      if (!mount) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    let animationFrameId = 0
    let isPageVisible = !document.hidden

    const handleVisibility = () => {
      isPageVisible = !document.hidden
      if (isPageVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const animate = () => {
      if (!isPageVisible) {
        animationFrameId = 0
        return
      }
      animationFrameId = requestAnimationFrame(animate)

      // Smooth mouse and scroll interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.05
      mouse.y += (targetMouse.y - mouse.y) * 0.05
      currentScrollY += (scrollTargetY - currentScrollY) * 0.06

      const mouseWorldX = mouse.x * 260
      const mouseWorldY = mouse.y * 260

      const posArray = geometry.attributes.position.array
      const lineArray = lineGeometry.attributes.position.array
      let lineIndex = 0

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3

        // Autonomous kinetic drift (scaled for reduced-motion users)
        posArray[ix] += velocities[i].x * motionScale
        posArray[ix + 1] += velocities[i].y * motionScale
        posArray[ix + 2] += velocities[i].z * motionScale

        // Boundary wrapping
        if (Math.abs(posArray[ix]) > 400) velocities[i].x *= -1
        if (Math.abs(posArray[ix + 1]) > 400) velocities[i].y *= -1
        if (Math.abs(posArray[ix + 2]) > 260) velocities[i].z *= -1

        // Mouse vector repulsion physics (disabled for reduced motion)
        const dx = posArray[ix] - mouseWorldX
        const dy = posArray[ix + 1] - mouseWorldY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (!prefersReducedMotion && dist < mouseDistance && dist > 0.001) {
          const force = (mouseDistance - dist) / mouseDistance
          posArray[ix] += (dx / dist) * force * 2.0
          posArray[ix + 1] += (dy / dist) * force * 2.0
        }

        // Connect nearby particles with lines
        for (let j = i + 1; j < particleCount; j++) {
          const jx = j * 3
          const cdx = posArray[ix] - posArray[jx]
          const cdy = posArray[ix + 1] - posArray[jx + 1]
          const cdz = posArray[ix + 2] - posArray[jx + 2]
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz)

          if (cdist < connectionDistance && lineIndex < lineArray.length - 6) {
            lineArray[lineIndex++] = posArray[ix]
            lineArray[lineIndex++] = posArray[ix + 1]
            lineArray[lineIndex++] = posArray[ix + 2]
            lineArray[lineIndex++] = posArray[jx]
            lineArray[lineIndex++] = posArray[jx + 1]
            lineArray[lineIndex++] = posArray[jx + 2]
          }
        }
      }

      // Clear inactive line vertices
      for (let k = lineIndex; k < lineArray.length; k++) {
        lineArray[k] = 0
      }

      geometry.attributes.position.needsUpdate = true
      lineGeometry.attributes.position.needsUpdate = true

      // Silky, non-repeating continuous camera motion with cursor sway
      camera.position.x = mouse.x * 25
      camera.position.y = mouse.y * 20 - (currentScrollY * 0.03)
      camera.position.z = 250 - Math.sin(currentScrollY * 0.0008) * 40
      camera.lookAt(0, -(currentScrollY * 0.03), 0)

      particles.rotation.y += 0.0002 * motionScale
      gridPlane.position.y = -240 - (currentScrollY * 0.03)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(animationFrameId)
      animationFrameId = 0

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement)
      }

      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      gridGeometry.dispose()
      gridMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-70"
    />
  )
}
