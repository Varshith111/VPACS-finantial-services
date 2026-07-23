import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Counts up from 0 to `value` once when scrolled into view.
// Supports prefix/suffix and decimals, e.g. ₹500+ Cr.
export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1800,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutCubic for a smooth settle.
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  const formatted = display.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
