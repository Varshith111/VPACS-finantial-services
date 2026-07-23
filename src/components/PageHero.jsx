import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

// Inner-page hero banner with breadcrumb, title and subtitle.
export default function PageHero({ eyebrow, title, subtitle, breadcrumb, variant = 'navy', children }) {
  const variants = {
    navy: 'bg-hero-gradient',
    medical: 'bg-gradient-to-br from-navy-900 via-navy-800 to-medical-800',
  }
  return (
    <section className={`relative overflow-hidden ${variants[variant]}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="pointer-events-none absolute -right-20 -top-16 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl" />

      <div className="container-custom relative py-16 lg:py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-navy-200">
          <Link to="/" className="hover:text-white">Home</Link>
          {breadcrumb && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white">{breadcrumb}</span>
            </>
          )}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-5 max-w-3xl"
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/20">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{subtitle}</p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  )
}
