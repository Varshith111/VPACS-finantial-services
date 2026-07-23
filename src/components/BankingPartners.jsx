import { motion } from 'framer-motion'
import { Landmark } from 'lucide-react'
import { bankingPartners } from '../data/site'

// Trust strip: partner bank/NBFC wordmarks in an infinite marquee.
export default function BankingPartners() {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...bankingPartners, ...bankingPartners]

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center">
          <span className="eyebrow">Our lending network</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Backed by 40+ leading banks &amp; NBFCs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy-500">
            We work with India's most trusted financial institutions to bring you competitive rates
            and faster approvals.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-4">
            {loop.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex min-w-[180px] items-center gap-3 rounded-xl border border-navy-100 bg-white px-5 py-4 shadow-sm"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                  <Landmark className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="font-display text-sm font-bold tracking-tight text-navy-800">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-center text-xs text-navy-400"
        >
          Partner institutions are representative. Final lender depends on your eligibility and product.
        </motion.p>
      </div>
    </section>
  )
}
