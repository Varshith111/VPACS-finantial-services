import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calculator, IndianRupee, Percent, CalendarRange, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

function formatINR(n) {
  return n.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

export default function EMICalculator() {
  const [amount, setAmount] = useState(2500000) // ₹25L
  const [rate, setRate] = useState(9)
  const [years, setYears] = useState(15)

  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const p = amount
    const r = rate / 12 / 100
    const n = years * 12
    if (r === 0) {
      const e = p / n
      return { emi: e, totalInterest: 0, totalPayable: p }
    }
    const e = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const total = e * n
    return { emi: e, totalInterest: total - p, totalPayable: total }
  }, [amount, rate, years])

  // Donut proportions.
  const principalPct = (amount / totalPayable) * 100

  return (
    <section className="section bg-navy-50/60">
      <div className="container-custom">
        <div className="flex flex-col items-center">
          <SectionHeading
            eyebrow="Plan ahead"
            title="EMI Calculator"
            subtitle="Estimate your monthly instalment in seconds. Adjust the amount, rate and tenure to see what fits your budget."
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-5">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-100 sm:p-8 lg:col-span-3"
          >
            <SliderRow
              icon={IndianRupee}
              label="Loan Amount"
              value={`₹ ${formatINR(amount)}`}
              min={100000}
              max={20000000}
              step={100000}
              raw={amount}
              onChange={setAmount}
            />
            <SliderRow
              icon={Percent}
              label="Interest Rate (p.a.)"
              value={`${rate.toFixed(1)} %`}
              min={5}
              max={20}
              step={0.1}
              raw={rate}
              onChange={setRate}
            />
            <SliderRow
              icon={CalendarRange}
              label="Tenure"
              value={`${years} ${years === 1 ? 'year' : 'years'}`}
              min={1}
              max={30}
              step={1}
              raw={years}
              onChange={setYears}
            />
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col rounded-3xl bg-navy-900 p-6 text-white shadow-card sm:p-8 lg:col-span-2"
          >
            <div className="flex items-center gap-2 text-navy-300">
              <Calculator className="h-5 w-5 text-brand-400" />
              <span className="text-sm font-semibold uppercase tracking-wider">Monthly EMI</span>
            </div>
            <p className="mt-2 font-display text-4xl font-extrabold">₹ {formatINR(emi)}</p>

            {/* Donut */}
            <div className="mt-6 flex items-center gap-5">
              <div
                className="h-24 w-24 flex-shrink-0 rounded-full"
                style={{
                  background: `conic-gradient(#c62d3d 0% ${principalPct}%, #3b93fc ${principalPct}% 100%)`,
                }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-navy-900" />
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-brand-600" />
                  <span className="text-navy-200">Principal: ₹ {formatINR(amount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-medical-500" />
                  <span className="text-navy-200">Interest: ₹ {formatINR(totalInterest)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-navy-800 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-navy-300">Total payable</span>
                <span className="font-semibold">₹ {formatINR(totalPayable)}</span>
              </div>
            </div>

            <Link to="/contact" className="btn-primary mt-6 w-full">
              Apply for this loan <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-navy-400">
          * Indicative only. Actual EMI, rate and eligibility are determined by the lending partner.
        </p>
      </div>
    </section>
  )
}

function SliderRow({ icon: I, label, value, min, max, step, raw, onChange }) {
  const pct = ((raw - min) / (max - min)) * 100
  return (
    <div className="mb-7 last:mb-0">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold text-navy-700">
          <I className="h-4 w-4 text-brand-600" /> {label}
        </span>
        <span className="rounded-lg bg-navy-50 px-3 py-1 text-sm font-bold text-navy-900">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={raw}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-600 [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-600"
        style={{ background: `linear-gradient(to right, #c62d3d ${pct}%, #dce4ee ${pct}%)` }}
      />
    </div>
  )
}
