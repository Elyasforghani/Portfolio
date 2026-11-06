'use client'

import React, { useState, useEffect } from 'react'
import { sound } from '../../utils/audio'
import { Send, X, CheckCircle2, ArrowRight } from 'lucide-react'

const SCOPES = [
  'Full-Stack Role',
  'Spatial WebGL / 3D',
  'Backend & APIs',
  'Technical Direction',
]

export default function TransmissionDrawer({ isOpen, onClose }) {
  const [selectedScope, setSelectedScope] = useState('Full-Stack Role')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSent, setIsSent] = useState(false)

  // Freeze background page scroll and support Escape key dismissal
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    window.__lenis?.stop()
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      window.__lenis?.start()
      document.documentElement.style.overflow = prevOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    sound.playClick()
    sound.playPortalSweep()
    setIsSent(true)

    // Construct mailto link
    const subject = encodeURIComponent(`[Transmission from ${name || 'Collaborator'}]: ${selectedScope}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nScope: ${selectedScope}\n\nBrief:\n${message}`)
    
    setTimeout(() => {
      window.location.href = `mailto:elyasfgidev@gmail.com?subject=${subject}&body=${body}`
    }, 1200)
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[10001] bg-black/80 backdrop-blur-xl flex items-center justify-end p-0 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg h-full sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-3xl bg-[#090b10] border border-white/20 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-300 font-bold">
              Dispatch Transmission
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          /* Success Screen */
          <div className="py-16 text-center flex flex-col items-center my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(52,211,153,0.5)] animate-bounce">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-syne font-black text-3xl uppercase tracking-tight text-white mb-2">
              Transmission Queued
            </h3>
            <p className="text-sm font-sans text-neutral-300 font-light max-w-sm mb-6">
              Thank you, {name || 'Partner'}. Your signal has been received by Elyas Forghani. Dispatching email client...
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white/10 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSubmit} className="space-y-6 my-auto">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                01. Collaboration Scope
              </label>
              <div className="flex flex-wrap gap-2">
                {SCOPES.map((sc) => (
                  <button
                    key={sc}
                    type="button"
                    onClick={() => {
                      sound.playHoverTick()
                      setSelectedScope(sc)
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                      selectedScope === sc
                        ? 'bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                02. Your Identity &amp; Coordinates
              </label>
              <div className="space-y-3">
                <input
                  required
                  type="text"
                  placeholder="Your Name / Studio"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-slate-300 transition-colors"
                />
                <input
                  required
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-slate-300 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                03. Project Brief or Inquiry
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your project, timeline, and architectural challenges..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-slate-300 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              data-cursor="DISPATCH"
              className="w-full py-4 rounded-full bg-white text-black font-syne font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Dispatch Signal to Elyas</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="pt-6 border-t border-white/10 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
          <span>Direct: elyasfgidev@gmail.com</span>
          <span>Response time &lt; 24h</span>
        </div>
      </div>
    </div>
  )
}
