import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { site } from '../data/site'

// High-conversion call-to-action band used across pages.
export default function CTASection({
  title = 'Looking for the Right Financial Solution?',
  subtitle = 'Talk to our experts today and get personalised assistance — no obligation, completely free.',
  primaryLabel = 'Apply Now',
  primaryTo = '/contact',
}) {
  return (
    <section className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-hero-gradient px-6 py-14 text-center shadow-xl sm:px-12 lg:py-16"
        >
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-medical-500/20 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-navy-100">{subtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to={primaryTo} className="btn-primary w-full transition-transform hover:scale-105 sm:w-auto">
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${site.phone.replace(/\s+/g, '')}`}
                className="btn w-full border-2 border-white/30 bg-white/10 text-white backdrop-blur transition-transform hover:scale-105 hover:bg-white/20 sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
