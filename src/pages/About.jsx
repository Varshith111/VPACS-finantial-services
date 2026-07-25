import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Target, Eye, Heart, ShieldCheck, Handshake, Award, Users, Quote,
  Zap, Landmark, HeartPulse, Headset,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import Gallery from '../components/Gallery'
import { FounderAvatar } from '../components/Illustrations'
import { stats, whyChoose } from '../data/site'

const iconMap = { ShieldCheck, Zap, Users, Landmark, HeartPulse, Headset }

const values = [
  { icon: ShieldCheck, title: 'Integrity', desc: 'We act in your best interest, always — with honest advice and full transparency.' },
  { icon: Handshake, title: 'Trust', desc: 'Relationships built to last, earned through consistency and confidentiality.' },
  { icon: Award, title: 'Excellence', desc: 'We hold ourselves to the highest standards in everything we deliver.' },
  { icon: Heart, title: 'Client-First', desc: 'Your goals lead. We tailor every solution to your unique situation.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        breadcrumb="About Us"
        title="Building trust, one relationship at a time"
        subtitle="VPACS Financial Services is a full-spectrum finance advisory dedicated to making funding simple, transparent and genuinely helpful — for individuals, businesses and the healthcare community."
      />

      {/* Overview */}
      <section className="section">
        <div className="container-custom grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Company overview</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-900">
              Your single partner for every financial need
            </h2>
            <p className="mt-5 text-navy-600">
              VPACS brings together banking, lending, investment, insurance and tax expertise under
              one roof. We work with a network of 40+ banks and NBFCs to find you the right product
              at the right price — without the runaround.
            </p>
            <p className="mt-4 text-navy-600">
              Our dedicated Medical Education Finance division serves doctors, medical students and
              healthcare institutions with specialised financing, because we believe every
              profession deserves finance that understands it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-navy-50/70 p-6 text-center">
                <p className="font-display text-3xl font-extrabold text-navy-900">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-navy-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section bg-navy-50/60">
        <div className="container-custom grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white p-8 shadow-card ring-1 ring-navy-100 lg:p-10"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Eye className="h-7 w-7" strokeWidth={1.75} />
            </span>
            <h3 className="mt-6 text-2xl font-bold text-navy-900">Our Vision</h3>
            <p className="mt-3 text-navy-600">
              To be India's most trusted financial services partner — the first name people and
              businesses think of when they need finance they can rely on.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-navy-900 p-8 text-white shadow-card lg:p-10"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-medical-500/20 text-medical-300">
              <Target className="h-7 w-7" strokeWidth={1.75} />
            </span>
            <h3 className="mt-6 text-2xl font-bold">Our Mission</h3>
            <p className="mt-3 text-navy-200">
              To simplify finance through honest advice, a wide partner network and technology —
              delivering fast, transparent solutions tailored to every client's goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core values */}
      <section className="section">
        <div className="container-custom">
          <div className="flex flex-col items-center">
            <SectionHeading
              eyebrow="Core values"
              title="The principles we live by"
              subtitle="Everything we do is guided by a simple commitment to doing right by our clients."
            />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card text-center hover:shadow-card-hover"
              >
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-brand-400">
                  <v.icon className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm text-navy-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section bg-navy-50/60">
        <div className="container-custom">
          <div className="flex flex-col items-center">
            <SectionHeading
              eyebrow="Why VPACS"
              title="Why clients choose us"
              subtitle="A partner that combines expertise, reach and a genuine client-first approach."
            />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item, i) => {
              const I = iconMap[item.icon] || ShieldCheck
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex gap-4 rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-100"
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <I className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-navy-500">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section">
        <div className="container-custom">
          <div className="flex flex-col items-center">
            <SectionHeading
              eyebrow="Leadership"
              title="A message from our Founder"
              subtitle="VPACS was built on a simple belief — that everyone deserves honest, expert financial guidance."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 grid gap-8 overflow-hidden rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-100 lg:grid-cols-5 lg:items-center lg:p-10"
          >
            {/* Portrait */}
            <div className="lg:col-span-2">
              <FounderPhoto />
            </div>

            {/* Message */}
            <div className="lg:col-span-3">
              <Quote className="h-9 w-9 text-brand-200" />
              <blockquote className="mt-3 text-lg font-medium leading-relaxed text-navy-800">
                When I started VPACS, I wanted to build the kind of financial partner I wished I'd had —
                one that puts the client first, explains everything clearly, and finds the right
                solution without the runaround. That promise still guides every decision we make today.
              </blockquote>
              <div className="mt-6 border-t border-navy-100 pt-5">
                <p className="text-xl font-bold text-navy-900">Venkata Narayana Pamula</p>
                <p className="text-sm font-semibold text-brand-600">Founder &amp; Managing Director, VPACS Financial Services</p>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                  <div>
                    <p className="font-display text-2xl font-extrabold text-navy-900">15+ yrs</p>
                    <p className="text-xs text-navy-500">Industry experience</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-extrabold text-navy-900">₹500 Cr+</p>
                    <p className="text-xs text-navy-500">Loans facilitated</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-extrabold text-navy-900">12,000+</p>
                    <p className="text-xs text-navy-500">Clients served</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Gallery />

      <CTASection />
    </>
  )
}

// Founder portrait — uses the uploaded photo, falling back to the illustration
// if the image file is not present.
function FounderPhoto() {
  const [failed, setFailed] = useState(false)
  if (failed) return <FounderAvatar className="mx-auto w-full max-w-xs" />
  return (
    <div className="mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl bg-navy-100 shadow-card ring-1 ring-navy-100">
      <img
        src={encodeURI('/images/WhatsApp Image 2026-07-23 at 4.43.34 PM.jpeg')}
        alt="Venkata Narayana Pamula — Founder & Managing Director, VPACS Financial Services"
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top"
      />
    </div>
  )
}
