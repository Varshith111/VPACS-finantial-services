import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, ShieldCheck, Zap, Users, Landmark, HeartPulse, Headset,
  Briefcase, Stethoscope, CheckCircle2, Star, Building2, Award, Check,
  GraduationCap, Microscope, RefreshCw,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import CTASection from '../components/CTASection'
import FAQ from '../components/FAQ'
import BankingPartners from '../components/BankingPartners'
import EMICalculator from '../components/EMICalculator'
import AnimatedCounter from '../components/AnimatedCounter'
import { HeroIllustration } from '../components/Illustrations'
import { site, stats, whyChoose, trustHighlights } from '../data/site'
import { generalServices } from '../data/generalServices'

const featureIcons = { ShieldCheck, Zap, Users, Landmark, HeartPulse, Headset }
const statIcons = { Landmark, Users, Building2, Award }

const featured = [
  'home-loans', 'business-loans', 'personal-loans', 'mutual-funds', 'educational-loans', 'loan-against-property',
].map((id) => generalServices.find((s) => s.id === id)).filter(Boolean)

export default function Home() {
  return (
    <>
      <Hero />
      <Statistics />
      <WhyVPACS />
      <PopularServices />
      <BankingPartners />
      <Divisions />
      <EMICalculator />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  )
}

/* ---------------------------------------------------------------- Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-medical-500/20 blur-3xl" />

      <div className="container-custom relative grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/20">
            <Star className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
            Trusted by 12,000+ clients across India
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Finance that moves <span className="text-brand-400">you forward.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
            From home and business loans to specialised healthcare financing, VPACS delivers premium
            financial solutions built on trust, transparency and speed — all under one roof.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/general-finance" className="btn-primary transition-transform hover:scale-105">
              Explore Services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn border-2 border-white/30 bg-white/10 text-white backdrop-blur transition-transform hover:scale-105 hover:bg-white/20">
              Talk to an Advisor
            </Link>
          </div>

          {/* Inline animated trust counters */}
          <div className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <p className="font-display text-2xl font-extrabold text-white">
                  <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-navy-300">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Premium illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <HeroIllustration className="w-full drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------- Statistics (counters) */
