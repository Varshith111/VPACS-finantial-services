import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, CheckCircle2, Landmark, Users, Building2, Award,
  PhoneCall, Zap, ShieldCheck, Clock, Star, ChevronRight,
} from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import CTASection from '../components/CTASection'
import AnimatedCounter from '../components/AnimatedCounter'
import Icon from '../components/Icon'
import { generalCategories, generalServices } from '../data/generalServices'
import { stats, trustHighlights } from '../data/site'

const statIcons = { Landmark, Users, Building2, Award }

/* ─────────────────────────────────────────────────────────────── */
export default function GeneralFinance() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    }
  }, [hash])

  return (
    <>
      <Hero />
      <StatsBar />
      <StickyNav />
      <ServiceSections />
      <WhyVPACS />
      <CTASection
        title="Not sure which option fits you?"
        subtitle="Share your requirement and a VPACS advisor will recommend the best-matched solution — free of cost."
      />
    </>
  )
}

/* ──────────────────────────────────────────────────────────── Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-navy-400/10 blur-3xl" />

      <div className="container-custom relative py-16 lg:py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-navy-200">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">General Finance</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/20">
              <Star className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
              General Finance Division
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Complete banking &<br />
              <span className="text-brand-400">financial solutions.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">
              From home and business loans to investments, insurance and tax — everything you need
              to fund, grow and protect, backed by 40+ lending partners.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary transition-transform hover:scale-105">
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#banking-loans" className="btn border-2 border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20">
                Browse Services
              </a>
            </div>
          </motion.div>

          {/* Category quick-links grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { icon: 'Home',         label: 'Home Loans',        id: 'banking-loans' },
              { icon: 'Briefcase',    label: 'Business Loans',    id: 'banking-loans' },
              { icon: 'TrendingUp',   label: 'Mutual Funds',      id: 'investment-tax' },
              { icon: 'ShieldCheck',  label: 'Insurance',         id: 'investment-tax' },
              { icon: 'GraduationCap',label: 'Education Loans',   id: 'banking-loans' },
              { icon: 'FileText',     label: 'Tax Filing',        id: 'investment-tax' },
            ].map(({ icon, label, id }) => (
              <a
                key={label}
                href={`#${id}`}
                className="group flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 ring-1 ring-white/15 backdrop-blur transition-all hover:bg-white/20 hover:ring-white/30"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-600/80 text-white transition-transform group-hover:scale-110">
                  <Icon name={icon} className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-semibold text-white">{label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────── Stats bar */
function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient py-10">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => {
            const I = statIcons[s.icon] || Landmark
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-4"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-600/20 text-brand-400">
                  <I className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-2xl font-extrabold text-white">
                    <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="text-xs font-medium text-navy-300">{s.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────── Sticky category nav */
function StickyNav() {
  const [active, setActive] = useState(generalCategories[0].id)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    generalCategories.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="sticky top-16 z-30 border-b border-navy-100 bg-white/95 backdrop-blur">
      <div className="container-custom">
        <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
          {generalCategories.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                active === c.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current/10 text-[10px] font-bold">
                {String(i + 1).padStart(2, '0')}
              </span>
              {c.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────── Service sections */
const categoryMeta = {
  'banking-loans': {
    gradient: 'from-navy-900 via-navy-800 to-[#0a3a6e]',
    accent: 'brand',
    badge: 'bg-brand-600/20 text-brand-300',
    highlight: 'text-brand-400',
    icon: 'Landmark',
    tagline: '14 products · Loans, credit & more',
  },
  'investment-tax': {
    gradient: 'from-[#0a2e1a] via-[#0d3d22] to-[#0a2e1a]',
    accent: 'brand',
    badge: 'bg-emerald-500/20 text-emerald-300',
    highlight: 'text-emerald-400',
    icon: 'TrendingUp',
    tagline: '3 products · Wealth & compliance',
  },
  additional: {
    gradient: 'from-[#1a0a2e] via-[#220d3d] to-[#1a0a2e]',
    accent: 'navy',
    badge: 'bg-purple-500/20 text-purple-300',
    highlight: 'text-purple-400',
    icon: 'Layers',
    tagline: '4 products · Beyond traditional finance',
  },
}

function ServiceSections() {
  return (
    <>
      {generalCategories.map((cat, idx) => {
        const items = generalServices.filter((s) => s.category === cat.id)
        const meta = categoryMeta[cat.id] || categoryMeta['banking-loans']
        return (
          <section key={cat.id} id={cat.id} className="scroll-mt-28">
            {/* Category header band */}
            <div className={`relative overflow-hidden bg-gradient-to-r ${meta.gradient} px-6 py-10 lg:px-0`}>
              <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              <div className="container-custom relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                    <Icon name={meta.icon} className="h-7 w-7 text-white" />
                  </span>
                  <div>
                    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${meta.badge}`}>
                      {meta.tagline}
                    </span>
                    <h2 className="mt-1 text-2xl font-bold text-white lg:text-3xl">{cat.title}</h2>
                  </div>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-white/70">{cat.subtitle}</p>
              </div>
            </div>

            {/* Cards grid */}
            <div className={idx % 2 === 1 ? 'bg-navy-50/50' : 'bg-white'}>
              <div className="container-custom py-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((s) => (
                    <ServiceCard key={s.id} service={s} accent={meta.accent} />
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-navy-100 pt-6">
                  <p className="text-sm text-navy-500">
                    <span className="font-semibold text-navy-800">{items.length} services</span> in this category
                  </p>
                  <Link
                    to={`/contact?category=${encodeURIComponent(cat.title)}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Enquire about {cat.title} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ──────────────────────────────────────────────────── Why VPACS strip */
const pillars = [
  { icon: Zap,          title: 'Fast Approvals',       desc: 'Streamlined docs and a wide lender network mean quicker sanctions.' },
  { icon: ShieldCheck,  title: 'Transparent Process',  desc: 'No hidden charges. Clear terms and honest guidance at every step.' },
  { icon: Landmark,     title: '40+ Banking Partners', desc: 'Access competitive rates across leading banks and NBFCs.' },
  { icon: Clock,        title: 'End-to-End Support',   desc: 'From first enquiry to final disbursal — we stay by your side.' },
  { icon: PhoneCall,    title: 'Free Consultation',    desc: 'Our advisory and eligibility assessment are completely free.' },
  { icon: Users,        title: 'Expert Advisors',      desc: 'Dedicated relationship managers who structure the right solution.' },
]

function WhyVPACS() {
  return (
    <section className="section bg-navy-50/60">
      <div className="container-custom">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="eyebrow">Why VPACS</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            The VPACS advantage
          </h2>
          <p className="mt-4 max-w-xl text-navy-500">
            We're built around one idea — making finance simple, honest and genuinely helpful.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy-100 transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-navy-900 text-brand-400 transition-transform group-hover:rotate-6">
                <p.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-navy-500">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust highlights */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {trustHighlights.map((h) => (
            <span key={h} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-700 shadow-sm ring-1 ring-navy-100">
              <CheckCircle2 className="h-4 w-4 text-brand-600" />
              {h}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
