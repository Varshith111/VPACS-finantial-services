// Premium inline SVG illustrations (no external assets — CSP/asset-safe).
// Swap these for real photography/illustration when the client provides it.

// Hero: a fintech "growth dashboard" scene with advisor + client abstraction,
// rising chart, coins, shield and a home — communicating trust + finance.
export function HeroIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 520 460" className={className} role="img" aria-label="VPACS financial growth illustration" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hi-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef2f7" />
        </linearGradient>
        <linearGradient id="hi-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#c62d3d" />
          <stop offset="1" stopColor="#ea7580" />
        </linearGradient>
        <linearGradient id="hi-bar2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1f3a66" />
          <stop offset="1" stopColor="#4f6f9f" />
        </linearGradient>
        <linearGradient id="hi-coin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="hi-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0b1a33" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Soft backdrop blob */}
      <circle cx="270" cy="220" r="200" fill="#3b93fc" opacity="0.08" />

      {/* Main dashboard card */}
      <g filter="url(#hi-shadow)">
        <rect x="70" y="70" width="300" height="230" rx="20" fill="url(#hi-card)" />
        <rect x="70" y="70" width="300" height="52" rx="20" fill="#0b1a33" />
        <rect x="70" y="104" width="300" height="18" fill="#0b1a33" />
        <circle cx="94" cy="96" r="6" fill="#c62d3d" />
        <circle cx="112" cy="96" r="6" fill="#3b93fc" />
        <rect x="130" y="90" width="90" height="12" rx="6" fill="#ffffff" opacity="0.85" />

        {/* Chart bars */}
        <rect x="100" y="210" width="30" height="60" rx="6" fill="url(#hi-bar2)" />
        <rect x="146" y="180" width="30" height="90" rx="6" fill="url(#hi-bar2)" />
        <rect x="192" y="200" width="30" height="70" rx="6" fill="url(#hi-bar)" />
        <rect x="238" y="150" width="30" height="120" rx="6" fill="url(#hi-bar)" />
        <rect x="284" y="130" width="30" height="140" rx="6" fill="url(#hi-bar)" />

        {/* Rising trend line */}
        <polyline points="105,195 155,175 205,182 255,150 305,120" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="305" cy="120" r="7" fill="#16a34a" stroke="#ffffff" strokeWidth="3" />
      </g>

      {/* Floating shield (trust) */}
      <g filter="url(#hi-shadow)">
        <rect x="360" y="120" width="96" height="96" rx="20" fill="#ffffff" />
        <path d="M408 138l24 9v18c0 15-10 27-24 33-14-6-24-18-24-33v-18l24-9z" fill="#1f3a66" />
        <path d="M399 168l7 7 13-14" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Floating home (loans) */}
      <g filter="url(#hi-shadow)">
        <rect x="40" y="250" width="96" height="96" rx="20" fill="#ffffff" />
        <path d="M88 272l30 24h-8v30H66v-30h-8l30-24z" fill="#c62d3d" />
        <rect x="80" y="308" width="16" height="18" rx="2" fill="#ffffff" />
      </g>

      {/* Coin stack (wealth) */}
      <g filter="url(#hi-shadow)">
        <ellipse cx="300" cy="360" rx="46" ry="16" fill="url(#hi-coin)" />
        <rect x="254" y="338" width="92" height="22" fill="url(#hi-coin)" />
        <ellipse cx="300" cy="338" rx="46" ry="16" fill="#fcd34d" />
        <rect x="254" y="318" width="92" height="20" fill="url(#hi-coin)" />
        <ellipse cx="300" cy="318" rx="46" ry="16" fill="#fcd34d" />
        <text x="300" y="324" textAnchor="middle" fontSize="18" fontWeight="700" fill="#a16207">₹</text>
      </g>

      {/* Small sparkle accents */}
      <circle cx="150" cy="50" r="6" fill="#c62d3d" opacity="0.6" />
      <circle cx="430" cy="70" r="8" fill="#3b93fc" opacity="0.5" />
      <circle cx="470" cy="300" r="6" fill="#c62d3d" opacity="0.5" />
    </svg>
  )
}

// Founder / advisor portrait placeholder (abstract, professional).
export function FounderAvatar({ className = '' }) {
  return (
    <svg viewBox="0 0 320 360" className={className} role="img" aria-label="Founder portrait placeholder" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fa-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#122340" />
          <stop offset="1" stopColor="#1f3a66" />
        </linearGradient>
      </defs>
      <rect width="320" height="360" rx="24" fill="url(#fa-bg)" />
      <circle cx="160" cy="130" r="60" fill="#dce4ee" />
      <path d="M160 96a30 30 0 0 1 30 30c0 18-13 34-30 34s-30-16-30-34a30 30 0 0 1 30-30z" fill="#8da6c4" />
      <path d="M70 330c0-52 40-92 90-92s90 40 90 92v30H70v-30z" fill="#dce4ee" />
      {/* Suit */}
      <path d="M120 250l40 26 40-26 20 22v88H100v-88l20-22z" fill="#0b1a33" />
      <path d="M150 262l10 16 10-16-4 40h-12l-4-40z" fill="#c62d3d" />
      <circle cx="160" cy="330" r="4" fill="#dce4ee" />
    </svg>
  )
}

// Compact healthcare scene tiles (hospital / doctor / equipment).
export function HealthcareScene({ kind = 'hospital', className = '' }) {
  const scenes = {
    hospital: (
      <g>
        <rect x="30" y="70" width="180" height="120" rx="10" fill="#ffffff" />
        <rect x="30" y="70" width="180" height="24" rx="10" fill="#2574f1" />
        <rect x="105" y="110" width="30" height="30" fill="#2574f1" />
        <rect x="112" y="104" width="16" height="42" fill="#2574f1" />
        <rect x="112" y="118" width="16" height="14" fill="#ffffff" />
        <rect x="50" y="150" width="24" height="40" fill="#dbeeff" />
        <rect x="166" y="150" width="24" height="40" fill="#dbeeff" />
      </g>
    ),
    doctor: (
      <g>
        <circle cx="120" cy="80" r="34" fill="#dbeeff" />
        <path d="M92 84a28 28 0 0 1 56 0c0 16-12 30-28 30s-28-14-28-30z" fill="#93d0ff" />
        <path d="M70 190c0-32 22-56 50-56s50 24 50 56v4H70v-4z" fill="#ffffff" />
        <path d="M100 140v22a20 20 0 0 0 40 0v-16" fill="none" stroke="#2574f1" strokeWidth="4" />
        <circle cx="140" cy="140" r="6" fill="#c62d3d" />
      </g>
    ),
    equipment: (
      <g>
        <rect x="40" y="60" width="160" height="110" rx="12" fill="#ffffff" />
        <rect x="56" y="78" width="128" height="60" rx="6" fill="#0b1a33" />
        <polyline points="66,120 90,120 100,96 116,132 128,108 150,108 174,120" fill="none" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="90" y="150" width="60" height="10" rx="5" fill="#dbeeff" />
      </g>
    ),
  }
  return (
    <svg viewBox="0 0 240 210" className={className} role="img" aria-label={`${kind} illustration`} xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="210" rx="16" fill="#eff8ff" />
      {scenes[kind]}
    </svg>
  )
}
