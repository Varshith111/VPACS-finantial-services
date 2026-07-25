import { useState, useEffect } from 'react'

/**
 * Full-screen splash that shows the VPACS logo on load, then fades out
 * to reveal the main app. Runs once per page load (~2.4 s total).
 */
export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState('enter')   // enter → visible → exit → done

  useEffect(() => {
    // Remove the pure-HTML pre-splash from index.html
    const preSplash = document.getElementById('pre-splash')
    if (preSplash) {
      preSplash.style.opacity = '0'
      setTimeout(() => preSplash.remove(), 600)
    }

    // Phase 1 – logo fades/scales in (handled by CSS transition on mount)
    const t1 = setTimeout(() => setPhase('visible'), 100)

    // Phase 2 – hold the logo on screen
    const t2 = setTimeout(() => setPhase('exit'), 2000)

    // Phase 3 – after exit animation completes, unmount
    const t3 = setTimeout(() => {
      setPhase('done')
      onFinish?.()
    }, 2800)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onFinish])

  if (phase === 'done') return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-700"
      style={{ opacity: phase === 'exit' ? 0 : 1 }}
    >
      {/* Animated gradient ring behind logo */}
      <div className="absolute h-56 w-56 animate-pulse rounded-full bg-gradient-to-tr from-brand-400/20 via-medical-400/20 to-navy-400/20 blur-2xl sm:h-72 sm:w-72" />

      <div
        className="relative flex flex-col items-center gap-6 transition-all duration-700"
        style={{
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'scale(0.85)' : phase === 'exit' ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        {/* Logo image */}
        <img
          src="/images/vpacs-logo-transparent.png"
          alt="VPACS Financial Services"
          className="h-40 w-auto object-contain drop-shadow-lg sm:h-52"
        />

        {/* Shimmer bar */}
        <div className="h-1 w-32 overflow-hidden rounded-full bg-navy-100">
          <div className="splash-shimmer h-full w-1/2 rounded-full bg-gradient-to-r from-brand-500 via-medical-500 to-brand-500" />
        </div>
      </div>
    </div>
  )
}
