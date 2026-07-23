import { useState, useEffect } from 'react'
import { MessageCircle, Phone, ArrowUp } from 'lucide-react'
import { site } from '../data/site'

// Floating action stack (bottom-right): WhatsApp, Call, and Back-to-Top.
// Back-to-Top appears after the user scrolls down.
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waMessage = encodeURIComponent(
    "Hello VPACS, I'd like to know more about your financial services.",
  )
  const waHref = `https://wa.me/${site.whatsapp}?text=${waMessage}`
  const telHref = `tel:${site.phone.replace(/\s+/g, '')}`

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-navy-900 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Call (prominent on mobile) */}
      <a
        href={telHref}
        aria-label="Call VPACS"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-brand-700 sm:hidden"
      >
        <Phone className="h-5 w-5" />
      </a>

      {/* WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex items-center gap-3 rounded-full bg-[#25D366] px-3.5 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <MessageCircle className="h-6 w-6 fill-white" strokeWidth={0} />
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100 sm:inline">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  )
}

// Desktop-only sticky help card pinned to the right edge (improvement #19).
export function StickyHelp() {
  const telHref = `tel:${site.phone.replace(/\s+/g, '')}`
  const waHref = `https://wa.me/${site.whatsapp}`
  return (
    <div className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col overflow-hidden rounded-l-2xl bg-navy-900 shadow-card-hover">
        <div className="bg-brand-gradient px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-white">
          Need help?
        </div>
        <a
          href={telHref}
          className="group flex flex-col items-center gap-1 px-4 py-3 text-navy-200 transition-colors hover:bg-navy-800 hover:text-white"
          aria-label="Call now"
        >
          <Phone className="h-5 w-5 text-brand-400" />
          <span className="text-[10px] font-semibold">Call</span>
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-1 border-t border-navy-800 px-4 py-3 text-navy-200 transition-colors hover:bg-navy-800 hover:text-white"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5 text-[#25D366]" />
          <span className="text-[10px] font-semibold">Chat</span>
        </a>
      </div>
    </div>
  )
}
