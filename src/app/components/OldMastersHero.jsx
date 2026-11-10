'use client'

import React, { useRef, useState, useEffect, useMemo, useCallback, useId } from 'react'
import { sound } from '../../utils/audio'

// ============================================================================
// OLD MASTERS HERO DIORAMA
// Staged classical diorama with Greek meander, volumetric light shafts,
// drifting dust particles canvas, SVG luminance-keyed statue figures on
// distinct depth planes, 3D pointer parallax tilt, interactive hollow-letter
// wordmark, and classical architectural annotations.
// Customized for Elyas Forghani — Spatial Full-Stack Architect.
// ============================================================================

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Jost:wght@400;500&family=Pinyon+Script&display=swap'

const FONT_PROBES = [
  '400 1em "Bodoni Moda"',
  '400 1em "Bebas Neue"',
  '400 1em "Pinyon Script"',
  '400 1em "Jost"',
  '500 1em "Jost"',
]

const FACES = {
  didone: {
    family: '"Bodoni Moda", "Didot", "Bodoni 72", "Playfair Display", "Times New Roman", serif',
    weight: 400,
    tracking: -0.01,
  },
  condensed: {
    family: '"Bebas Neue", "Oswald", "Impact", "Arial Narrow", sans-serif',
    weight: 400,
    tracking: 0.02,
  },
  grotesk: {
    family: '"Jost", "Futura", "Helvetica Neue", Arial, sans-serif',
    weight: 500,
    tracking: -0.035,
  },
}

const SCRIPT_FAMILY = '"Pinyon Script", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive'
const UI_FAMILY = '"Jost", "Futura", "Helvetica Neue", Arial, sans-serif'
const SERIF_FAMILY = '"Bodoni Moda", "Didot", "Bodoni 72", "Playfair Display", "Times New Roman", serif'

const TONES = {
  noir: {
    stage: '#14213d',
    ground: '#0c1527',
    text: '#f4ede0',
    muted: '#c4b7a1',
    accent: '#ff6b5b',
    word: '#f4ede0',
    rule: 'rgba(244, 237, 224, 0.22)',
    glow: '#ff6b5b',
    highlight: '#ffffff',
  },
  carmine: {
    stage: '#7a1511',
    ground: '#1a0706',
    text: '#f6ead6',
    muted: '#dba79d',
    accent: '#f6ead6',
    word: '#f8eedc',
    rule: '#b2463c',
    glow: '#ffdcb0',
    highlight: '#f0b08f',
  },
  vellum: {
    stage: '#e8ddc6',
    ground: '#d9ccb0',
    text: '#221c16',
    muted: '#7a6d58',
    accent: '#8e2b1d',
    word: '#1f1913',
    rule: '#c7b58f',
    glow: '#fff6e0',
    highlight: '#ffffff',
  },
}

// Local statue assets with online fallbacks for guaranteed 0ms offline availability
const DEFAULT_FIGURES = [
  {
    src: '/images/statues/apollo.jpg',
    alt: 'The Apollo Belvedere in classical marble',
    x: 58,
    y: 100,
    h: 84,
    depth: 1,
  },
  {
    src: '/images/statues/hercules.jpg',
    alt: 'The torso of a marble Hercules',
    x: 24,
    y: 103,
    h: 90,
    depth: 1.25,
  },
  {
    src: '/images/statues/icarus.jpg',
    alt: 'Classical marble Icarus sculpture',
    x: 88,
    y: 100,
    h: 100,
    depth: 0.75,
    flip: true,
    phone: false,
  },
]

const DEFAULT_BACKDROP = '/images/statues/david.jpg'

const DEFAULT_LABELS = [' Discipline', 'Creative ']

const DEFAULT_ASIDES = [
  {
    title: 'Discipline',
    text: 'Thermodynamics taught me to find the bottleneck. Front-end development taught me everything else.',
  },
  {
    title: 'Craft',
    text: 'Three.js scenes, GSAP timelines  — motion that serves the content, not the other way round.',
  },
]

const DEFAULT_ANNOTATIONS = []

const UNVEIL_MS = 2400

const OM_CURVE = [
  [0, 0],
  [0.1, 0.14],
  [0.26, 0.2],
  [0.4, 0.52],
  [0.5, 0.56],
  [0.72, 0.84],
  [0.82, 0.88],
  [1, 1],
]

function omSimulated(t) {
  if (!(t > 0)) return 0
  if (t >= 1) return 1
  for (let i = 1; i < OM_CURVE.length; i++) {
    const [t0, p0] = OM_CURVE[i - 1]
    const [t1, p1] = OM_CURVE[i]
    if (t <= t1) {
      const u = (t - t0) / (t1 - t0)
      const s = u * u * (3 - 2 * u)
      return p0 + (p1 - p0) * s
    }
  }
  return 1
}

function omRatio(p) {
  const v = Math.min(1, Math.max(0, p))
  return v.toFixed(4)
}

const round2 = (v) => Math.round(v * 100) / 100 + 0

function omMeander(cx, cy, r, depth, units) {
  const n = Math.max(4, Math.floor(units))
  const unit = (Math.PI * 2) / n
  const hook = [
    [0, 0],
    [0, 3],
    [4, 3],
    [4, 2],
    [2, 2],
    [2, 0],
    [6, 0],
  ]
  const at = (u, v) => {
    const a = -Math.PI / 2 + (u / 6) * unit
    const rr = r + (v / 3 - 0.5) * depth
    return [round2(cx + Math.cos(a) * rr), round2(cy + Math.sin(a) * rr), round2(rr)]
  }
  let d = ''
  let prevV = 0
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < hook.length; k++) {
      if (i > 0 && k === 0) continue
      const [hu, hv] = hook[k]
      const [x, y, rr] = at(i * 6 + hu, hv)
      if (i === 0 && k === 0) d = 'M' + x + ' ' + y
      else if (hv === prevV) d += ' A' + rr + ' ' + rr + ' 0 0 1 ' + x + ' ' + y
      else d += ' L' + x + ' ' + y
      prevV = hv
    }
  }
  return d
}

function omCover(iw, ih, w, h, fx, fy) {
  if (!(iw > 0) || !(ih > 0) || !(w > 0) || !(h > 0)) return { x: 0, y: 0, w: Math.max(0, w), h: Math.max(0, h) }
  const s = Math.max(w / iw, h / ih)
  const cw = iw * s
  const ch = ih * s
  const cx = Math.min(1, Math.max(0, fx))
  const cy = Math.min(1, Math.max(0, fy))
  return { x: round2((w - cw) * cx), y: round2((h - ch) * cy), w: round2(cw), h: round2(ch) }
}

function omFigureBox(x, y, h, aspect, stageW, stageH) {
  if (!(stageW > 0) || !(stageH > 0)) return { left: 0, top: 0, w: 0, h: 0 }
  const a = aspect > 0 ? aspect : 0.6
  const ph = (h / 100) * stageH
  const pw = ph * a
  return { left: round2((x / 100) * stageW - pw / 2), top: round2((y / 100) * stageH - ph), w: round2(pw), h: round2(ph) }
}

function omFit(w100, avail, maxFs, minFs) {
  if (!(w100 > 0) || !(avail > 0)) return minFs
  const fs = (avail / w100) * 100
  return Math.max(minFs, Math.min(maxFs, fs))
}

function omTransfer(threshold, softness, subject) {
  const soft = Math.max(0.02, Math.min(1, softness))
  const th = Math.min(1, Math.max(0, threshold))
  if (subject === 'light') return { slope: round2(1 / soft), intercept: round2(-(th - soft / 2) / soft) }
  return { slope: round2(-1 / soft), intercept: round2((th + soft / 2) / soft) }
}

function omRng(seed) {
  let s = seed >>> 0 || 1
  return () => {
    s ^= s << 13
    s >>>= 0
    s ^= s >>> 17
    s ^= s << 5
    s >>>= 0
    return s / 4294967296
  }
}

