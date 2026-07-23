import { motion } from 'framer-motion'

// Consistent, centred (or left-aligned) section header with an eyebrow.
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${alignment}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-navy-100' : 'text-navy-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
