import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, LogOut } from 'lucide-react'
import Logo from './Logo'
import Icon from './Icon'
import { useAuth } from '../context/AuthContext'
import { generalCategories, generalServices } from '../data/generalServices'
import { healthcareFinancing } from '../data/healthcareServices'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'General Finance', to: '/general-finance', mega: 'general' },
  { label: 'Healthcare Finance', to: '/healthcare-finance', mega: 'healthcare' },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on route change.
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-nav backdrop-blur' : 'bg-white'
      }`}
    >
      <nav
        className={`container-custom flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-16 py-2' : 'h-18 py-3'
        }`}
      >
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li
              key={item.to}
              className="relative"
              onMouseEnter={() => item.mega && handleMegaEnter(item.mega)}
              onMouseLeave={handleMegaLeave}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-brand-600'
                      : 'text-navy-700 hover:bg-navy-50 hover:text-navy-900'
                  }`
                }
              >
                {item.label}
                {item.mega && <ChevronDown className="h-3.5 w-3.5" />}
              </NavLink>

              {item.mega === 'general' && openMega === 'general' && (
                <MegaGeneral />
              )}
              {item.mega === 'healthcare' && openMega === 'healthcare' && (
                <MegaHealthcare />
              )}
            </li>
          ))}
        </ul>

        {/* Auth / CTA */}
        <div className="hidden items-center gap-3 lg:flex">
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
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-sm font-semibold text-white">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="max-w-[8rem] truncate text-sm font-medium text-navy-800">
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={signOut}
                className="btn-ghost px-3 py-2"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Link to="/signin" className="btn-ghost">
                Sign In
              </Link>
              <Link to="/contact" className="btn-primary">
                Apply Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-navy-800 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && <MobileMenu user={user} signOut={signOut} />}
    </header>
  )
}

function MegaGeneral() {
  return (
    <div
      className="absolute left-1/2 top-full z-50 mt-1 w-[42rem] -translate-x-1/2 rounded-2xl border border-navy-100 bg-white p-4 shadow-card-hover"
    >
      <div className="grid grid-cols-2 gap-1">
        {generalCategories.map((cat) => {
          const items = generalServices.filter((s) => s.category === cat.id)
          return (
            <div key={cat.id} className="p-2">
              <p className="px-2 text-xs font-bold uppercase tracking-wider text-brand-600">
                {cat.title}
              </p>
              <ul className="mt-1.5">
                {items.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/general-finance#${s.category}`}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-navy-700 hover:bg-navy-50 hover:text-navy-900"
                    >
                      <Icon name={s.icon} className="h-4 w-4 text-navy-400" />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <Link
        to="/general-finance"
        className="mt-2 block rounded-xl bg-navy-50 px-4 py-2.5 text-center text-sm font-semibold text-navy-800 hover:bg-navy-100"
      >
        View all General Finance services →
      </Link>
    </div>
  )
}

function MegaHealthcare() {
  return (
    <div className="absolute left-1/2 top-full z-50 mt-1 w-[34rem] -translate-x-1/2 rounded-2xl border border-navy-100 bg-white p-4 shadow-card-hover">
      <p className="px-2 text-xs font-bold uppercase tracking-wider text-medical-600">
        Healthcare Financing Solutions
      </p>
      <div className="mt-1.5 grid grid-cols-2 gap-1">
        {healthcareFinancing.map((s) => (
          <Link
            key={s.id}
            to={`/healthcare-finance#solutions`}
            className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-navy-700 hover:bg-medical-50 hover:text-navy-900"
          >
            <Icon name={s.icon} className="h-4 w-4 text-medical-500" />
            {s.name}
          </Link>
        ))}
      </div>
      <Link
        to="/healthcare-finance"
        className="mt-2 block rounded-xl bg-medical-50 px-4 py-2.5 text-center text-sm font-semibold text-medical-800 hover:bg-medical-100"
      >
        Explore Healthcare Finance →
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
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      expanded === item.mega ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expanded === item.mega && (
                  <div className="ml-3 border-l border-navy-100 pl-3">
                    <Link
                      to={item.to}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-600"
                    >
                      View all →
                    </Link>
                    {(item.mega === 'general'
                      ? generalServices.slice(0, 8)
                      : healthcareFinancing
                    ).map((s) => (
                      <Link
                        key={s.id}
                        to={item.to}
                        className="block rounded-lg px-3 py-2 text-sm text-navy-600 hover:bg-navy-50"
                      >
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

        <div className="!mt-4 border-t border-navy-100 pt-4">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-9 w-9 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-sm font-semibold text-white">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="text-sm font-medium text-navy-800">
                  {user.displayName || user.email}
                </span>
              </div>
              <button onClick={signOut} className="btn-ghost px-3 py-2">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/signin" className="btn-outline w-full">
                Sign In
              </Link>
              <Link to="/contact" className="btn-primary w-full">
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
