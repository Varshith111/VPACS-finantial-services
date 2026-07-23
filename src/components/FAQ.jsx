import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { faqs } from '../data/site'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section">
      <div className="container-custom">
        <div className="flex flex-col items-center">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            subtitle="Everything you need to know before getting started with VPACS."
          />
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? 'border-brand-200 bg-white shadow-card' : 'border-navy-100 bg-white'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-navy-900">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? 'rotate-45 bg-brand-600 text-white' : 'bg-navy-50 text-navy-600'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-navy-600">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
