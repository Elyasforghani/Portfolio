import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#060709] text-neutral-100 px-6 overflow-hidden selection:bg-slate-200 selection:text-black">
      {/* Ambient corner reticles */}
      <div className="absolute top-6 left-6 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 pointer-events-none flex items-center gap-1.5">
        <span className="text-slate-300">+</span>
        <span>ERROR 404 // ROUTE NOT FOUND</span>
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 pointer-events-none flex items-center gap-1.5">
        <span className="text-slate-400">+</span>
        <span>EDITION 2026 // SPATIAL ARCHITECTURE</span>
      </div>
      <div className="absolute bottom-6 left-6 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 pointer-events-none flex items-center gap-1.5">
        <span className="text-slate-400">+</span>
        <span>ENGINE: NEXT.JS 16 &bull; THREE.JS &bull; GSAP</span>
      </div>

      {/* Aurora glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(226, 232, 240, 0.15) 0%, rgba(148, 163, 184, 0.08) 45%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-xs font-mono uppercase tracking-[0.35em] text-slate-300 mb-6 flex items-center gap-2">
          <Compass className="w-3.5 h-3.5" />
          LOST IN THE SPATIAL VOID
        </span>

        <h1 className="font-syne font-black text-[28vw] sm:text-[18vw] leading-none tracking-tighter chromatic-text select-none">
          404
        </h1>

        <p className="font-serif italic text-2xl sm:text-3xl text-slate-200 mt-2 mb-8 lowercase">
          this route drifted out of orbit
        </p>

        <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light leading-relaxed mb-10">
          The coordinates you requested do not map to any known system in the archive.
          Teleport back to the overview and navigate from there.
        </p>

        <Link
          href="/"
          data-cursor="HOME"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-syne font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(226,232,240,0.25)]"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Return to the Overview</span>
        </Link>
      </div>
    </div>
  )
}
