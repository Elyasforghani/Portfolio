'use client'

// Universal Spatial Web Audio Engine (In-Memory Procedural Synth + Octet Stream Buffer)
// 100% immune to IDM interceptors, 0ms startup, calibrated for smooth, ear-friendly ambient dynamics
class SoundEngine {
  constructor() {
    this.ctx = null
    this.muted = false
    this.isPlaying = false
    this.masterGain = null
    this.ambientGain = null
    this.ambientSource = null
    this.audioBuffer = null
    this.analyser = null
    this.isLoading = false
    this.fetchPromise = null
    this.proceduralOscs = []
    this.proceduralInterval = null
    this.lfoOsc = null
    this.pentatonicFrequencies = [
      261.63, // C4
      293.66, // D4
      329.63, // E4
      392.00, // G4
      440.00, // A4
      523.25, // C5
      587.33, // D5
      659.25, // E5
    ]
  }

  init() {
    if (typeof window === 'undefined') return
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    if (this.ctx && !this.masterGain) {
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime)

      this.analyser = this.ctx.createAnalyser()
      this.analyser.fftSize = 64
      this.analyser.smoothingTimeConstant = 0.82

      this.masterGain.connect(this.analyser)
      this.analyser.connect(this.ctx.destination)
    }
  }

  notifyStateChange() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('sound-state-change', {
          detail: { isPlaying: this.isPlaying, isMuted: this.muted },
        })
      )
    }
  }

  setMuted(val) {
    this.muted = !!val
    if (this.muted) {
      this.stopAmbient()
    }
    this.notifyStateChange()
  }

  // Pre-load audio buffer in background during preloader so it's 100% ready on click
  async prefetch() {
    if (typeof window === 'undefined' || this.audioBuffer) return
    this.init()
    return this.fetchAudioBufferInBackground()
  }

  // Soft tactile tick for hovering interactive elements
  playHoverTick() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1400, now)
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.03)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03)

      osc.connect(gain)
      gain.connect(this.masterGain || this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.035)
    } catch {}
  }

  // Satisfying mechanical click for buttons and actions
  playClick() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(480, now)
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.045)

      gain.gain.setValueAtTime(0.14, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045)

      osc.connect(gain)
      gain.connect(this.masterGain || this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.05)
    } catch {}
  }

  // Tactile bubble pop when placing a sticker or stamping
  playStickerPop() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      const freq = 420 + Math.random() * 180
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.6, now + 0.06)

      gain.gain.setValueAtTime(0.16, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07)

      osc.connect(gain)
      gain.connect(this.masterGain || this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.08)
    } catch {}
  }

  // Harmonic bell chime for pentatonic synthesizer keys (Nesil Noble sound instrument)
  playPentatonicNote(index = 0) {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const freq = this.pentatonicFrequencies[index % this.pentatonicFrequencies.length] || 440
      
      const osc = this.ctx.createOscillator()
      const overtone = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      overtone.type = 'triangle'
      overtone.frequency.setValueAtTime(freq * 2, now)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.18, now + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0)

      osc.connect(gain)
      overtone.connect(gain)
      gain.connect(this.masterGain || this.ctx.destination)

      osc.start(now)
      overtone.start(now)
      osc.stop(now + 1.05)
      overtone.stop(now + 1.05)
    } catch {}
  }

  // Silenced to ensure 0ms synthetic sweep noise before song starts
  playPortalSweep() {}

  // Start soothing ambient soundscape with gentle fade-in curve (Recorded track ONLY, zero synthetic noise)
  async startAmbient() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume()
      } catch {}
    }

    if (this.isPlaying) return

    this.isPlaying = true
    this.notifyStateChange()

    try {
      if (!this.ambientGain) {
        this.ambientGain = this.ctx.createGain()
        this.ambientGain.connect(this.masterGain || this.ctx.destination)
      }

      // 1. If buffer already decoded in memory, play recorded track immediately
      if (this.audioBuffer) {
        this.playBuffer(this.audioBuffer)
        return
      }

      // 2. If buffer is still downloading or decoding, wait quietly in background
      // Pure silence, ZERO synthetic drone noise or placeholder oscillators!
      await this.fetchAudioBufferInBackground()
    } catch {
      this.isPlaying = false
      this.notifyStateChange()
    }
  }

  // Alias for compatibility
  startAmbientDrone() {
    return this.startAmbient()
  }

  async fetchAudioBufferInBackground() {
    if (this.audioBuffer) {
      if (this.isPlaying && !this.muted) {
        this.playBuffer(this.audioBuffer)
      }
      return
    }

    if (this.isLoading && this.fetchPromise) {
      try {
        await this.fetchPromise
        if (this.audioBuffer && this.isPlaying && !this.muted) {
          this.playBuffer(this.audioBuffer)
        }
      } catch {}
      return
    }

    this.isLoading = true
    this.fetchPromise = (async () => {
      try {
        // Fetch via .dat to completely bypass IDM (Internet Download Manager) extension interceptor
        let res = await fetch('/audio/soundtrack.dat')
        if (!res.ok) {
          res = await fetch('/audio/ambient.dat')
        }
        if (!res.ok) {
          res = await fetch('/audio/John_Wick_Chapter_2_Soundtrack_Le.mp3')
        }
        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer()
          this.init()
          if (this.ctx) {
            const decoded = await this.ctx.decodeAudioData(arrayBuffer)
            this.audioBuffer = decoded
            if (this.isPlaying && !this.muted) {
              this.playBuffer(decoded)
            }
          }
        }
      } catch (err) {
        console.warn('Ambient audio fetch/decode failed:', err)
      } finally {
        this.isLoading = false
      }
    })()

    await this.fetchPromise
  }

  playBuffer(buffer) {
    if (!this.ctx || !buffer) return
    try {
      if (this.ambientSource) {
        try { this.ambientSource.stop() } catch {}
        try { this.ambientSource.disconnect() } catch {}
        this.ambientSource = null
      }

      if (!this.ambientGain) {
        this.ambientGain = this.ctx.createGain()
        this.ambientGain.connect(this.masterGain || this.ctx.destination)
      }

      const now = this.ctx.currentTime
      // Start strictly from 0.0001 (silence) and smoothly swell to ambient volume over 1.8s
      this.ambientGain.gain.cancelScheduledValues(now)
      this.ambientGain.gain.setValueAtTime(0.0001, now)
      this.ambientGain.gain.linearRampToValueAtTime(0.28, now + 1.8)

      const source = this.ctx.createBufferSource()
      source.buffer = buffer
      source.loop = true
      source.connect(this.ambientGain)
      source.start(0)
      this.ambientSource = source
      this.isPlaying = true
      this.notifyStateChange()
    } catch {}
  }

  // Completely disabled: no synthetic drone hum or placeholder noise ever plays
  startProceduralDrone() {}

  fadeOutProceduralDrone() {
    this.stopProceduralOscs()
  }

  stopProceduralOscs() {
    if (this.proceduralInterval) {
      clearInterval(this.proceduralInterval)
      this.proceduralInterval = null
    }
    if (this.lfoOsc) {
      try {
        this.lfoOsc.stop()
        this.lfoOsc.disconnect()
      } catch {}
      this.lfoOsc = null
    }
    if (this.proceduralOscs.length > 0) {
      this.proceduralOscs.forEach(({ osc, gainNode }) => {
        try {
          osc.stop()
          osc.disconnect()
          if (gainNode) gainNode.disconnect()
        } catch {}
      })
      this.proceduralOscs = []
    }
  }

  stopAmbient() {
    if (!this.isPlaying || !this.ctx || !this.ambientGain) {
      this.isPlaying = false
      this.notifyStateChange()
      return
    }

    try {
      const now = this.ctx.currentTime
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.6)

      setTimeout(() => {
        if (this.ambientSource) {
          try {
            this.ambientSource.stop()
            this.ambientSource.disconnect()
          } catch {}
          this.ambientSource = null
        }
        this.stopProceduralOscs()
        this.isPlaying = false
        this.notifyStateChange()
      }, 650)
    } catch {
      this.stopProceduralOscs()
      this.isPlaying = false
      this.notifyStateChange()
    }
  }

  // Alias for compatibility
  stopAmbientDrone() {
    return this.stopAmbient()
  }

  getFrequencyData(dataArray) {
    if (this.analyser && this.isPlaying) {
      this.analyser.getByteFrequencyData(dataArray)
    } else {
      dataArray.fill(0)
    }
  }

  // Konami Code Victory Chime
  playCelebrationChime() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]
    notes.forEach((freq, i) => {
      setTimeout(() => {
        try {
          const now = this.ctx.currentTime
          const osc = this.ctx.createOscillator()
          const gain = this.ctx.createGain()

          osc.type = 'triangle'
          osc.frequency.setValueAtTime(freq, now)

          gain.gain.setValueAtTime(0.001, now)
          gain.gain.linearRampToValueAtTime(0.18, now + 0.03)
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7)

          osc.connect(gain)
          gain.connect(this.masterGain || this.ctx.destination)

          osc.start(now)
          osc.stop(now + 0.75)
        } catch {}
      }, i * 95)
    })
  }

  toggleSound() {
    this.init()
    if (this.isPlaying) {
      this.stopAmbient()
      this.muted = true
      return false
    } else {
      this.muted = false
      this.startAmbient()
      return true
    }
  }

  toggleMute() {
    const isPlaying = this.toggleSound()
    return !isPlaying // returns isMuted: true if muted, false if playing
  }
}

export const sound = new SoundEngine()

// Start prefetching ambient audio stream immediately in background on page load
if (typeof window !== 'undefined') {
  setTimeout(() => {
    sound.prefetch().catch(() => {})
  }, 50)
}

// Global unlock listener for browser autoplay policy compliance
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    sound.init()
    if (sound.ctx && sound.ctx.state === 'suspended') {
      sound.ctx.resume().catch(() => {})
    }
  }
  window.addEventListener('pointerdown', unlockAudio, { passive: true })
  window.addEventListener('keydown', unlockAudio, { passive: true })
}
