'use client'

import React, { useState } from 'react'
import { sound } from '../../utils/audio'
import { Zap, Database, Box, Cpu, Server, Activity, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function SystemPipelineSimulator() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [telemetry, setTelemetry] = useState({
    throughput: '120 req/s',
    cacheLatency: '0.19 ms',
    cacheHitRate: '99.4%',
    dbLoad: '4.2%',
    status: 'OPTIMAL EQUILIBRIUM',
  })

  const handleSimulateSurge = () => {
    sound.playClick()
    setIsSimulating(true)
    setTelemetry({
      throughput: '14,850 req/s',
      cacheLatency: '0.31 ms',
      cacheHitRate: '99.8%',
      dbLoad: '11.8%',
      status: 'SURGE BUFFERED BY CACHE',
    })

    sound.playStickerPop()

    setTimeout(() => {
      setTelemetry({
        throughput: '240 req/s',
        cacheLatency: '0.20 ms',
        cacheHitRate: '99.5%',
        dbLoad: '4.8%',
        status: 'EQUILIBRIUM RESTORED',
      })
      setIsSimulating(false)
    }, 3500)
  }

  return (
    <div className="my-16 p-6 sm:p-10 rounded-3xl glass-holographic border border-white/20 shadow-2xl overflow-hidden relative select-none">
      {/* Background glowing indicator */}
      <div
        className={`absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none transition-opacity duration-700 ${
          isSimulating ? 'opacity-40' : 'opacity-10'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(253, 230, 138, 0.2) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-400 block mb-1">
            Interactive Architecture Telemetry
          </span>
          <h3 className="font-syne font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
            Thermodynamic System Pipeline
          </h3>
        </div>

        <button
          type="button"
          onClick={handleSimulateSurge}
          disabled={isSimulating}
          data-cursor="SURGE"
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer ${
            isSimulating
              ? 'bg-rose-500 text-white animate-pulse'
              : 'bg-white text-black hover:bg-slate-200 hover:scale-105'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-slate-800" />
          <span>{isSimulating ? 'Surge In Flight (14,850 req/s)...' : 'Simulate Traffic Surge'}</span>
        </button>
      </div>

      {/* 3 Pipeline Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-8">
        {/* Node 1: Edge Frontend */}
        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between relative group hover:border-cyan-400/50 transition-colors min-w-0">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
              <span>TIER 01</span>
              <span className="text-cyan-400">EDGE CLIENT</span>
            </div>
            <h4 className="font-syne font-bold text-base sm:text-lg text-white mb-2 flex items-center gap-2 break-words">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="truncate">Next.js 16 + Three.js</span>
            </h4>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed break-words">
              React 19 Server Components dispatching lightweight async fetch payloads over HTTP/2.
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 text-[11px] font-mono text-neutral-300 flex items-center justify-between">
            <span>Payload:</span>
            <span className="text-white font-bold">JSON Stream</span>
          </div>
        </div>

        {/* Node 2: In-Memory Cache (simulated) */}
        <div
          className={`p-5 sm:p-6 rounded-2xl border transition-all duration-500 flex flex-col justify-between relative group min-w-0 ${
            isSimulating
              ? 'bg-rose-950/40 border-rose-400/80 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
              : 'glass-panel border-white/20'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
              <span>TIER 02</span>
              <span className="text-rose-400 font-bold">IN-MEMORY CACHE</span>
            </div>
            <h4 className="font-syne font-bold text-base sm:text-lg text-white mb-2 flex items-center gap-2 break-words">
              <Zap className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="truncate">Cache Tier</span>
            </h4>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed break-words">
              A modeled in-memory cache absorbing bursts — the numbers are part of the simulation, not production stats.
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 text-[11px] font-mono text-neutral-300 flex items-center justify-between">
            <span>Latency:</span>
            <span className="text-emerald-400 font-bold font-mono">{telemetry.cacheLatency}</span>
          </div>
        </div>

        {/* Node 3: Persistence (simulated) */}
        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between relative group hover:border-emerald-400/50 transition-colors min-w-0">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
              <span>TIER 03</span>
              <span className="text-emerald-400">PERSISTENCE</span>
            </div>
            <h4 className="font-syne font-bold text-base sm:text-lg text-white mb-2 flex items-center gap-2 break-words">
              <Database className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">Database Tier</span>
            </h4>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed break-words">
              A modeled persistence layer with connection pooling under surge load — chemistry, applied to traffic.
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 text-[11px] font-mono text-neutral-300 flex items-center justify-between">
            <span>Pool CPU:</span>
            <span className="text-white font-bold">{telemetry.dbLoad}</span>
          </div>
        </div>
      </div>

      {/* Live Telemetry Bar */}
      <div className="p-4 rounded-xl bg-[#0c1527]/80 border border-[#f4ede0]/15 flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 min-w-0">
          <Activity className={`w-3.5 h-3.5 shrink-0 ${isSimulating ? 'text-rose-400 animate-spin' : 'text-emerald-400'}`} />
          <span className="text-neutral-400">Throughput:</span>
          <span className="text-white font-bold">{telemetry.throughput}</span>
        </div>

        <div className="flex items-center gap-2 min-w-0">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-neutral-400">Cache Hit:</span>
          <span className="text-emerald-300 font-bold">{telemetry.cacheHitRate}</span>
        </div>

        <div className="flex items-center gap-2 min-w-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="text-neutral-400">State:</span>
          <span className="text-slate-200 uppercase font-bold truncate">{telemetry.status}</span>
        </div>
      </div>
    </div>
  )
}
