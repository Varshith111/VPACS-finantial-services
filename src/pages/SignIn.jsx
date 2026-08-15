import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  Loader2,
  CheckCircle2,
  LogOut,
  AlertCircle,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  KeyRound,
  X,
} from 'lucide-react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'

// Inline Google "G" logo
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
  const {
    user,
    loading,
    error,
    isSupabaseConfigured,
    signIn,
    signUp,
    signInWithGoogle,
    resetPassword,
    signOut,
    setError,
  } = useAuth()

  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [infoMessage, setInfoMessage] = useState('')
  
  // Forgot password modal state
  const [resetOpen, setResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetBusy, setResetBusy] = useState(false)
  const [resetMsg, setResetMsg] = useState('')

  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setInfoMessage('')
    if (setError) setError(null)

    if (!email || !password) {
      if (setError) setError('Please provide both email and password.')
      return
    }

    setBusy(true)

    if (mode === 'signup') {
      if (!fullName) {
        if (setError) setError('Please enter your full name.')
        setBusy(false)
        return
      }
      const res = await signUp({ email, password, fullName })
      setBusy(false)
      if (res.ok) {
        setInfoMessage('Account created successfully! Check your email to confirm your account.')
      }
    } else {
      const res = await signIn({ email, password })
      setBusy(false)
      if (res.ok) {
        navigate('/')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    setInfoMessage('')
    if (setError) setError(null)
    setBusy(true)
    const res = await signInWithGoogle()
    setBusy(false)
    if (res.ok) {
      navigate('/')
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!resetEmail) return
    setResetBusy(true)
    setResetMsg('')
    const res = await resetPassword(resetEmail)
    setResetBusy(false)
    if (res.ok) {
      setResetMsg('Password reset instructions have been sent to your email.')
    }
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center justify-center overflow-hidden bg-hero-gradient py-12 px-4 sm:px-6">
      {/* Dynamic background patterns */}
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container-custom relative flex justify-center"
      >
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-10 border border-navy-100">
          <div className="flex justify-center">
            <Logo />
          </div>

          {loading ? (
            <div className="mt-10 flex flex-col items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
              <p className="mt-3 text-sm text-navy-500 font-medium">Authenticating session…</p>
            </div>
          ) : user ? (
            <div className="mt-8 text-center">
              <div className="flex flex-col items-center">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="h-20 w-20 rounded-full ring-4 ring-brand-100 object-cover shadow"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-hero-gradient text-3xl font-bold text-white shadow">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="-mt-4 ml-12 rounded-full bg-green-500 p-1 text-white shadow">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>

              <h1 className="mt-5 text-2xl font-bold text-navy-900">
                Welcome back, {user.displayName?.split(' ')[0] || 'there'}!
              </h1>
              <p className="mt-1 text-sm text-navy-500">{user.email}</p>
              
              <div className="mt-4 rounded-xl bg-navy-50/80 p-3 text-xs text-navy-600">
                <span className="font-semibold text-brand-600">Supabase Auth Connected</span> — You are securely signed in.
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link to="/" className="btn-primary w-full shadow-md">
                  Go to Dashboard / Home <ArrowRight className="h-4 w-4" />
                </Link>
                <button onClick={signOut} className="btn-outline w-full flex items-center justify-center gap-2">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              {/* Tab Switcher */}
              <div className="flex rounded-2xl bg-navy-50 p-1 mb-6 border border-navy-100">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin')
                    setInfoMessage('')
                    if (setError) setError(null)
                  }}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                    mode === 'signin'
                      ? 'bg-white text-navy-900 shadow-sm'
                      : 'text-navy-500 hover:text-navy-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup')
                    setInfoMessage('')
                    if (setError) setError(null)
                  }}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                    mode === 'signup'
                      ? 'bg-white text-navy-900 shadow-sm'
                      : 'text-navy-500 hover:text-navy-800'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <h1 className="text-center text-xl font-bold text-navy-900">
                {mode === 'signin' ? 'Welcome Back to VPACS' : 'Create your VPACS Account'}
              </h1>
              <p className="mt-1 text-center text-xs text-navy-500">
                {mode === 'signin'
                  ? 'Access your financial applications and enquiry status.'
                  : 'Get customized loan options and expert advisory services.'}
              </p>

              {/* Supabase Notice Banner if not configured */}
              {!isSupabaseConfigured && (
                <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-amber-50 p-3.5 text-xs text-amber-800 ring-1 ring-amber-200">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                  <div>
                    <p className="font-semibold">Supabase Credentials Required</p>
                    <p className="mt-0.5 opacity-90">
                      Add <code className="rounded bg-amber-100 px-1 font-mono">VITE_SUPABASE_URL</code> and{' '}
                      <code className="rounded bg-amber-100 px-1 font-mono">VITE_SUPABASE_ANON_KEY</code> to your{' '}
                      <code className="rounded bg-amber-100 px-1 font-mono">.env</code> file.
                    </p>
                  </div>
                </div>
              )}

              {/* Info or Error Alerts */}
              {infoMessage && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-emerald-50 p-3.5 text-xs text-emerald-800 ring-1 ring-emerald-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span>{infoMessage}</span>
                </div>
              )}

              {error && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-xs text-red-700 ring-1 ring-red-200">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Authentication Form */}
              <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Dr. Rajesh Kumar"
                        className="w-full rounded-xl border border-navy-200 bg-white py-2.5 pl-9 pr-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-navy-200 bg-white py-2.5 pl-9 pr-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700">
                      Password
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setResetEmail(email)
                          setResetOpen(true)
                          setResetMsg('')
                        }}
                        className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-navy-200 bg-white py-2.5 pl-9 pr-10 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="btn-primary w-full py-3 shadow-md transition-all hover:shadow-lg disabled:opacity-60 mt-2"
                >
                  {busy ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : mode === 'signin' ? (
                    'Sign In'
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-navy-100" />
                <span className="text-xs font-medium text-navy-400 uppercase tracking-wider">Or</span>
                <div className="h-px flex-1 bg-navy-100" />
              </div>

              {/* Google OAuth button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={busy}
                className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-navy-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 transition-all hover:border-navy-300 hover:bg-navy-50 disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleG className="h-5 w-5" />}
                <span>Continue with Google</span>
              </button>

              {/* Footer notice */}
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-navy-50 p-2.5 text-[11px] text-navy-500">
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-navy-400" />
                Protected by Supabase enterprise auth security & encryption.
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {resetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl relative border border-navy-100"
            >
              <button
                type="button"
                onClick={() => setResetOpen(false)}
                className="absolute right-4 top-4 text-navy-400 hover:text-navy-600"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 mb-3">
                <KeyRound className="h-5 w-5" />
              </div>

              <h2 className="text-lg font-bold text-navy-900">Reset your password</h2>
              <p className="mt-1 text-xs text-navy-500">
                Enter your email address and we'll send you instructions to reset your password.
              </p>

              {resetMsg && (
                <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
                  {resetMsg}
                </div>
              )}

              <form onSubmit={handleResetPassword} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setResetOpen(false)}
                    className="btn-outline flex-1 py-2 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resetBusy}
                    className="btn-primary flex-1 py-2 text-xs"
                  >
                    {resetBusy ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
