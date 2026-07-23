import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Icon from './Icon'

// Professional service card with a coloured top border, icon rotation on hover,
// key benefits, a "Learn More" affordance and an inquiry link.
export default function ServiceCard({ service, accent = 'brand' }) {
  const accentMap = {
    brand: {
      top: 'bg-brand-600',
      iconWrap: 'bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white',
      check: 'text-brand-600',
      link: 'text-brand-700',
    },
    medical: {
      top: 'bg-medical-500',
      iconWrap: 'bg-medical-50 text-medical-600 group-hover:bg-medical-600 group-hover:text-white',
      check: 'text-medical-600',
      link: 'text-medical-700',
    },
    navy: {
      top: 'bg-navy-800',
      iconWrap: 'bg-navy-50 text-navy-700 group-hover:bg-navy-800 group-hover:text-white',
      check: 'text-navy-700',
      link: 'text-navy-800',
    },
  }
  const a = accentMap[accent] || accentMap.brand

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      {/* Coloured top border that widens on hover */}
      <span className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-100 ${a.top}`} />

      <div className="flex flex-1 flex-col p-6">
        <div
          className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-6 ${a.iconWrap}`}
        >
          <Icon name={service.icon} className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-semibold text-navy-900">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">{service.description}</p>

        {service.benefits?.length > 0 && (
          <ul className="mt-4 space-y-2">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-navy-700">
                <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${a.check}`} strokeWidth={2.5} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-4">
          <Link
            to={`/contact?service=${encodeURIComponent(service.name)}`}
            className={`inline-flex items-center gap-1 text-sm font-semibold ${a.link}`}
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to={`/contact?service=${encodeURIComponent(service.name)}`}
            className="text-xs font-medium text-navy-400 hover:text-navy-700"
          >
            Enquire
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
