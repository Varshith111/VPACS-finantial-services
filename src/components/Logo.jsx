import { Link } from 'react-router-dom'

// VPACS wordmark + monogram. `light` renders white text for dark backgrounds.
export default function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" className={`flex items-center ${className}`} aria-label="VPACS home">
      <img
        src="/vpacs-logo.png"
        alt="VPACS Financial Services"
        className={`h-16 w-auto object-contain ${light ? 'brightness-0 invert' : ''}`}
      />
    </Link>
  )
}