function omHash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619) >>> 0
  }
  return h || 1
}

function omBars(seed, count, width) {
  const rnd = omRng(seed)
  const bars = []
  const pitch = width / Math.max(1, count)
  for (let i = 0; i < count; i++) {
    const w = Math.max(1, Math.round(pitch * (0.25 + rnd() * 0.55)))
    bars.push({ x: round2(i * pitch), w })
  }
  return bars
}

function omSplit(word, script) {
  const chars = Array.from(word)
  if (!script || chars.length === 0) return { initial: '', rest: chars }
  return { initial: chars[0], rest: chars.slice(1) }
}

function omBaseline(ascent, descent) {
  if (!(ascent > 0) || !(descent >= 0)) return 0.2
  return round2(((1 + descent - ascent) / 2) * 100) / 100
}

function omNearest(px, centres, reach) {
  let best = -1
  let bestD = reach
  for (let i = 0; i < centres.length; i++) {
    const d = Math.abs(centres[i] - px)
    if (d < bestD) {
      bestD = d
      best = i
    }
  }
  return best
}

const STAR_PATH = ''
const STARS = []

function hexAlpha(hex, alpha) {
  const m = hex.replace('#', '')
  const n = m.length === 3 ? m.split('').map((c) => c + c).join('') : m
  const r = parseInt(n.slice(0, 2), 16)
  const g = parseInt(n.slice(2, 4), 16)
  const b = parseInt(n.slice(4, 6), 16)
  if ([r, g, b].some((v) => Number.isNaN(v))) return hex
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
}

function hexMix(a, b, t) {
  const p = (h) => {
    const m = h.replace('#', '')
    const n = m.length === 3 ? m.split('').map((c) => c + c).join('') : m
    return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)]
  }
  const x = p(a)
  const y = p(b)
  if (x.some((v) => Number.isNaN(v)) || y.some((v) => Number.isNaN(v))) return a
  const c = x.map((v, i) => Math.round(v + (y[i] - v) * t))
  return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('')
}

function paintGrain(seed) {
  if (typeof document === 'undefined') return ''
  const c = document.createElement('canvas')
  c.width = 160
  c.height = 160
  const ctx = c.getContext('2d')
  if (!ctx) return ''
  const img = ctx.createImageData(160, 160)
  const rnd = omRng(seed)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 96 + Math.floor(rnd() * 96)
    img.data[i] = v
    img.data[i + 1] = v
    img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  return c.toDataURL('image/png')
}

