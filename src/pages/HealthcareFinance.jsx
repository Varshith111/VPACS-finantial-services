import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight, ShieldCheck, ClipboardCheck, Sparkles, Activity } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import Icon from '../components/Icon'
import { HealthcareScene } from '../components/Illustrations'
import {
  healthcareProfessionals,
  medicalStudents,
  healthcareFinancing,
} from '../data/healthcareServices'

// A small decorative element for premium feel
const GlowEffect = ({ className }) => (
  <div className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float pointer-events-none ${className}`} />
);

export default function HealthcareFinance() {
  const { hash } = useLocation()
  
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [hash])

  return (
    <div className="relative bg-navy-50/30">
      <PageHero
        variant="medical"
        eyebrow="Healthcare Finance"
        breadcrumb="Healthcare Finance"
        title="Elevate Your Medical Practice"
        subtitle="Specialised funding designed exclusively for healthcare professionals, institutions, and aspiring medical students."
      >
        <div className="mt-10 flex flex-wrap gap-4">
          {[
            { label: 'Healthcare Professionals', href: '#professionals' },
            { label: 'Medical Students', href: '#students' },
            { label: 'Financing Solutions', href: '#solutions' },
          ].map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="group relative overflow-hidden rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] ring-1 ring-white/30 backdrop-blur-md transition-all hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
            >
              <span className="relative z-10">{c.label}</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
            </a>
          ))}
        </div>
      </PageHero>

      {/* Premium Illustration strip with glassmorphism */}
      <section className="relative z-10 -mt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { kind: 'doctor', title: 'For Doctors & Clinics', desc: 'Accelerate growth with seamless practice expansion funding.' },
            { kind: 'hospital', title: 'For Hospitals', desc: 'Secure robust capital for large-scale infrastructure & tech.' },
            { kind: 'equipment', title: 'For Equipment', desc: 'State-of-the-art diagnostic and treatment equipment financing.' },
          ].map((s, i) => (
            <motion.div
              key={s.kind}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="group overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-card ring-1 ring-white/50 border border-navy-100 transition-all hover:shadow-card-hover hover:-translate-y-2"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-medical-50 to-white pt-6">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity z-20">
                    <Activity className="w-24 h-24 text-medical-600" />
                 </div>
                 <img src={`/images/${s.kind}.png`} alt={s.title} className="w-full h-56 object-cover relative z-10 transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="relative p-8 bg-white">
                <h3 className="text-xl font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed text-navy-600">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Professionals Section - Asymmetrical Layout */}
      <section id="professionals" className="relative py-24 scroll-mt-24 overflow-hidden bg-white">
        <GlowEffect className="top-0 left-0 w-[500px] h-[500px] bg-medical-200/40 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-50 text-medical-700 text-sm font-semibold mb-6 ring-1 ring-medical-200">
                <Sparkles className="w-4 h-4" /> Excellence in Finance
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-navy-900 leading-tight">
                Empowering <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-brand-500">Healthcare Professionals</span>
              </h2>
            </div>
            <div className="max-w-md lg:pt-14">
              <p className="text-lg text-navy-600 border-l-4 border-medical-500 pl-6 py-2">
                Whether you run a private practice, a specialized pharmacy, or a multi-speciality hospital, we structure intelligent finance that aligns perfectly with your cash flow and ambitious growth plans.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {healthcareProfessionals.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="group relative flex flex-col items-start rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-navy-100 transition-all hover:-translate-y-2 hover:shadow-card-hover overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-medical-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-medical-100 to-medical-50 text-medical-700 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <img src={p.imgSrc} alt={p.name} className="h-10 w-10 object-contain" />
                </span>
                <div className="relative mt-6">
                  <h3 className="text-xl font-bold text-navy-900 group-hover:text-medical-700 transition-colors">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical students - Sleek Dark/Accent Section */}
      <section id="students" className="relative py-24 scroll-mt-24 bg-navy-900 text-white overflow-hidden">
        <GlowEffect className="bottom-0 right-0 w-[600px] h-[600px] bg-medical-500/20 translate-x-1/3 translate-y-1/3" />
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-medical-300 text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm ring-1 ring-white/20">
              Education Finance
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Invest in your <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-300 to-medical-100">Medical Journey</span>
            </h2>
            <p className="text-lg text-navy-200">
              Comprehensive education loans covering tuition, living, and travel costs for medical studies globally. Focus on your degree with our extended moratorium periods.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {medicalStudents.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-medical-500/20 text-medical-300 group-hover:bg-medical-500 group-hover:text-white transition-colors">
                     <img src={s.imgSrc} alt={s.name} className="h-6 w-6 object-contain" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">{s.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/contact?service=Medical%20Education%20Loan" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-navy-900 shadow-lg transition-all hover:bg-medical-50 hover:shadow-xl hover:-translate-y-1 ring-1 ring-white/50">
              Enquire about Education Loans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Financing solutions - Premium Cards */}
      <section id="solutions" className="relative py-24 scroll-mt-24 bg-navy-50/40">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-navy-900 mb-6">
              Tailored Financing <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-brand-500">Solutions</span>
            </h2>
            <p className="text-lg text-navy-600">
              Purpose-built loan products meticulously engineered for every stage of your healthcare career.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {healthcareFinancing.map((s, i) => (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: "easeOut" }}
                className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-card transition-all hover:shadow-card-hover border border-navy-100/50"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-medical-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative p-8 sm:p-10 border-b border-navy-50">
                  <div className="flex items-start gap-6">
                    <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-medical-600 to-medical-800 text-white shadow-lg shadow-medical-600/30 transition-transform duration-500 group-hover:scale-110">
                      <img src={s.imgSrc} alt={s.name} className="h-10 w-10 object-contain" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-navy-900 mb-2">{s.name}</h3>
                      <p className="text-sm leading-relaxed text-navy-600">{s.overview}</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex flex-1 flex-col p-8 sm:p-10 bg-gradient-to-b from-white to-navy-50/20">
                  <div className="grid gap-8 sm:grid-cols-2 flex-1">
                    <div className="bg-white rounded-2xl p-6 ring-1 ring-navy-100 shadow-sm transition-all group-hover:shadow-md">
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy-400 mb-4">
                        <span className="flex p-1.5 rounded-md bg-medical-50 text-medical-600">
                          <ClipboardCheck className="h-4 w-4" /> 
                        </span>
                        Eligibility
                      </p>
                      <ul className="space-y-3">
                        {s.eligibility.map((e) => (
                          <li key={e} className="flex items-start gap-3 text-sm text-navy-700">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-medical-600" strokeWidth={2.5} />
                            <span className="leading-snug">{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-2xl p-6 ring-1 ring-brand-100 shadow-sm transition-all group-hover:shadow-md">
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy-400 mb-4">
                        <span className="flex p-1.5 rounded-md bg-brand-50 text-brand-600">
                          <ShieldCheck className="h-4 w-4" /> 
                        </span>
                        Benefits
                      </p>
                      <ul className="space-y-3">
                        {s.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm text-navy-700">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" strokeWidth={2.5} />
                            <span className="leading-snug">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-navy-100 pt-6">
                    <Link
                      to={`/contact?service=${encodeURIComponent(s.name)}`}
                      className="group/link inline-flex items-center gap-2 text-sm font-bold text-medical-700 hover:text-medical-800 transition-colors"
                    >
                      Enquire about {s.name} 
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-medical-50 group-hover/link:bg-medical-100 transition-colors">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let's Finance Your Future"
        subtitle="From your very first year of medical school to expanding your multi-speciality hospital — VPACS has a bespoke solution. Speak with our specialized healthcare finance experts today."
      />
    </div>
  )
}
