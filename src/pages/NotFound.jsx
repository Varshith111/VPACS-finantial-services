import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-navy-50/60 py-20">
      <div className="container-custom text-center">
        <p className="font-display text-7xl font-extrabold text-navy-900 sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-navy-800">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-navy-500">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <Link to="/contact" className="btn-outline">
            <ArrowLeft className="h-4 w-4" /> Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
