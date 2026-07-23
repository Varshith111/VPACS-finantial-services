import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Loader2, CheckCircle2, LogOut, AlertCircle } from 'lucide-react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'

// Inline Google "G" logo (official multi-colour mark).
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

export default function SignIn() {
  const { user, loading, error, isFirebaseConfigured, signInWithGoogle, signOut } = useAuth()
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  const handleSignIn = async () => {
    setBusy(true)
    const res = await signInWithGoogle()
    setBusy(false)
    if (res.ok) navigate('/')
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center justify-center overflow-hidden bg-hero-gradient py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-medical-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container-custom relative flex justify-center"
      >
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
          <div className="flex justify-center">
            <Logo />
          </div>

          {loading ? (
            <div className="mt-10 flex flex-col items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
              <p className="mt-3 text-sm text-navy-500">Checking your session…</p>
            </div>
          ) : user ? (
            <div className="mt-8 text-center">
              <div className="flex flex-col items-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="h-16 w-16 rounded-full ring-4 ring-navy-100" referrerPolicy="no-referrer" />
                ) : (
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-800 text-2xl font-semibold text-white">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
                <CheckCircle2 className="-mt-4 ml-12 h-6 w-6 rounded-full bg-white text-green-600" />
              </div>
              <h1 className="mt-4 text-xl font-bold text-navy-900">
                Welcome, {user.displayName?.split(' ')[0] || 'there'}!
              </h1>
              <p className="mt-1 text-sm text-navy-500">{user.email}</p>
              <p className="mt-4 text-sm text-navy-600">You're signed in to VPACS Financial Services.</p>
              <div className="mt-8 flex flex-col gap-3">
                <Link to="/" className="btn-primary w-full">Go to Home</Link>
                <button onClick={signOut} className="btn-outline w-full">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <h1 className="text-center text-2xl font-bold text-navy-900">Sign in to VPACS</h1>
              <p className="mt-2 text-center text-sm text-navy-500">
                Access your enquiries and manage your applications securely.
              </p>

              {!isFirebaseConfigured && (
                <div className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-100">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    Google sign-in isn't configured yet. Add your Firebase credentials to the
                    <code className="mx-1 rounded bg-amber-100 px-1">.env</code> file to enable it.
                  </span>
                </div>
              )}

              {error && (
                <div className="mt-6 flex items-start gap-2 rounded-xl bg-brand-50 p-4 text-sm text-brand-700 ring-1 ring-brand-100">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleSignIn}
                disabled={busy}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg border-2 border-navy-200 bg-white px-6 py-3 text-sm font-semibold text-navy-800 transition-all hover:border-navy-300 hover:bg-navy-50 disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleG />}
                {busy ? 'Signing in…' : 'Continue with Google'}
              </button>

              <div className="mt-6 flex items-center gap-2 rounded-xl bg-navy-50 p-3 text-xs text-navy-500">
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-navy-400" />
                We only use your Google account to identify you. We never post or access anything without permission.
              </div>

              <p className="mt-6 text-center text-xs text-navy-400">
                By continuing you agree to our terms and privacy policy.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
