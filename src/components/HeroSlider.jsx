import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '../data/galleryImages'

// Auto-playing image slider for the hero — cycles through the gallery images.
export default function HeroSlider({ interval = 2500, className = '' }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const paused = useRef(false)
  const count = galleryImages.length

  const go = useCallback(
    (next) => {
      setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1)
      setIndex((next + count) % count)
    },
    [index, count],
  )
  const nextSlide = useCallback(() => {
    setDir(1)
    setIndex((i) => (i + 1) % count)
  }, [count])
  const prevSlide = useCallback(() => {
    setDir(-1)
    setIndex((i) => (i - 1 + count) % count)
  }, [count])

  // Auto-advance (pauses on hover/focus).
  useEffect(() => {
    if (count <= 1) return
    const id = setInterval(() => {
      if (!paused.current) {
        setDir(1)
        setIndex((i) => (i + 1) % count)
      }
    }, interval)
    return () => clearInterval(id)
  }, [count, interval])

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 90 : -90, scale: 1.04 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -90 : 90, scale: 1.04 }),
  }

  return (
    <div
      className={`group relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-navy-800 shadow-2xl ring-1 ring-white/15 ${className}`}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.img
          key={index}
          src={galleryImages[index]}
          alt={`VPACS moment ${index + 1}`}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      </AnimatePresence>

      {/* Gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />

      {/* Caption badge */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
        Moments at VPACS
      </div>

      {/* Arrows (appear on hover) */}
      <button
        onClick={prevSlide}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all hover:bg-white/30 group-hover:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next image"
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all hover:bg-white/30 group-hover:opacity-100"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