const OM_CSS = `
.om-root { position: relative; width: 100%; height: 100vh; min-height: 720px; overflow: hidden; background: var(--om-ground); color: var(--om-text); font-family: var(--om-ui); -webkit-font-smoothing: antialiased; --om-px: 0; --om-py: 0; --om-sx: 50%; --om-sy: 40%; --om-gap: 90px; --om-fill: 0%; --om-lift: 0px; box-sizing: border-box; }
.om-root svg, .om-root canvas, .om-root img { max-width: none; }
.om-root a { color: inherit; text-decoration: none; }
.om-root button { font: inherit; color: inherit; background: none; border: 0; padding: 0; margin: 0; cursor: pointer; }
.om-root :focus-visible { outline: 1px solid var(--om-accent); outline-offset: 4px; }
.om-defs { position: absolute; width: 0; height: 0; overflow: hidden; }
.om-stage { position: absolute; inset: 0; overflow: hidden; background: var(--om-ground); clip-path: inset(0 0 0 0); }

/* ---- the flood, the backdrop, the light ---------------------------------- */
.om-flood { position: absolute; inset: 0; background: radial-gradient(ellipse 90% 80% at 50% 110%, var(--om-stage-l) 0%, var(--om-stage) 55%, var(--om-stage-d) 100%); clip-path: circle(0% at 50% 56%); }
.om-root[data-phase="unveil"] .om-flood, .om-root[data-phase="landing"] .om-flood { clip-path: circle(120% at 50% 56%); transition: clip-path 1.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s; }
.om-backdrop { position: absolute; display: block; opacity: 0; filter: grayscale(1) contrast(1.15) brightness(0.55) blur(3px); transform: translate3d(calc(var(--om-px) * 4px), calc(var(--om-py) * 3px), 0) scale(1.06); }
.om-root[data-phase="landing"] .om-backdrop, .om-root[data-phase="unveil"] .om-backdrop { opacity: 0.42; transition: opacity 2.4s ease 0.9s; }
.om-root[data-tone="vellum"] .om-backdrop { filter: grayscale(1) contrast(1.1) brightness(1.15) blur(3px); mix-blend-mode: multiply; }
.om-light { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; mix-blend-mode: screen; opacity: 0; filter: blur(4px); }
.om-root[data-tone="vellum"] .om-light { mix-blend-mode: multiply; }
.om-root[data-phase="landing"] .om-light, .om-root[data-phase="unveil"] .om-light { opacity: 1; transition: opacity 2.6s ease 1.1s; }
.om-spot { position: absolute; inset: -20%; pointer-events: none; mix-blend-mode: screen; opacity: 0; background: radial-gradient(circle 30vmax at var(--om-sx) var(--om-sy), var(--om-glow-a) 0%, transparent 62%); transition: opacity 1.2s ease 1.6s; }
.om-root[data-tone="vellum"] .om-spot { mix-blend-mode: soft-light; }
.om-root[data-phase="landing"] .om-spot { opacity: 1; }
.om-flash { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 50% 50%, var(--om-glow-b) 0%, transparent 50%); opacity: 0; }
.om-root[data-phase="unveil"] .om-flash { animation: om-flash 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
@keyframes om-flash { 0% { opacity: 0; } 10% { opacity: 1; } 100% { opacity: 0; } }
.om-grain { position: absolute; inset: -32px; pointer-events: none; background-repeat: repeat; background-size: 160px 160px; opacity: var(--om-grain); mix-blend-mode: overlay; animation: om-grain 0.5s steps(1) infinite; }
@keyframes om-grain { 0% { transform: translate(0, 0); } 25% { transform: translate(-16px, 9px); } 50% { transform: translate(11px, -14px); } 75% { transform: translate(-7px, -19px); } }
.om-vignette { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 80% 70% at 50% 45%, transparent 55%, var(--om-ground-a) 100%); opacity: 0; }
.om-root[data-phase="landing"] .om-vignette { opacity: 1; transition: opacity 2s ease 1s; }

/* ---- the meander ---------------------------------------------------------- */
.om-ring { position: absolute; left: 50%; top: 50%; width: var(--om-ring); height: var(--om-ring); transform: translate(-50%, -50%); overflow: visible; pointer-events: none; }
.om-ring-spin { transform-origin: 200px 200px; animation: om-spin 90s linear infinite; }
@keyframes om-spin { to { transform: rotate(360deg); } }
.om-ring-hair { fill: none; stroke: var(--om-rule); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0; transition: opacity 1.4s ease 0.4s; }
.om-ring-key { fill: none; stroke: var(--om-accent); stroke-width: 1.3; vector-effect: non-scaling-stroke; stroke-linejoin: miter; stroke-linecap: butt; stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: opacity 0.6s ease 0.4s, stroke-dashoffset 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s; }
.om-root[data-up="true"] .om-ring-hair { opacity: 0.8; }
.om-root[data-up="true"] .om-ring-key { opacity: 0.55; stroke-dashoffset: 0; }
.om-root[data-phase="unveil"] .om-ring, .om-root[data-phase="landing"] .om-ring { transform: translate(-50%, -50%) scale(2.6); opacity: 0; transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, opacity 1s ease 0.25s; pointer-events: none; }
.om-root[data-phase="unveil"] .om-ring-key { stroke: var(--om-glow); opacity: 1; filter: drop-shadow(0 0 6px var(--om-glow)); transition: stroke 0.25s ease, opacity 0.25s ease; }

/* ---- the word ------------------------------------------------------------ */
.om-wordlayer { position: absolute; inset: 0; pointer-events: none; z-index: 3; }
.om-wordclip { position: absolute; left: 0; right: 0; bottom: 0; height: calc(var(--om-fs) * (var(--om-cap) + 0.2) + 1.4vh); overflow: visible; }
.om-word { position: absolute; left: 0; right: 0; bottom: calc(var(--om-fs) * var(--om-base) * -1 + 1.4vh); margin: 0; text-align: center; white-space: nowrap; font-family: var(--om-face); font-weight: var(--om-weight); font-size: var(--om-fs); line-height: 1; letter-spacing: calc(var(--om-tracking) * 1em); text-transform: uppercase; transform: translate3d(calc(var(--om-px) * 8px), calc(var(--om-lift) + var(--om-py) * 5px), 0); transition: transform 1.6s cubic-bezier(0.7, 0, 0.18, 1) 0.35s; }
.om-root[data-phase="load"] .om-wordlayer { z-index: 5; }
.om-root[data-phase="load"] .om-word { transition: none; }
.om-l, .om-init { display: inline-block; pointer-events: auto; color: transparent; -webkit-text-stroke: 1px var(--om-word-a); background-image: linear-gradient(to top, var(--om-word) 0%, var(--om-word) calc(var(--om-fill) - 1.2%), var(--om-glow) calc(var(--om-fill) - 0.4%), var(--om-glow) calc(var(--om-fill) + 0.3%), transparent calc(var(--om-fill) + 1.4%)); -webkit-background-clip: text; background-clip: text; opacity: 0; transform: translate3d(0, 10px, 0); transition: opacity 0.9s ease calc(0.5s + var(--i) * 55ms), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) calc(0.5s + var(--i) * 55ms), -webkit-text-stroke-color 0.4s ease, background-image 0.4s ease; }
.om-root[data-up="true"] .om-l, .om-root[data-up="true"] .om-init { opacity: 1; transform: none; }
.om-root[data-phase="landing"] .om-l, .om-root[data-phase="unveil"] .om-l, .om-root[data-phase="landing"] .om-init, .om-root[data-phase="unveil"] .om-init { background-image: linear-gradient(to top, var(--om-word), var(--om-word)); -webkit-text-stroke-color: transparent; }
.om-root[data-phase="landing"] .om-l:hover { background-image: linear-gradient(to top, transparent, transparent); -webkit-text-stroke-color: var(--om-word); transition: background-image 0.25s ease, -webkit-text-stroke-color 0.25s ease; cursor: default; }
.om-root[data-phase="landing"] .om-init, .om-root[data-phase="unveil"] .om-init { background-image: linear-gradient(to top, var(--om-accent), var(--om-accent)); }
.om-sheen { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(115deg, transparent 30%, var(--om-glow-c) 48%, var(--om-glow-d) 50%, var(--om-glow-c) 52%, transparent 70%); background-size: 260% 100%; background-position: 120% 0; opacity: 0; mix-blend-mode: screen; }
.om-root[data-phase="unveil"] .om-sheen { animation: om-sheen 1.1s cubic-bezier(0.4, 0, 0.2, 1) both; }
@keyframes om-sheen { 0% { opacity: 1; background-position: 120% 0; } 100% { opacity: 1; background-position: -40% 0; } }
.om-sp { display: inline-block; width: 0.26em; }
.om-init { font-family: var(--om-script); font-weight: 400; font-size: 1.32em; line-height: 1; letter-spacing: 0; text-transform: none; margin-right: -0.14em; position: relative; z-index: 1; vertical-align: baseline; -webkit-text-stroke-color: var(--om-accent-a); background-image: linear-gradient(to top, var(--om-accent) 0%, var(--om-accent) calc(var(--om-fill) - 1.2%), var(--om-glow) calc(var(--om-fill) - 0.4%), var(--om-glow) calc(var(--om-fill) + 0.3%), transparent calc(var(--om-fill) + 1.4%)); }

/* ---- the cast ------------------------------------------------------------ */
.om-cast { position: absolute; inset: 0; pointer-events: none; perspective: 1400px; perspective-origin: 50% 40%; z-index: 2; }
.om-cast-front { z-index: 4; }
.om-root[data-narrow="true"] .om-wordlayer { z-index: 5; }
.om-tilt { position: absolute; inset: 0; transform-style: preserve-3d; transform: rotateX(calc(var(--om-py) * var(--om-tilt) * -1deg)) rotateY(calc(var(--om-px) * var(--om-tilt) * 1deg)); }
.om-fig { position: absolute; transform-origin: 50% 100%; transform: translate3d(calc(var(--om-px) * var(--om-depth) * 22px), calc(28% + var(--om-py) * var(--om-depth) * 10px), 0); opacity: 0; filter: brightness(0.6); will-change: transform, opacity; }
.om-root[data-phase="unveil"] .om-fig, .om-root[data-phase="landing"] .om-fig { opacity: 1; filter: brightness(var(--om-exposure)); transform: translate3d(calc(var(--om-px) * var(--om-depth) * 22px), calc(var(--om-py) * var(--om-depth) * 10px), 0); transition: transform 1.7s cubic-bezier(0.16, 1, 0.3, 1) calc(0.35s + var(--i) * 140ms), opacity 1.4s ease calc(0.3s + var(--i) * 140ms), filter 1.6s ease calc(0.4s + var(--i) * 140ms); }
.om-fig-in { position: absolute; inset: 0; overflow: hidden; }
.om-fig-in img { position: absolute; left: 0; top: 0; width: 100%; height: 100%; object-fit: fill; display: block; }
.om-fig[data-flip="true"] .om-fig-in img { transform: scaleX(-1); }
.om-fig-shadow { position: absolute; left: 10%; right: 10%; bottom: -4%; height: 12%; background: radial-gradient(ellipse at 50% 50%, var(--om-ground) 0%, transparent 70%); opacity: 0; pointer-events: none; }
.om-root[data-phase="landing"] .om-fig-shadow { opacity: 0.8; transition: opacity 1.5s ease 1s; }
.om-duo { position: absolute; inset: 0; pointer-events: none; opacity: 0; }
.om-root[data-duotone="true"] .om-duo { opacity: 1; }
.om-duo-a { background: var(--om-highlight); mix-blend-mode: screen; opacity: 0.35; }
.om-duo-b { background: var(--om-stage-d); mix-blend-mode: multiply; opacity: 0.65; }

/* Hover nearest figure focus */
.om-fig[data-near="true"] {
  filter: brightness(calc(var(--om-exposure) * 1.15)) drop-shadow(0 14px 28px rgba(0,0,0,0.6));
  transform: translate3d(calc(var(--om-px) * var(--om-depth) * 22px), calc(var(--om-py) * var(--om-depth) * 10px - 14px), 30px) scale(1.035);
  transition: transform 0.45s ease-out, filter 0.45s ease-out;
}

/* ---- chrome / editorial interface ---------------------------------------- */
.om-chrome { position: absolute; inset: 0; pointer-events: none; z-index: 6; }
.om-top { position: absolute; left: clamp(18px, 3.2vw, 48px); right: clamp(18px, 3.2vw, 48px); top: clamp(16px, 2.6vw, 28px); display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; opacity: 0; transition: opacity 1.2s ease 0.3s; }
.om-root[data-up="true"] .om-top { opacity: 1; }
.om-navl, .om-navr { list-style: none; padding: 0; margin: 0; display: flex; gap: clamp(12px, 2vw, 24px); }
.om-navr { justify-content: flex-end; }
.om-top li { opacity: 0; transform: translateY(-4px); transition: opacity 0.8s ease calc(0.4s + var(--i) * 60ms), transform 0.8s ease calc(0.4s + var(--i) * 60ms); }
.om-root[data-up="true"] .om-top li { opacity: 1; transform: none; }
.om-top a, .om-top button { pointer-events: auto; color: var(--om-muted); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; transition: color 0.25s ease; }
.om-top a:hover, .om-top button:hover { color: var(--om-text); }
.om-brand { font-family: var(--om-serif); font-weight: 500; font-size: 16px; letter-spacing: 0.18em; text-align: center; color: var(--om-text); }

.om-rule { position: absolute; left: clamp(18px, 3.2vw, 48px); right: clamp(18px, 3.2vw, 48px); top: clamp(52px, 6.2vw, 76px); height: 1px; background: var(--om-rule); opacity: 0; transform: scaleX(0); transform-origin: 50% 50%; transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, opacity 1s ease 0.3s; }
.om-root[data-up="true"] .om-rule { opacity: 0.65; transform: scaleX(1); }
.om-rule[data-gap="true"] { background: linear-gradient(to right, var(--om-rule) 0%, var(--om-rule) calc(50% - var(--om-gap)), transparent calc(50% - var(--om-gap)), transparent calc(50% + var(--om-gap)), var(--om-rule) calc(50% + var(--om-gap)), var(--om-rule) 100%); }

.om-eyebrow { position: absolute; left: 50%; top: clamp(52px, 6.2vw, 76px); transform: translate(-50%, -50%); color: var(--om-muted); font-size: 10px; letter-spacing: 0.26em; text-transform: uppercase; white-space: nowrap; padding: 0 14px; opacity: 0; transition: opacity 1s ease 0.7s; }
.om-root[data-up="true"] .om-eyebrow { opacity: 1; }

.om-pill { position: absolute; top: clamp(66px, 8vw, 98px); font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--om-muted); border: 1px solid var(--om-rule); border-radius: 999px; padding: 5px 14px 4px; opacity: 0; transform: translateY(-4px); transition: opacity 0.8s ease, transform 0.8s ease, color 0.3s ease; }
.om-pill-l { left: clamp(18px, 3.2vw, 48px); }
.om-pill-r { right: clamp(18px, 3.2vw, 48px); }
.om-root[data-pills="1"] .om-pill-l, .om-root[data-pills="2"] .om-pill { opacity: 0.85; transform: none; }
.om-pill:hover { color: var(--om-text); border-color: var(--om-accent); }

.om-star { position: absolute; color: var(--om-accent); width: 14px; height: 14px; transform: translate(-50%, -50%) scale(0.6); opacity: 0; transition: opacity 1.2s ease calc(0.9s + var(--i) * 110ms), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) calc(0.9s + var(--i) * 110ms); }
.om-star svg { display: block; width: 100%; height: 100%; }
.om-root[data-up="true"] .om-star { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
.om-star-s { width: 10px; height: 10px; }
.om-star-c { color: var(--om-rule); }

.om-aside { position: absolute; width: clamp(180px, 15vw, 240px); font-size: 11px; line-height: 1.6; color: var(--om-muted); opacity: 0; transform: translateY(8px); transition: opacity 1.2s ease 1.8s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.8s; pointer-events: auto; }
.om-aside-l { left: clamp(18px, 3.2vw, 48px); top: 38%; }
.om-aside-r { right: clamp(18px, 3.2vw, 48px); top: 38%; text-align: right; }
.om-aside b { display: block; font-family: var(--om-serif); font-size: 13px; font-weight: 500; color: var(--om-text); margin-bottom: 6px; letter-spacing: 0.08em; text-transform: uppercase; }
.om-root[data-phase="landing"] .om-aside { opacity: 0.9; transform: none; }

.om-counter { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center; pointer-events: none; opacity: 0; transition: opacity 0.8s ease 0.4s; }
.om-root[data-up="true"] .om-counter { opacity: 1; }
.om-root[data-phase="unveil"] .om-counter, .om-root[data-phase="landing"] .om-counter { opacity: 0; transform: translate(-50%, -50%) scale(0.9); transition: opacity 0.5s ease, transform 0.5s ease; }
.om-num { font-family: var(--om-face); font-weight: var(--om-weight); font-size: 72px; line-height: 1; margin: 0 0 4px; color: var(--om-word); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.om-ratio { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--om-muted); display: inline-flex; align-items: center; gap: 8px; }
.om-ratio i { display: inline-block; width: 3px; height: 3px; border-radius: 50%; background: var(--om-accent); }

.om-copy { position: absolute; left: 50%; top: 22%; transform: translate(-50%, 0); text-align: center; width: min(92vw, 620px); pointer-events: auto; opacity: 0; transition: opacity 1.4s ease 1.4s; }
.om-root[data-phase="landing"] .om-copy { opacity: 1; }
.om-tagline { font-family: var(--om-serif); font-size: clamp(20px, 2.6vw, 30px); font-weight: 400; font-style: italic; color: var(--om-text); margin: 0 0 20px; line-height: 1.25; letter-spacing: 0.02em; text-shadow: 0 2px 14px var(--om-ground-c); text-wrap: balance; }
.om-tagline span { display: inline-block; opacity: 0; transform: translateY(6px); transition: opacity 0.8s ease calc(1.6s + var(--i) * 45ms), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) calc(1.6s + var(--i) * 45ms); }
.om-root[data-phase="landing"] .om-tagline span { opacity: 1; transform: none; }
.om-root .om-cta { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--om-rule); color: var(--om-text); background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(8px); padding: 12px 28px 11px; border-radius: 999px; font-size: 10.5px; letter-spacing: 0.26em; text-transform: uppercase; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 4px 20px rgba(0,0,0,0.4); }
.om-root .om-cta:hover { background: var(--om-accent); color: var(--om-ground); border-color: var(--om-accent); transform: scale(1.04); }

.om-ann { position: absolute; color: var(--om-muted); pointer-events: none; opacity: 0; transform: scale(0.9); transition: opacity 0.8s ease calc(2.3s + var(--i) * 160ms), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) calc(2.3s + var(--i) * 160ms); }
.om-root[data-phase="landing"] .om-ann { opacity: 1; transform: none; }
.om-ann svg { display: block; width: 58px; height: 30px; overflow: visible; }
.om-ann span { position: absolute; left: 62px; top: 11px; font-size: 10px; letter-spacing: 0.16em; font-variant-numeric: tabular-nums; white-space: nowrap; text-shadow: 0 1px 10px var(--om-ground-c); font-family: monospace; }

.om-foot { position: absolute; left: clamp(18px, 3.2vw, 48px); right: clamp(18px, 3.2vw, 48px); bottom: clamp(16px, 2.6vw, 30px); display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; transition: bottom 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s; }
.om-root[data-phase="unveil"] .om-foot, .om-root[data-phase="landing"] .om-foot { bottom: calc(var(--om-fs) * (var(--om-cap) + 0.03) + 1.4vh + 18px); }
.om-bars { display: block; width: 92px; height: 22px; color: var(--om-text); opacity: 0; transition: opacity 1s ease 1s; }
.om-root[data-up="true"] .om-bars { opacity: 0.75; }
.om-plate { color: var(--om-muted); font-size: 10.5px; letter-spacing: 0.26em; opacity: 0; text-shadow: 0 1px 12px var(--om-ground-c); transition: opacity 1s ease 1.1s; font-family: monospace; }
.om-root[data-up="true"] .om-plate { opacity: 1; }
.om-root[data-phase="load"] .om-plate { display: none; }

.om-skip { position: absolute; left: 50%; bottom: clamp(16px, 2.6vw, 30px); transform: translateX(-50%); color: var(--om-muted); font-size: 10.5px; letter-spacing: 0.3em; padding: 6px 14px; border: 1px solid var(--om-rule); border-radius: 999px; opacity: 0; transition: opacity 0.8s ease 1.6s, color 0.3s ease, border-color 0.3s ease; pointer-events: auto; }
.om-root[data-up="true"][data-phase="load"] .om-skip { opacity: 1; }
.om-skip:hover { color: var(--om-text); border-color: var(--om-accent); }

.om-hint { position: absolute; left: 50%; bottom: clamp(14px, 2vw, 24px); transform: translateX(-50%); display: flex; align-items: center; gap: 10px; color: var(--om-muted); font-size: 9.5px; letter-spacing: 0.3em; opacity: 0; transition: opacity 1s ease 3s; pointer-events: none; }
.om-hint i { display: block; width: 1px; height: 26px; background: linear-gradient(to bottom, transparent, var(--om-text)); animation: om-hint 2.2s ease-in-out infinite; }
@keyframes om-hint { 0% { transform: scaleY(0); transform-origin: 0 0; } 50% { transform: scaleY(1); transform-origin: 0 0; } 51% { transform-origin: 0 100%; } 100% { transform: scaleY(0); transform-origin: 0 100%; } }
.om-root[data-phase="landing"] .om-hint { opacity: 0.8; }
.om-root[data-phase="load"] .om-copy, .om-root[data-phase="load"] .om-ann, .om-root[data-phase="load"] .om-aside { visibility: hidden; }
.om-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* ---- responsive ------------------------------------------------------------ */
@media (max-width: 1023px) { .om-aside { display: none; } }
@media (max-width: 639px) {
  .om-navl, .om-navr { display: none; }
  .om-top { grid-template-columns: 1fr; justify-items: center; }
  .om-pill { top: 86px; }
  .om-pill-l { left: 18px; }
  .om-pill-r { right: 18px; }
  .om-copy { top: 20%; width: 88vw; }
  .om-star { top: 15.5% !important; }
  .om-star-s { top: 72% !important; }
  .om-tagline { font-size: clamp(19px, 6vw, 26px); }
  .om-root .om-cta { margin-top: 14px; padding: 11px 22px 10px; }
  .om-ann { display: none; }
  .om-num { font-size: 56px; }
  .om-foot { bottom: 14px; }
  .om-skip { bottom: 17%; }
  .om-hint { left: 18px; transform: none; }
}

/* ---- instant and reduced -------------------------------------------------- */
.om-root[data-instant="true"] *, .om-root[data-instant="true"] *::before, .om-root[data-instant="true"] *::after { transition-duration: 0s !important; transition-delay: 0s !important; animation-duration: 0s !important; }
@media (prefers-reduced-motion: reduce) {
  .om-root { --om-px: 0 !important; --om-py: 0 !important; --om-tilt: 0 !important; }
  .om-star svg, .om-grain, .om-ring-spin, .om-fig-in, .om-hint i { animation: none; }
  .om-word { transition: transform 0.01s linear 0.35s; }
  .om-fig { transition-duration: 0.9s !important; }
  .om-root[data-phase="unveil"] .om-ring, .om-root[data-phase="landing"] .om-ring { transform: translate(-50%, -50%); transition: opacity 0.6s ease; }
  .om-root[data-phase="unveil"] .om-flood, .om-root[data-phase="landing"] .om-flood { transition-duration: 0.6s; }
  .om-root[data-phase="unveil"] .om-sheen { animation: none; }
  .om-ring-key { transition: opacity 0.6s ease 0.4s; }
}
`

