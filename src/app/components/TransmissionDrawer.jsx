'use client'

import React, { useState, useEffect, useRef } from 'react'
import { sound } from '../../utils/audio'
import { Send, X, CheckCircle2 } from 'lucide-react'

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
  const dialogRef = useRef(null)
  const backdropPress = useRef(false)

  // Sync native <dialog> top-layer state without locking document overflow
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
      window.__lenis?.stop()
    } else {
      if (dialog.open) dialog.close()
      window.__lenis?.start()
    }
  }, [isOpen])

  const handleClose = () => {
    setIsSent(false)
    onClose()
  }

  const isOutsideRect = (e) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return false
    return (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    )
  }

  const handlePointerDown = (e) => {
    backdropPress.current = isOutsideRect(e)
  }

  const handlePointerUp = (e) => {
    if (backdropPress.current && isOutsideRect(e)) {
      handleClose()
    }
    backdropPress.current = false
  }

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
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="transmission-title"
      onClose={handleClose}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="m-0 ml-auto w-full max-w-lg h-dvh sm:h-auto sm:max-h-[90dvh] sm:my-auto sm:mr-6 rounded-none sm:rounded-3xl bg-[#0f1a30] text-[#f4ede0] border border-[#f4ede0]/20 shadow-2xl p-0 overflow-y-auto"
    >
      <div className="p-6 sm:p-8 flex flex-col justify-between min-h-full">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f4ede0]/10 mb-6">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#ff6b5b] animate-pulse" />
            <h2
              id="transmission-title"
              className="text-xs font-mono uppercase tracking-[0.22em] text-[#f4ede0] font-bold"
            >
              Dispatch Transmission
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close contact drawer"
            className="min-w-11 min-h-11 inline-flex items-center justify-center p-2.5 rounded-full text-[#c4b7a1] hover:text-[#f4ede0] hover:bg-[#14213d] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {isSent ? (
          /* Success Screen */
          <div role="status" className="py-16 text-center flex flex-col items-center my-auto">
            <div className="w-16 h-16 rounded-full bg-[#ff6b5b]/15 border border-[#ff6b5b] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,107,91,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-[#ff6b5b]" aria-hidden="true" />
            </div>
            <h3 className="font-syne font-black text-3xl uppercase tracking-tight text-[#f4ede0] mb-2">
              Transmission Queued
            </h3>
            <p className="text-sm font-sans text-[#c4b7a1] font-light max-w-sm mb-6">
              Thank you, {name || 'Partner'}. Your signal has been received by Elyas Forghani. Dispatching email client...
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="min-h-11 px-6 py-2.5 rounded-full bg-[#14213d] border border-[#f4ede0]/20 text-xs font-mono uppercase tracking-wider text-[#f4ede0] hover:border-[#ff6b5b] transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSubmit} className="space-y-6 my-auto">
            <fieldset className="border-0 m-0 p-0">
              <legend className="block text-xs font-mono uppercase tracking-wider text-[#c4b7a1] mb-2">
                01. Collaboration Scope
              </legend>
              <div className="flex flex-wrap gap-2">
                {SCOPES.map((sc) => (
                  <button
                    key={sc}
                    type="button"
                    aria-pressed={selectedScope === sc}
                    onClick={() => {
                      sound.playHoverTick()
                      setSelectedScope(sc)
                    }}
                    className={`min-h-10 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                      selectedScope === sc
                        ? 'bg-[#ff6b5b] text-[#14213d] font-bold border-[#ff6b5b] shadow-md'
                        : 'bg-[#0c1527]/80 border-[#f4ede0]/15 text-[#c4b7a1] hover:text-[#f4ede0] hover:border-[#ff6b5b]/50'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <p className="block text-xs font-mono uppercase tracking-wider text-[#c4b7a1] mb-2">
                02. Your Identity &amp; Coordinates
              </p>
              <div className="space-y-3">
                <label htmlFor="transmission-name" className="visually-hidden">
                  Your Name or Studio
                </label>
                <input
                  id="transmission-name"
                  name="name"
                  autoComplete="name"
                  required
                  type="text"
                  placeholder="Your Name / Studio"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c1527]/80 border border-[#f4ede0]/20 text-sm font-mono text-[#f4ede0] placeholder:text-[#c4b7a1]/70 focus:border-[#ff6b5b] transition-colors"
                />
                <label htmlFor="transmission-email" className="visually-hidden">
                  Your Email Address
                </label>
                <input
                  id="transmission-email"
                  name="email"
                  autoComplete="email"
                  required
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c1527]/80 border border-[#f4ede0]/20 text-sm font-mono text-[#f4ede0] placeholder:text-[#c4b7a1]/70 focus:border-[#ff6b5b] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="transmission-message" className="block text-xs font-mono uppercase tracking-wider text-[#c4b7a1] mb-2">
                03. Project Brief or Inquiry
              </label>
              <textarea
                id="transmission-message"
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project, timeline, and architectural challenges..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0c1527]/80 border border-[#f4ede0]/20 text-sm font-mono text-[#f4ede0] placeholder:text-[#c4b7a1]/70 focus:border-[#ff6b5b] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              data-cursor="DISPATCH"
              className="w-full py-4 rounded-full bg-[#ff6b5b] text-[#14213d] font-syne font-black text-xs uppercase tracking-widest hover:bg-[#ff8577] transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Dispatch Signal to Elyas</span>
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="pt-6 border-t border-[#f4ede0]/10 text-xs font-mono text-[#c4b7a1] flex items-center justify-between gap-2 flex-wrap">
          <span>Direct: elyasfgidev@gmail.com</span>
          <span>Response time &lt; 24h</span>
        </div>
      </div>
    </dialog>
  )
}