function Statistics() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-16">
      <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-brand-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-medical-500/10 blur-3xl" />
      <div className="container-custom relative">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => {
            const I = statIcons[s.icon] || Landmark
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10 backdrop-blur"
              >
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md">
                  <I className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <p className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
                  <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm font-medium text-navy-200">{s.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- Why VPACS */
function WhyVPACS() {
  return (
    <section className="section">
      <div className="container-custom grid gap-12 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Why VPACS</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Why choose VPACS?
          </h2>
          <p className="mt-4 text-navy-600">
            We're built around one idea — making finance simple, honest and genuinely helpful.
            Here's what you can count on when you work with us.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {trustHighlights.map((h) => (
              <li key={h} className="flex items-center gap-3 rounded-xl bg-navy-50/70 px-4 py-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-sm font-semibold text-navy-800">{h}</span>
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-outline mt-8">
            More about VPACS <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {whyChoose.map((item, i) => {
            const I = featureIcons[item.icon] || ShieldCheck
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy-100 transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-brand-400 transition-transform group-hover:rotate-6">
                  <I className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------ Popular Services */
function PopularServices() {
  return (
    <section className="section bg-navy-50/60">
      <div className="container-custom">
        <div className="flex flex-col items-center">
          <SectionHeading
            eyebrow="Popular services"
            title="Popular financial solutions"
            subtitle="A snapshot of what our clients ask for most. Explore the full catalogue in each division."
          />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <ServiceCard key={s.id} service={s} accent="brand" />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/general-finance" className="btn-secondary transition-transform hover:scale-105">
            View all General Finance services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------- Division showcases */
function Divisions() {
  return (
    <section className="section">
      <div className="container-custom space-y-8">
        <div className="flex flex-col items-center">
          <SectionHeading
            eyebrow="Two divisions, one partner"
            title="Solutions for every need"
            subtitle="Whether it's a personal milestone, a growing business or your medical career — we have a dedicated division for you."
          />
        </div>

        {/* General Finance — text left, illustration right */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 overflow-hidden rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-100 lg:grid-cols-2 lg:items-center lg:p-10"
        >
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-md">
              <Briefcase className="h-7 w-7" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-2xl font-bold text-navy-900">General Finance</h3>
            <p className="mt-3 text-navy-600">
              Comprehensive financial solutions for individuals and businesses — loans, investments,
              insurance, tax and more, backed by 40+ lending partners.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-navy-700">
              {['Home & Property Loans', 'Business & MSME Loans', 'Personal & Car Loans', 'Mutual Funds & FDs', 'Insurance', 'Income Tax Filing'].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand-600" /> {x}
                </li>
              ))}
            </ul>
            <Link to="/general-finance" className="btn-primary mt-8 transition-transform hover:scale-105">
              Explore General Finance <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative rounded-2xl bg-gradient-to-br from-navy-50 to-brand-50/50 p-6">
            <HeroIllustration className="mx-auto w-full max-w-sm" />
          </div>
        </motion.div>

        {/* Healthcare Finance */}
        <HealthcareFinanceCard />
      </div>
    </section>
  )
}

/* ------------------------------------------------- Healthcare Finance Card */
const hcServices = [
  { icon: GraduationCap, label: 'Medical Education Loans', desc: 'MBBS, MD, BDS & abroad — full course coverage with moratorium.' },
  { icon: Stethoscope,   label: 'Doctor Loans',            desc: 'Collateral-free loans for practising doctors at preferential rates.' },
  { icon: HeartPulse,   label: 'Clinic Setup Loans',       desc: 'Interior, equipment & working capital to launch your clinic.' },
  { icon: Building2,    label: 'Hospital Finance',         desc: 'Large-ticket structured funding for construction & expansion.' },
  { icon: Microscope,   label: 'Equipment Loans',          desc: 'Up to 100% funding for diagnostic & treatment equipment.' },
  { icon: RefreshCw,    label: 'Working Capital',          desc: 'Renewable overdraft facilities — pay interest only on usage.' },
]

const hcStats = [
  { value: '₹50 Cr+', label: 'Healthcare loans disbursed' },
  { value: '500+',    label: 'Medical professionals served' },
  { value: '15+',     label: 'Lending partners' },
]

function HealthcareFinanceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="overflow-hidden rounded-3xl shadow-card ring-1 ring-navy-100"
    >
      {/* Header band */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0a2540] via-[#0d3460] to-[#0a4a7a] px-8 py-10 lg:px-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-medical-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 left-1/3 h-48 w-48 rounded-full bg-medical-400/10 blur-2xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-medical-500 shadow-lg">
              <HeartPulse className="h-7 w-7 text-white" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-medical-300">Dedicated Division</p>
              <h3 className="text-2xl font-bold text-white">Healthcare Finance</h3>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-navy-200">
            A full-spectrum finance division built exclusively for doctors, medical students and
            healthcare institutions — with products designed around the realities of the profession.
          </p>
        </div>

        {/* Stats row */}
        <div className="relative mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-6">
          {hcStats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-extrabold text-white">{s.value}</p>
              <p className="mt-0.5 text-xs text-navy-300">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services grid */}
      <div className="bg-white px-8 py-8 lg:px-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hcServices.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group flex gap-4 rounded-2xl border border-navy-100 bg-navy-50/40 p-4 transition-all hover:-translate-y-0.5 hover:border-medical-200 hover:bg-medical-50/40 hover:shadow-md"
            >
              <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-medical-500/10 text-medical-600 transition-colors group-hover:bg-medical-500 group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-900">{label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-navy-500">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-navy-500">
            Serving <span className="font-semibold text-navy-800">MBBS · BDS · MD · Nursing · Pharmacy</span> and all allied health sciences.
          </p>
          <Link to="/healthcare-finance" className="btn shrink-0 bg-medical-500 text-white transition-transform hover:scale-105 hover:bg-medical-600">
            Explore Healthcare Finance <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* --------------------------------------------------------- Testimonials */
function Testimonials() {
  const items = [
    {
      quote: 'VPACS made our home loan process effortless. They negotiated a great rate and handled all the paperwork. Truly professional.',
      name: 'Rahul Mehta', location: 'Hyderabad', type: 'Home Loan', color: 'bg-brand-600',
    },
    {
      quote: 'As a doctor setting up my own clinic, their healthcare finance team understood exactly what I needed. Quick and transparent.',
      name: 'Dr. Ananya Reddy', location: 'Bengaluru', type: 'Clinic Setup Loan', color: 'bg-medical-600',
    },
    {
      quote: 'Got my MBBS education loan sanctioned faster than I expected, with full guidance on documentation. Highly recommend.',
      name: 'Karthik Sharma', location: 'Chennai', type: 'Education Loan', color: 'bg-navy-800',
    },
  ]
  return (
    <section className="section bg-navy-50/60">
      <div className="container-custom">
        <div className="flex flex-col items-center">
          <SectionHeading
            eyebrow="Testimonials"
            title="What our clients say"
            subtitle="Real stories from people and businesses we've helped move forward."
          />
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <GoogleG className="h-5 w-5" />
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-navy-100 pt-4">
                <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${t.color}`}>
                  {t.name.replace('Dr. ', '').charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                  <p className="text-xs text-navy-500">{t.location} · {t.type}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function GoogleG({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}
