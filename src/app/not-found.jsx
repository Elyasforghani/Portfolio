import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative flex flex-col items-center justify-center min-h-dvh bg-[#14213d] text-[#f4ede0] px-6 overflow-hidden selection:bg-[#f4ede0] selection:text-[#14213d]"
    >
      {/* Ambient corner reticles */}
      <div aria-hidden="true" className="hidden sm:flex absolute top-6 left-6 text-xs font-mono uppercase tracking-[0.22em] text-[#c4b7a1] pointer-events-none items-center gap-1.5">
        <span className="text-[#ff6b5b]">+</span>
        <span>ERROR 404 // ROUTE NOT FOUND</span>
      </div>
      <div aria-hidden="true" className="hidden sm:flex absolute top-6 right-6 text-xs font-mono uppercase tracking-[0.22em] text-[#c4b7a1] pointer-events-none items-center gap-1.5">
        <span className="text-[#ff6b5b]">+</span>
        <span>EDITION 2026 // SPATIAL ARCHITECTURE</span>
      </div>
      <div aria-hidden="true" className="hidden sm:flex absolute bottom-6 left-6 text-xs font-mono uppercase tracking-[0.22em] text-[#c4b7a1] pointer-events-none items-center gap-1.5">
        <span className="text-[#ff6b5b]">+</span>
        <span>ENGINE: NEXT.JS 16 &bull; THREE.JS &bull; GSAP</span>
      </div>

      {/* Coral aura glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 107, 91, 0.25) 0%, rgba(244, 237, 224, 0.08) 45%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#ff6b5b] mb-6 flex items-center gap-2 font-semibold">
          <Compass className="w-3.5 h-3.5" aria-hidden="true" />
          LOST IN THE SPATIAL VOID
        </span>

        <h1 className="font-syne font-black text-[28vw] sm:text-[18vw] leading-none tracking-tighter text-[#f4ede0] select-none">
          404
        </h1>

        <p className="font-serif italic text-2xl sm:text-3xl text-[#f4ede0] mt-2 mb-8 lowercase">
          this route drifted out of orbit
        </p>

        <p className="text-sm sm:text-base text-[#c4b7a1] max-w-md font-light leading-relaxed mb-10">
          The coordinates you requested do not map to any known system in the archive.
          Return to the overview and navigate from there.
        </p>

        <Link
          href="/"
          data-cursor="HOME"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ff6b5b] text-[#14213d] font-syne font-bold text-xs uppercase tracking-widest hover:bg-[#ff8577] transition-all duration-300 hover:scale-105 shadow-xl"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span>Return to the Overview</span>
        </Link>
      </div>
    </main>
  )
}
