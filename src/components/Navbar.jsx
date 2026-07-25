import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, LogOut, Phone, ArrowRight, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import Icon from './Icon'
import { useAuth } from '../context/AuthContext'
import { site } from '../data/site'
import { generalCategories, generalServices } from '../data/generalServices'
import { healthcareFinancing } from '../data/healthcareServices'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'General Finance', to: '/general-finance', mega: 'general' },
  { label: 'Medical Education Finance', to: '/healthcare-finance', mega: 'healthcare' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMega, setOpenMega] = useState(null)
  const { user, signOut } = useAuth()
  const location = useLocation()
  const megaTimeout = useRef(null)
  const isHome = location.pathname === '/'
  // Transparent navbar only on the landing page when user hasn't scrolled
  const transparent = isHome && !scrolled && !mobileOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMega(null)
  }, [location.pathname])

  const handleMegaEnter = (key) => {
    clearTimeout(megaTimeout.current)
    setOpenMega(key)
  }
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setOpenMega(null), 120)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ---------- Main navigation ---------- */}
      <div
        className={`w-full border-b transition-all duration-300 ${
          transparent
            ? 'border-transparent bg-transparent'
            : scrolled
              ? 'border-navy-100 bg-white/95 shadow-nav backdrop-blur'
              : 'border-transparent bg-white'
        }`}
      >
        <nav
          className={`container-custom flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-18'
          }`}
        >
          <Logo light={transparent} />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => (
              <li
                key={item.to}
                className="relative"
                onMouseEnter={() => item.mega && handleMegaEnter(item.mega)}
                onMouseLeave={handleMegaLeave}
              >
                <NavLink to={item.to} className="group relative flex items-center gap-1 px-4 py-2 text-sm font-semibold">
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? (transparent ? 'text-white' : 'text-brand-600') : `${transparent ? 'text-white/90' : 'text-navy-800'} transition-colors group-hover:text-brand-600`}>
                        {item.label}
                      </span>
                      {item.mega && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-all ${
                            isActive ? (transparent ? 'text-white' : 'text-brand-600') : `${transparent ? 'text-white/70' : 'text-navy-500'} group-hover:text-brand-600`
                          } ${openMega === item.mega ? 'rotate-180' : ''}`}
                        />
                      )}
                      {/* Animated underline */}
                      <span
                        className={`absolute -bottom-0.5 left-4 right-4 h-0.5 origin-left rounded-full bg-brand-600 transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>

                {item.mega === 'general' && openMega === 'general' && <MegaGeneral />}
                {item.mega === 'healthcare' && openMega === 'healthcare' && <MegaHealthcare />}
              </li>
            ))}
          </ul>

          {/* Auth / CTA */}
          <div className="hidden items-center gap-2.5 lg:flex">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Account'}
                      className="h-9 w-9 rounded-full ring-2 ring-navy-100"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-hero-gradient text-sm font-semibold text-white">
                      {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="max-w-[8rem] truncate text-sm font-medium text-navy-800">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button onClick={signOut} className="btn-ghost px-3 py-2" aria-label="Sign out" title="Sign out">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Quick call */}
                <a
                  href={`tel:${site.phone.replace(/\s+/g, '')}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${transparent ? 'text-white ring-1 ring-white/30 hover:bg-white/10' : 'text-[#004C8F] ring-1 ring-navy-200 hover:bg-navy-50'}`}
                  aria-label="Call us"
                  title={site.phone}
                >
                  <Phone className="h-4 w-4" />
                </a>
                <Link to="/contact" className="btn-primary shadow-md transition-transform hover:scale-105">
                  Consult Now <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className={`rounded-lg p-2 lg:hidden ${transparent ? 'text-white' : 'text-navy-800'}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && <MobileMenu user={user} signOut={signOut} />}
    </header>
  )
}

function MegaGeneral() {
  return (
    <div className="absolute left-1/2 top-full z-50 mt-2 w-[46rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card-hover">
      <div className="grid grid-cols-3">
        <div className="col-span-2 p-5">
          <div className="grid grid-cols-2 gap-1">
            {generalCategories.map((cat) => {
              const items = generalServices.filter((s) => s.category === cat.id)
              return (
                <div key={cat.id} className="p-2">
                  <p className="px-2 text-xs font-bold uppercase tracking-wider text-brand-600">{cat.title}</p>
                  <ul className="mt-1.5">
                    {items.slice(0, 6).map((s) => (
                      <li key={s.id}>
                        <Link
                          to={`/general-finance#${s.category}`}
                          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-navy-700 transition-colors hover:bg-navy-50 hover:text-brand-600"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-50 text-[#004C8F]">
                            <Icon name={s.icon} className="h-4 w-4" />
                          </span>
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
        {/* Promo panel */}
        <div className="relative flex flex-col justify-between bg-hero-gradient p-6 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Need funds fast?</p>
            <p className="mt-2 text-lg font-bold leading-snug">Get a tailored loan offer in minutes.</p>
            <p className="mt-2 text-sm text-white/75">Free advice across 40+ banking partners.</p>
          </div>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Consult Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <Link
        to="/general-finance"
        className="block border-t border-navy-100 bg-navy-50/60 px-5 py-3 text-center text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-100"
      >
        View all General Finance services →
      </Link>
    </div>
  )
}