export default function OldMastersHero({
  progress,
  durationMs = 2400,
  minLoadMs = 1200,
  skippable = true,
  skipIntro = true,
  figures = DEFAULT_FIGURES,
  backdrop = DEFAULT_BACKDROP,
  wordDepth = 0.9,
  exposure = 1.05,
  duotone,
  rays = true,
  dust = true,
  tilt = 2.5,
  wordmark = 'FORGHANI',
  face = 'didone',
  scriptInitial = false,
  tagline = 'Next.js, JS & TS & PostgreSQL ,building beyond imagination ',
  eyebrow = 'Love is the key  number one',
  brand = 'E.F.',
  nav = [],
  labels = DEFAULT_LABELS,
  asides = DEFAULT_ASIDES,
  annotations = DEFAULT_ANNOTATIONS,
  plate = '',
  loadingLabel = 'Loading',
  cta = { label: 'Explore Works ' },
  onEnter,
  onLoaded,
  tone = 'noir',
  palette,
  fontHref = FONT_HREF,
  height = '100vh',
  className = '',
}) {
  const pal = { ...TONES[tone], ...(palette || {}) }
  const faceDef = FACES[face] || FACES.didone
  const isDuotone = duotone === undefined ? tone === 'carmine' : duotone

  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const numRef = useRef(null)
  const ratioRef = useRef(null)
  const wordRef = useRef(null)
  const liveRef = useRef(null)
  const eyebrowRef = useRef(null)
  const lightRef = useRef(null)

  const rawId = useId()
  const uid = useMemo(() => 'om' + rawId.replace(/[^a-zA-Z0-9_-]/g, ''), [rawId])
  const [phase, setPhase] = useState(skipIntro ? 'landing' : 'load')
  const [up, setUp] = useState(false)
  const [instant, setInstant] = useState(skipIntro)
  const [pct, setPct] = useState(skipIntro ? 100 : 0)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [naturals, setNaturals] = useState({})
  const [fontsReady, setFontsReady] = useState(() => (fontHref ? 0 : 1))
  const [grain, setGrain] = useState('')
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setGrain(paintGrain(omHash(wordmark) ^ 0x9e3779b9))
    })
    return () => cancelAnimationFrame(id)
  }, [wordmark])

  const phaseRef = useRef(phase)
  const progressRef = useRef(progress)
  const rushRef = useRef(false)
  const shownRef = useRef(skipIntro ? 1 : 0)
  const pctRef = useRef(skipIntro ? 100 : 0)
  const pointerRef = useRef({ tx: 0, ty: 0, x: 0, y: 0, sx: 50, sy: 40, near: -1, inside: false })
  const centresRef = useRef([])
  const onLoadedRef = useRef(onLoaded)
  const onEnterRef = useRef(onEnter)

  useEffect(() => {
    phaseRef.current = phase
    progressRef.current = progress
    onLoadedRef.current = onLoaded
    onEnterRef.current = onEnter
  })

  const chars = useMemo(() => omSplit(wordmark, scriptInitial), [wordmark, scriptInitial])

  const metrics = useMemo(() => {
    if (!size.w || !size.h || typeof document === 'undefined') return { base: 0.16, cap: 0.7 }
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    if (!ctx) return { base: 0.16, cap: 0.7 }
    ctx.font = faceDef.weight + ' 100px ' + faceDef.family
    const h = ctx.measureText('H')
    const cap = h.actualBoundingBoxAscent > 0 ? h.actualBoundingBoxAscent / 100 : 0.7
    const base = omBaseline(h.fontBoundingBoxAscent / 100, h.fontBoundingBoxDescent / 100)
    return { base, cap: Math.round(cap * 100) / 100 }
  }, [size.w, size.h, faceDef.weight, faceDef.family])

  const fs = useMemo(() => {
    if (!size.w || !size.h || typeof document === 'undefined') return 120
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    if (!ctx) return 120
    const rest = chars.rest.join('').toUpperCase()
    ctx.font = faceDef.weight + ' 100px ' + faceDef.family
    let w100 = ctx.measureText(rest).width + Math.max(0, chars.rest.length - 1) * faceDef.tracking * 100
    if (chars.initial) {
      ctx.font = '400 132px ' + SCRIPT_FAMILY
      w100 += ctx.measureText(chars.initial).width - 14
    }
    const pad = Math.max(10, size.w * 0.025)
    const maxFs = (size.h * 0.34) / metrics.cap
    return Math.round(omFit(w100, size.w - pad * 2, maxFs, 36))
  }, [size.w, size.h, chars, faceDef, metrics.cap])
  const keyPath = useMemo(() => omMeander(200, 200, 176, 22, 32), [])
  const bars = useMemo(() => omBars(omHash(wordmark), 34, 92), [wordmark])
  const narrow = size.w > 0 && size.w < 640
  const cast = useMemo(() => figures.filter((f) => !narrow || f.phone !== false), [figures, narrow])

  useEffect(() => {
    centresRef.current = cast.map((f) => f.x / 100)
  }, [cast])

  // Injected Google Fonts for Bodoni Moda & Pinyon Script
  useEffect(() => {
    if (!fontHref) {
      return
    }
    if (!document.querySelector('link[data-om-fonts="' + fontHref + '"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = fontHref
      link.setAttribute('data-om-fonts', fontHref)
      document.head.appendChild(link)
    }
    let live = true
    const go = () => {
      if (live) setFontsReady((n) => n + 1)
    }
    const timer = setTimeout(go, 2500)
    const fonts = document.fonts
    if (fonts && fonts.load) {
      Promise.all(FONT_PROBES.map((f) => fonts.load(f).catch(() => null))).then(go, go)
      fonts.addEventListener('loadingdone', go)
    } else go()
    return () => {
      live = false
      clearTimeout(timer)
      if (fonts && fonts.removeEventListener) fonts.removeEventListener('loadingdone', go)
    }
  }, [fontHref])

  // Responsive stage observer
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const read = () => {
      const r = el.getBoundingClientRect()
      setSize((s) => (Math.abs(s.w - r.width) < 0.5 && Math.abs(s.h - r.height) < 0.5 ? s : { w: r.width, h: r.height }))
    }
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Viewport visibility observer to halt expensive rAF & canvas rendering when scrolled away
  const isVisibleRef = useRef(true)
  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.02 }
    )
    observer.observe(el)

    const onVis = () => {
      if (document.hidden) {
        isVisibleRef.current = false
      } else if (el) {
        const r = el.getBoundingClientRect()
        isVisibleRef.current = r.bottom > 0 && r.top < window.innerHeight
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  // Image preloading to compute aspect ratios and luminance masks
  const srcKey = figures.map((f) => f.src).join('\n') + '\n' + (backdrop || '')
  useEffect(() => {
    if (typeof Image === 'undefined') return
    let live = true
    const list = srcKey.split('\n').filter(Boolean)
    for (const src of list) {
      const img = new Image()
      img.onload = () => {
        if (live) setNaturals((n) => (n[src] ? n : { ...n, [src]: { w: img.naturalWidth, h: img.naturalHeight } }))
      }
      img.src = src
    }
    return () => {
      live = false
    }
  }, [srcKey])

  // Gap calculation for the hairline rule around the eyebrow
  useEffect(() => {
    const el = eyebrowRef.current
    const root = rootRef.current
    if (!el || !root) return
    const read = () => root.style.setProperty('--om-gap', Math.round(el.offsetWidth / 2 + 14) + 'px')
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [eyebrow, fontsReady])

  // Curtain up sequence
  useEffect(() => {
    const t = setTimeout(() => setUp(true), 60)
    return () => clearTimeout(t)
  }, [])

  // SkipIntro instant mode cleanup
  useEffect(() => {
    if (!instant) return
    const t = setTimeout(() => setInstant(false), 80)
    return () => clearTimeout(t)
  }, [instant])

  // Animation frame loop: simulated load, smooth pointer tilt, and figure proximity detection
  useEffect(() => {
    const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let last = performance.now()
    const start = last
    let done = phaseRef.current !== 'load'
    const tick = (now) => {
      if (!isVisibleRef.current) {
        raf = requestAnimationFrame(tick)
        return
      }
      const dt = Math.min(64, now - last)
      last = now
      const root = rootRef.current

      // The simulated marble filling load
      if (!done) {
        const elapsed = now - start
        const external = progressRef.current
        let target =
          external === undefined
            ? omSimulated(elapsed / Math.max(400, durationMs))
            : Math.min(1, Math.max(0, external / 100))
        if (rushRef.current) target = 1
        const k = 1 - Math.exp(-dt / (rushRef.current ? 90 : 170))
        let shown = shownRef.current + (target - shownRef.current) * k
        if (target >= 1 && shown > 0.995) shown = 1
        shownRef.current = Math.max(shownRef.current, shown)
        const s = shownRef.current
        if (wordRef.current) wordRef.current.style.setProperty('--om-fill', (s * 100).toFixed(2) + '%')
        const p = Math.round(s * 100)
        if (p !== pctRef.current) {
          pctRef.current = p
          if (numRef.current) numRef.current.textContent = String(p)
          if (ratioRef.current) ratioRef.current.textContent = omRatio(s)
          if (p % 10 === 0 || p === 100) setPct(p)
        }
        if (s >= 1 && (elapsed >= minLoadMs || rushRef.current)) {
          done = true
          setPct(100)
          if (wordRef.current) wordRef.current.style.setProperty('--om-fill', '102%')
          setPhase('unveil')
        }
      }

      // Parallax tilt, spotlight follow, nearest figure detection
      const pt = pointerRef.current
      if (root && !reduced) {
        const ease = 1 - Math.exp(-dt / 240)
        pt.x += (pt.tx - pt.x) * ease
        pt.y += (pt.ty - pt.y) * ease
        const sx = 50 + pt.tx * 24
        const sy = 40 + pt.ty * 22
        pt.sx += (sx - pt.sx) * ease
        pt.sy += (sy - pt.sy) * ease
        root.style.setProperty('--om-px', pt.x.toFixed(3))
        root.style.setProperty('--om-py', pt.y.toFixed(3))
        root.style.setProperty('--om-sx', pt.sx.toFixed(2) + '%')
        root.style.setProperty('--om-sy', pt.sy.toFixed(2) + '%')
        const near = pt.inside && phaseRef.current === 'landing' ? omNearest((pt.tx + 1) / 2, centresRef.current, 0.22) : -1
        if (near !== pt.near) {
          pt.near = near
          const figs = root.querySelectorAll('.om-fig')
          figs.forEach((f) => f.setAttribute('data-near', f.getAttribute('data-index') === String(near) ? 'true' : 'false'))
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs, minLoadMs])

  // Volumetric light rays and drifting dust particles canvas
  useEffect(() => {
    const canvas = lightRef.current
    if (!canvas || (!rays && !dust)) return
    const ctx = canvas.getContext('2d')
    if (!ctx || !size.w || !size.h) return
    const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(1.5, typeof devicePixelRatio === 'number' ? devicePixelRatio : 1)
    const w = Math.round(size.w)
    const h = Math.round(size.h)
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    const rnd = omRng(omHash(wordmark) ^ 0x51ed27)
    const motes = Array.from({ length: dust ? Math.round(Math.min(140, (w * h) / 11000)) : 0 }, () => ({
      x: rnd() * w,
      y: rnd() * h,
      r: 0.5 + rnd() * 1.3,
      vx: (rnd() - 0.5) * 6,
      vy: -4 - rnd() * 9,
      a: rnd() * Math.PI * 2,
      s: 0.6 + rnd() * 1.2,
    }))
    const shafts = Array.from({ length: rays ? 7 : 0 }, (_, i) => ({
      a: -0.46 + (i / 6) * 0.92 + (rnd() - 0.5) * 0.08,
      w: 0.035 + rnd() * 0.05,
      k: 0.6 + rnd() * 0.8,
      o: rnd() * Math.PI * 2,
    }))
    const glow = pal.glow
    const ink = tone === 'vellum'
    let raf = 0
    let last = performance.now()
    const draw = (now) => {
      if (!isVisibleRef.current) {
        if (!reduced) raf = requestAnimationFrame(draw)
        return
      }
      const dt = Math.min(64, now - last) / 1000
      last = now
      const t = now / 1000
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = ink ? 'source-over' : 'lighter'
      const ox = w * 0.5
      const oy = -h * 0.55
      const len = h * 1.9
      for (const s of shafts) {
        const a = Math.PI / 2 + s.a + Math.sin(t * 0.11 * s.k + s.o) * 0.05
        const alpha = (ink ? 0.06 : 0.055) * (0.7 + 0.3 * Math.sin(t * 0.23 * s.k + s.o))
        const g = ctx.createLinearGradient(ox, oy, ox + Math.cos(a) * len, oy + Math.sin(a) * len)
        g.addColorStop(0, hexAlpha(ink ? pal.accent : glow, alpha))
        g.addColorStop(0.55, hexAlpha(ink ? pal.accent : glow, alpha * 0.5))
        g.addColorStop(1, hexAlpha(ink ? pal.accent : glow, 0))
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.moveTo(ox, oy)
        ctx.lineTo(ox + Math.cos(a - s.w) * len, oy + Math.sin(a - s.w) * len)
        ctx.lineTo(ox + Math.cos(a + s.w) * len, oy + Math.sin(a + s.w) * len)
        ctx.closePath()
        ctx.fill()
      }
      for (const m of motes) {
        if (!reduced) {
          m.x += (m.vx + Math.sin(t * m.s + m.a) * 4) * dt
          m.y += m.vy * dt
          if (m.y < -4) {
            m.y = h + 4
            m.x = rnd() * w
          }
          if (m.x < -4) m.x = w + 4
          if (m.x > w + 4) m.x = -4
        }
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.7 * m.s + m.a))
        ctx.fillStyle = hexAlpha(ink ? pal.accent : glow, (ink ? 0.35 : 0.55) * tw)
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [size, rays, dust, pal.glow, pal.accent, tone, wordmark])

  // Phase transition from unveil to permanent landing
  useEffect(() => {
    if (phase === 'unveil') {
      const t = setTimeout(() => setPhase('landing'), UNVEIL_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'landing') {
      if (liveRef.current) liveRef.current.textContent = wordmark + '. ' + (tagline || '')
      onLoadedRef.current?.()
    }
  }, [phase, wordmark, tagline])

  const rush = useCallback(() => {
    if (!skippable || phaseRef.current !== 'load') return
    sound.playClick()
    rushRef.current = true
  }, [skippable])

  const onKey = (e) => {
    if (phase === 'load' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      rush()
    }
  }

  const onPointerMove = (e) => {
    const el = stageRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const pt = pointerRef.current
    pt.tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2))
    pt.ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2))
    pt.inside = true
  }

  const onPointerLeave = () => {
    pointerRef.current.tx = 0
    pointerRef.current.ty = 0
    pointerRef.current.inside = false
  }

  // Smooth scroll down to next section (#about / Manifesto)
  const enter = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    sound.playClick()
    if (onEnterRef.current) {
      onEnterRef.current()
    } else if (typeof window !== 'undefined') {
      if (window.__lenis) {
        window.__lenis.scrollTo('#about', { offset: -40, duration: 1.2 })
      } else {
        const target = document.getElementById('about')
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
        }
      }
    }
  }

  const boxes = cast.map((f) => {
    const nat = naturals[f.src]
    const aspect = nat ? nat.w / nat.h : 0.62
    return omFigureBox(f.x, f.y ?? 100, f.h, aspect, size.w, size.h)
  })
  const backNat = backdrop ? naturals[backdrop] : undefined
  const backBox = backdrop ? omCover(backNat?.w ?? 0, backNat?.h ?? 0, size.w, size.h, 0.5, 0.4) : null
  const ringPx = Math.round(Math.max(260, Math.min(760, Math.min(size.w || 900, size.h || 700) * 0.78)))
  const pills = phase === 'load' ? (pct >= 50 ? 2 : pct >= 20 ? 1 : 0) : 2
  const leftNav = nav.slice(0, Math.ceil(nav.length / 2))
  const rightNav = nav.slice(Math.ceil(nav.length / 2))
  const taglineWords = (tagline || '').split(/\s+/).filter(Boolean)

  const wordBottomPx = fs * metrics.base * -1 + size.h * 0.014
  const wordMid = wordBottomPx + (fs * metrics.cap) / 2
  const lift = phase === 'load' && size.h ? -(size.h / 2 - wordMid) : 0

  const vars = {
    '--om-stage': pal.stage,
    '--om-stage-l': hexMix(pal.stage, pal.glow, tone === 'vellum' ? 0.35 : 0.14),
    '--om-stage-d': hexMix(pal.stage, pal.ground, 0.55),
    '--om-ground': pal.ground,
    '--om-ground-a': hexAlpha(pal.ground, tone === 'vellum' ? 0.35 : 0.85),
    '--om-ground-b': hexAlpha(pal.ground, 0.7),
    '--om-ground-c': hexAlpha(pal.ground, 0.6),
    '--om-ground-d': hexAlpha(pal.ground, 0.3),
    '--om-text': pal.text,
    '--om-muted': pal.muted,
    '--om-accent': pal.accent,
    '--om-accent-a': hexAlpha(pal.accent, 0.75),
    '--om-word': pal.word,
    '--om-word-a': hexAlpha(pal.word, 0.7),
    '--om-rule': pal.rule,
    '--om-glow': pal.glow,
    '--om-highlight': pal.highlight,
    '--om-glow-a': hexAlpha(pal.glow, tone === 'vellum' ? 0.5 : 0.22),
    '--om-glow-b': hexAlpha(pal.glow, 0.55),
    '--om-glow-c': hexAlpha(pal.glow, 0.25),
    '--om-glow-d': hexAlpha(pal.glow, 0.75),
    '--om-face': faceDef.family,
    '--om-weight': String(faceDef.weight),
    '--om-tracking': String(faceDef.tracking),
    '--om-base': String(metrics.base + (chars.initial ? 0.1 : 0)),
    '--om-cap': String(metrics.cap),
    '--om-script': SCRIPT_FAMILY,
    '--om-ui': UI_FAMILY,
    '--om-serif': SERIF_FAMILY,
    '--om-fs': fs + 'px',
    '--om-lift': Math.round(lift) + 'px',
    '--om-exposure': String(Math.max(0.2, exposure)),
    '--om-tilt': String(Math.max(0, tilt)),
    '--om-ring': ringPx + 'px',
    '--om-grain': tone === 'vellum' ? 0.16 : tone === 'carmine' ? 0.11 : 0.09,
    height,
  }

  return (
    <section
      id="hero"
      ref={rootRef}
      className={'om-root ' + className}
      style={vars}
      data-phase={phase}
      data-tone={tone}
      data-face={face}
      data-up={up ? 'true' : 'false'}
      data-pills={pills}
      data-duotone={isDuotone ? 'true' : 'false'}
      data-instant={instant ? 'true' : 'false'}
      data-narrow={narrow ? 'true' : 'false'}
      onClick={phase === 'load' ? rush : undefined}
      onKeyDown={onKey}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      tabIndex={phase === 'load' && skippable ? 0 : -1}
      aria-busy={phase === 'load'}
    >
      <style dangerouslySetInnerHTML={{ __html: OM_CSS }} />
      <svg className="om-defs" aria-hidden="true" focusable="false">
        <defs>
          {cast.map((f, i) => {
            const tr = omTransfer(
              f.threshold ?? (f.subject === 'dark' ? 0.72 : 0.2),
              f.softness ?? 0.16,
              f.subject ?? 'light'
            )
            const box = boxes[i]
            return (
              <React.Fragment key={i}>
                <filter id={uid + '-k' + i} colorInterpolationFilters="sRGB" x="0" y="0" width="1" height="1">
                  <feColorMatrix
                    type="matrix"
                    values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"
                  />
                  <feComponentTransfer>
                    <feFuncR type="linear" slope={tr.slope} intercept={tr.intercept} />
                    <feFuncG type="linear" slope={tr.slope} intercept={tr.intercept} />
                    <feFuncB type="linear" slope={tr.slope} intercept={tr.intercept} />
                  </feComponentTransfer>
                </filter>
                {box.w > 0 && (
                  <mask
                    id={uid + '-m' + i}
                    maskUnits="userSpaceOnUse"
                    maskContentUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width={box.w}
                    height={box.h}
                    style={{ maskType: 'luminance' }}
                  >
                    <image
                      href={f.src}
                      x="0"
                      y="0"
                      width={box.w}
                      height={box.h}
                      preserveAspectRatio="none"
                      filter={'url(#' + uid + '-k' + i + ')'}
                      transform={f.flip ? 'translate(' + box.w + ' 0) scale(-1 1)' : undefined}
                    />
                  </mask>
                )}
              </React.Fragment>
            )
          })}
        </defs>
      </svg>

      <div ref={stageRef} className="om-stage">
        <div className="om-flood" />
        {backdrop && backBox && (
          <img
            className="om-backdrop"
            src={backdrop}
            alt=""
            draggable={false}
            decoding="async"
            style={{
              left: backBox.x,
              top: backBox.y,
              width: backBox.w || '100%',
              height: backBox.h || '100%',
              maxWidth: 'none',
            }}
          />
        )}

        <svg className="om-ring" viewBox="0 0 400 400" aria-hidden="true">
          <g className="om-ring-spin">
            <circle className="om-ring-hair" cx="200" cy="200" r="198" />
            <circle className="om-ring-hair" cx="200" cy="200" r="154" />
            <path className="om-ring-key" d={keyPath} pathLength={1} />
          </g>
        </svg>

        <div className="om-wordlayer">
          <div className="om-wordclip">
            <h1
              ref={wordRef}
              className="om-word"
              aria-label={wordmark}
              style={{ '--om-fill': skipIntro ? '102%' : '0%' }}
            >
              {chars.initial && (
                <span className="om-init" style={{ '--i': 0 }} aria-hidden="true">
                  {chars.initial}
                </span>
              )}
              {chars.rest.map((ch, k) =>
                ch === ' ' ? (
                  <span key={k} className="om-sp" aria-hidden="true" />
                ) : (
                  <span
                    key={k}
                    className="om-l"
                    style={{ '--i': k + (chars.initial ? 1 : 0) }}
                    aria-hidden="true"
                  >
                    {ch}
                  </span>
                )
              )}
            </h1>
          </div>
          <div className="om-sheen" aria-hidden="true" />
        </div>

        {[false, true].map((front) => (
          <div key={front ? 'front' : 'back'} className={'om-cast' + (front ? ' om-cast-front' : '')} aria-hidden="true">
            <div className="om-tilt">
              {cast.map((f, i) => {
                const box = boxes[i]
                if (!(box.w > 0) || ((f.depth ?? 1) >= wordDepth) !== front) return null
                return (
                  <div
                    key={i}
                    className="om-fig"
                    data-index={i}
                    data-flip={f.flip ? 'true' : 'false'}
                    data-near="false"
                    style={{
                      left: box.left,
                      top: box.top,
                      width: box.w,
                      height: box.h,
                      '--i': i,
                      '--om-depth': f.depth ?? 1,
                      zIndex: Math.round((f.depth ?? 1) * 100),
                    }}
                  >
                    <div className="om-fig-shadow" />
                    <div
                      className="om-fig-in"
                      style={{
                        WebkitMask: 'url(#' + uid + '-m' + i + ')',
                        mask: 'url(#' + uid + '-m' + i + ')',
                      }}
                    >
                      <img
                        src={f.src}
                        alt={f.alt || ''}
                        draggable={false}
                        decoding="async"
                        style={{ maxWidth: 'none' }}
                      />
                      <div className="om-duo om-duo-a" />
                      <div className="om-duo om-duo-b" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <canvas ref={lightRef} className="om-light" aria-hidden="true" />
        <div className="om-spot" />
        <div className="om-vignette" />
        <div
          className="om-grain"
          style={grain ? { backgroundImage: 'url(' + grain + ')' } : undefined}
          aria-hidden="true"
        />
        <div className="om-flash" aria-hidden="true" />

        <div className="om-chrome">
          {nav.length > 0 && (
            <header className="om-top om-ui">
              <nav aria-label="Primary, left">
                <ul className="om-navl">
                  {leftNav.map((l, k) => (
                    <li key={k} style={{ '--i': k }}>
                      {l.href ? <a href={l.href}>{l.label}</a> : <button type="button">{l.label}</button>}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="om-brand">{brand}</div>
              <nav aria-label="Primary, right">
                <ul className="om-navr">
                  {rightNav.map((l, k) => (
                    <li key={k} style={{ '--i': k + leftNav.length }}>
                      {l.href ? <a href={l.href}>{l.label}</a> : <button type="button">{l.label}</button>}
                    </li>
                  ))}
                </ul>
              </nav>
            </header>
          )}

          <div className="om-rule" data-gap={eyebrow ? 'true' : 'false'} aria-hidden="true" />
          {eyebrow && (
            <div ref={eyebrowRef} className="om-eyebrow om-ui">
              {eyebrow}
            </div>
          )}

          {labels[0] && <div className="om-pill om-pill-l om-ui">{labels[0]}</div>}
          {labels[1] && <div className="om-pill om-pill-r om-ui">{labels[1]}</div>}

          {STARS.map((s, k) => (
            <div
              key={k}
              className={'om-star' + (s.small ? ' om-star-s' : '') + (s.under ? ' om-star-c' : '')}
              style={{ left: s.x, top: s.y, '--i': k }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24">
                <path d={STAR_PATH} fill="currentColor" />
              </svg>
            </div>
          ))}

          {asides[0] && (
            <aside className="om-aside om-aside-l">
              <b>{asides[0].title}</b>
              <p>{asides[0].text}</p>
            </aside>
          )}
          {asides[1] && (
            <aside className="om-aside om-aside-r">
              <b>{asides[1].title}</b>
              <p>{asides[1].text}</p>
            </aside>
          )}

          <div
            className="om-counter"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label={loadingLabel}
          >
            <p className="om-num" aria-hidden="true">
              <span ref={numRef}>{skipIntro ? 100 : 0}</span>
            </p>
            <div className="om-ratio om-ui" aria-hidden="true">
              <span ref={ratioRef}>{skipIntro ? '1.0000' : '0.0000'}</span>
              <i />
              <span>{loadingLabel}</span>
            </div>
          </div>

          <div className="om-copy">
            {taglineWords.length > 0 && (
              <p className="om-tagline">
                {taglineWords.map((w, k) => (
                  <React.Fragment key={k}>
                    <span style={{ '--i': k }}>{w}</span>
                    {k < taglineWords.length - 1 ? ' ' : null}
                  </React.Fragment>
                ))}
              </p>
            )}
            {cta &&
              (cta.href ? (
                <a className="om-cta" href={cta.href} onClick={enter}>
                  {cta.label}
                </a>
              ) : (
                <button type="button" className="om-cta" onClick={enter}>
                  {cta.label}
                </button>
              ))}
          </div>

          {annotations.map((a, k) => (
            <div
              key={k}
              className="om-ann"
              style={{ left: a.x + '%', top: a.y + '%', '--i': k }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 58 30" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M0.5 8V0.5H8M50 0.5H57.5V8M57.5 22V29.5H50M8 29.5H0.5V22" />
              </svg>
              <span className="om-ui">{a.label}</span>
            </div>
          ))}

          <div className="om-foot">
            <svg className="om-bars" viewBox="0 0 92 22" aria-hidden="true">
              {bars.map((b, k) => (
                <rect key={k} x={b.x} y="0" width={b.w} height="22" fill="currentColor" />
              ))}
            </svg>
            <div className="om-plate om-ui">
            
            </div>
          </div>

          {skippable && phase === 'load' && (
            <button type="button" className="om-skip om-ui" onClick={rush}>
              Skip
            </button>
          )}

          <div className="om-hint om-ui" aria-hidden="true">
           
          </div>
          <div ref={liveRef} className="om-live" aria-live="polite" />
        </div>
      </div>
    </section>
  )
}
