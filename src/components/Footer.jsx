import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import { site, bankingPartners } from '../data/site'

const OriginalLogo = () => (
  <div className="flex items-center gap-2.5">
    <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 shadow-md ring-1 ring-white/10">
      <span className="font-display text-lg font-extrabold text-white">V</span>
      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-navy-950 bg-brand-600" />
    </span>
    <span className="flex flex-col leading-none">
      <span className="font-display text-xl font-extrabold tracking-tight text-white">
        VPACS
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-200">
        Financial Services
      </span>
    </span>
  </div>
)

const partnerNames = bankingPartners.slice(0, 6)

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Disclaimer', to: '/disclaimer' },
]

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'General Finance', to: '/general-finance' },
  { label: 'Healthcare Finance', to: '/healthcare-finance' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

const generalLinks = [
  { label: 'Home Loans', to: '/general-finance#banking-loans' },
  { label: 'Business Loans', to: '/general-finance#banking-loans' },
  { label: 'Personal Loans', to: '/general-finance#banking-loans' },
  { label: 'Mutual Funds', to: '/general-finance#investment-tax' },
  { label: 'Insurance', to: '/general-finance#investment-tax' },
  { label: 'Income Tax Filing', to: '/general-finance#investment-tax' },
]

const healthcareLinks = [
  { label: 'Medical Education Loans', to: '/healthcare-finance#solutions' },
  { label: 'Doctor Loans', to: '/healthcare-finance#solutions' },
  { label: 'Clinic Setup Loans', to: '/healthcare-finance#solutions' },
  { label: 'Hospital Finance', to: '/healthcare-finance#solutions' },
  { label: 'Medical Equipment Loans', to: '/healthcare-finance#solutions' },
]

const socials = [
  { name: 'Facebook', icon: Facebook, href: site.social.facebook },
  { name: 'Instagram', icon: Instagram, href: site.social.instagram },
  { name: 'LinkedIn', icon: Linkedin, href: site.social.linkedin },
  { name: 'Twitter', icon: Twitter, href: site.social.twitter },
  { name: 'YouTube', icon: Youtube, href: site.social.youtube },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="container-custom py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" aria-label="VPACS home">
              <OriginalLogo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-300">
              {site.description} From home and business loans to healthcare financing, VPACS is
              your trusted partner for every financial milestone.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary px-5 py-2.5 text-sm">
                Quick Apply
              </Link>
              <a
                href={`tel:${site.phone.replace(/\s+/g, '')}`}
                className="btn border-2 border-navy-700 px-5 py-2.5 text-sm text-white hover:bg-navy-800"
              >
                Call Now
              </a>
            </div>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-navy-200 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-navy-300 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* General finance */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">General Finance</h4>
            <ul className="mt-4 space-y-2.5">
              {generalLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-navy-300 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Healthcare */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Healthcare Finance</h4>
            <ul className="mt-4 space-y-2.5">
              {healthcareLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-navy-300 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 grid gap-4 border-t border-navy-800 pt-8 sm:grid-cols-3">
          <a href={`tel:${site.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm text-navy-300 hover:text-white">
            <Phone className="h-5 w-5 text-brand-500" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-sm text-navy-300 hover:text-white">
            <Mail className="h-5 w-5 text-brand-500" />
            {site.email}
          </a>
          <div className="flex items-start gap-3 text-sm text-navy-300">
            <MapPin className="h-5 w-5 flex-shrink-0 text-brand-500" />
            <span>
              {site.address.city}, {site.address.state}, {site.address.country}
            </span>
          </div>
        </div>
      </div>

      {/* Partner banks strip */}
      <div className="border-t border-navy-800">
        <div className="container-custom py-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-navy-500">
            Our lending partners include
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-navy-300">
            {partnerNames.map((n) => (
              <span key={n} className="whitespace-nowrap">{n}</span>
            ))}
            <span className="text-navy-500">&amp; 30+ more</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="container-custom flex flex-col items-center gap-4 py-5 text-xs text-navy-400 lg:flex-row lg:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l.label} to={l.to} className="text-navy-300 hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="container-custom pb-6">
          <p className="text-center text-[11px] leading-relaxed text-navy-500">
            Disclaimer: VPACS Financial Services acts as a financial services facilitator. Loans are
            subject to eligibility and approval by lending partners. Interest rates and terms are
            indicative and determined by the respective bank/NBFC. Terms &amp; conditions apply.
          </p>
        </div>
      </div>
    </footer>
  )
}