function MegaHealthcare() {
  return (
    <div className="absolute left-1/2 top-full z-50 mt-2 w-[36rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card-hover">
      <div className="p-5">
        <p className="px-2 text-xs font-bold uppercase tracking-wider text-medical-600">Medical Education Financing Solutions</p>
        <div className="mt-2 grid grid-cols-2 gap-1">
          {healthcareFinancing.map((s) => (
            <Link
              key={s.id}
              to="/healthcare-finance#solutions"
              className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-navy-700 transition-colors hover:bg-medical-50 hover:text-medical-700"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-medical-50 text-medical-600">
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              {s.name}
            </Link>
          ))}
        </div>
      </div>
      <Link
        to="/healthcare-finance"
        className="block border-t border-navy-100 bg-medical-50/60 px-5 py-3 text-center text-sm font-semibold text-medical-800 transition-colors hover:bg-medical-100"
      >
        Explore Medical Education Finance →
      </Link>
    </div>
  )
}

function MobileMenu({ user, signOut }) {
  const [expanded, setExpanded] = useState(null)
  return (
    <div className="border-t border-navy-100 bg-white lg:hidden">
      <div className="container-custom space-y-1 py-4">
        {navItems.map((item) => (
          <div key={item.to}>
            {item.mega ? (
              <>
                <button
                  onClick={() => setExpanded(expanded === item.mega ? null : item.mega)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-800 hover:bg-navy-50"
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded === item.mega ? 'rotate-180' : ''}`} />
                </button>
                {expanded === item.mega && (
                  <div className="ml-3 border-l border-navy-100 pl-3">
                    <Link to={item.to} className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-600">
                      View all →
                    </Link>
                    {(item.mega === 'general' ? generalServices.slice(0, 8) : healthcareFinancing).map((s) => (
                      <Link key={s.id} to={item.to} className="block rounded-lg px-3 py-2 text-sm text-navy-600 hover:bg-navy-50">
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-800 hover:bg-navy-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )}
          </div>
        ))}

        <div className="!mt-4 space-y-3 border-t border-navy-100 pt-4">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="h-9 w-9 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-hero-gradient text-sm font-semibold text-white">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="text-sm font-medium text-navy-800">{user.displayName || user.email}</span>
              </div>
              <button onClick={signOut} className="btn-ghost px-3 py-2">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/contact" className="btn-primary w-full">
                Consult Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Mobile contact strip */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a href={`tel:${site.phone.replace(/\s+/g, '')}`} className="flex items-center justify-center gap-2 rounded-lg bg-navy-50 px-3 py-2.5 text-sm font-semibold text-navy-800">
              <Phone className="h-4 w-4 text-[#004C8F]" /> Call
            </a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-navy-50 px-3 py-2.5 text-sm font-semibold text-navy-800">
              <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
