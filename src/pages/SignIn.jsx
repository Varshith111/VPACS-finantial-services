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
  FileText,
  CreditCard,
  Building2,
  Award,
  Phone,
  MessageCircle,
  Clock,
  ChevronRight,
  Edit3,
  Save,
  Stethoscope,
  BadgeCheck,
} from 'lucide-react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { site } from '../data/site'

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

  // Dashboard state
  const [activeTab, setActiveTab] = useState('enquiries') // 'enquiries' | 'profile' | 'services' | 'security'
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    phone: '+91 9553831325',
    profession: 'Medical Professional / Doctor',
    city: 'Hyderabad',
    specialization: 'General Medicine / Surgery',
  })
  const [saveMsg, setSaveMsg] = useState('')

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

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setSaveMsg('Profile details updated successfully!')
    setTimeout(() => setSaveMsg(''), 4000)
  }

  // --- AUTHENTICATED EXECUTIVE CLIENT DASHBOARD ---
  if (user) {
    return (
      <div className="min-h-screen bg-slate-50/60 pb-20 pt-6">
        <div className="container-custom">
          {/* Header Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-hero-gradient p-6 text-white shadow-xl sm:p-10"
          >
            {/* Background elements */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-medical-500/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* User Avatar & Info */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-lg sm:h-24 sm:w-24"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-3xl font-extrabold text-white ring-4 ring-white/30 shadow-lg backdrop-blur-md sm:h-24 sm:w-24">
                      {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white text-white shadow">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                      {user.displayName || 'VPACS Client'}
                    </h1>
                    <span className="rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-300 border border-white/20 backdrop-blur-sm">
                      Verified Client
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-blue-100/90">{user.email}</p>
                  <div className="mt-2.5 flex items-center gap-4 text-xs text-blue-200/80 flex-wrap">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Account ID: VPACS-9842
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> Supabase Session Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Header Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all py-2.5 px-5 text-sm"
                >
                  <Plus className="h-4 w-4" /> New Enquiry
                </Link>
                <button
                  onClick={signOut}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20 backdrop-blur-sm border border-white/15"
                >
                  <LogOut className="h-4 w-4 text-red-300" /> Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pre-Approved Limit</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <CreditCard className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-navy-900">₹ 2.50 Cr</p>
              <p className="mt-1 text-xs font-medium text-emerald-600 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> 100% Medical & Education Funding
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Applications</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-medical-50 text-medical-600">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-navy-900">2 Enquiries</p>
              <p className="mt-1 text-xs font-medium text-blue-600">In Review by Banking Team</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Banking Partners</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Building2 className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-navy-900">40+ Banks</p>
              <p className="mt-1 text-xs font-medium text-slate-500">National & International</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Dedicated Advisor</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Stethoscope className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-lg font-bold text-navy-900">VPACS Relationship Mgr</p>
              <div className="mt-1.5 flex items-center gap-2">
                <a
                  href={`tel:${site.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                >
                  <Phone className="h-3 w-3" /> Call
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline"
                >
                  <MessageCircle className="h-3 w-3" /> WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

          {/* Main Dashboard Navigation & Tabs */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Section (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tab Navigation Controls */}
              <div className="flex rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200/80 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'enquiries'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                  }`}
                >
                  <FileText className="h-4 w-4" /> Active Loan Enquiries
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                  }`}
                >
                  <User className="h-4 w-4" /> Profile Information
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'services'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                  }`}
                >
                  <CreditCard className="h-4 w-4" /> Financial Portfolio
                </button>
              </div>

              {/* Tab 1: Active Loan Enquiries */}
              {activeTab === 'enquiries' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/80">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="rounded-full bg-medical-50 px-2.5 py-1 text-xs font-bold text-medical-700 uppercase tracking-wider">
                          Medical Education Loan
                        </span>
                        <h2 className="mt-2 text-lg font-bold text-navy-900">
                          Abroad PG / Specialty Fellowship Finance
                        </h2>
                        <p className="text-xs text-slate-500">Ref ID: VPACS-MED-2026-0814</p>
                      </div>
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                        Under Verification
                      </span>
                    </div>

                    {/* Progress Bar Steps */}
                    <div className="mt-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Application Workflow</p>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="space-y-1.5">
                          <div className="h-2 rounded-full bg-emerald-500" />
                          <p className="text-[11px] font-semibold text-emerald-700">Submitted</p>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 rounded-full bg-brand-600 animate-pulse" />
                          <p className="text-[11px] font-bold text-brand-600">Doc Verification</p>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 rounded-full bg-slate-200" />
                          <p className="text-[11px] font-semibold text-slate-400">Sanction Letter</p>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 rounded-full bg-slate-200" />
                          <p className="text-[11px] font-semibold text-slate-400">Disbursal</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between bg-slate-50 rounded-2xl p-4 text-xs text-slate-600">
                      <div>
                        <span className="font-semibold text-navy-900">Next Action:</span> Upload MBBS Degree & Admission Letter.
                      </div>
                      <Link to="/contact" className="font-bold text-brand-600 hover:underline flex items-center gap-1">
                        Submit Docs <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Second Active Loan Card */}
                  <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/80">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700 uppercase tracking-wider">
                          General Business Finance
                        </span>
                        <h2 className="mt-2 text-lg font-bold text-navy-900">
                          Commercial Equipment & Practice Expansion Loan
                        </h2>
                        <p className="text-xs text-slate-500">Ref ID: VPACS-GEN-2026-0792</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                        Pre-Approved
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
                      <span>Requested Amount: <strong>₹ 50,00,000</strong></span>
                      <Link to="/contact" className="btn-primary py-1.5 px-3 text-xs">
                        Talk to Relationship Mgr
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Profile Details Form */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/80 sm:p-8"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-navy-900">Personal & Professional Profile</h2>
                      <p className="text-xs text-slate-500">Manage your profile details used for loan processing.</p>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-navy-800 hover:bg-slate-200"
                      >
                        <Edit3 className="h-3.5 w-3.5" /> Edit Profile
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveProfile}
                        className="btn-primary inline-flex items-center gap-1.5 py-2 px-3.5 text-xs"
                      >
                        <Save className="h-3.5 w-3.5" /> Save Changes
                      </button>
                    )}
                  </div>

                  {saveMsg && (
                    <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 ring-1 ring-emerald-200 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {saveMsg}
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        defaultValue={user.displayName || 'Varshith Reddy'}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-sm font-medium text-navy-900 disabled:opacity-75 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-sm font-medium text-slate-500 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-sm font-medium text-navy-900 disabled:opacity-75 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Profession / Designation
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={profileData.profession}
                        onChange={(e) => setProfileData({ ...profileData, profession: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-sm font-medium text-navy-900 disabled:opacity-75 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Specialization (if Medical)
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={profileData.specialization}
                        onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-sm font-medium text-navy-900 disabled:opacity-75 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={profileData.city}
                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-sm font-medium text-navy-900 disabled:opacity-75 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Tab 3: Financial Services Portfolio */}
              {activeTab === 'services' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/80">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-medical-50 text-medical-600 mb-4">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-navy-900">Medical Education Finance</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Covers tuition, living expenses, exam fees, and airfare for MBBS/MD/MS degrees worldwide.
                    </p>
                    <Link to="/healthcare-finance" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-medical-600 hover:underline">
                      Explore Options <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/80">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mb-4">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-navy-900">General & Business Loans</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Unsecured business loans, LAP, working capital, and home loans tailored to your income profile.
                    </p>
                    <Link to="/general-finance" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline">
                      Explore Options <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar (1 col) */}
            <div className="space-y-6">
              {/* Supabase Security Card */}
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/80">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-navy-900">Supabase Auth Connected</h3>
                    <p className="text-[11px] text-slate-500">Enterprise Encryption Active</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Provider</span>
                    <span className="font-semibold text-navy-900">Supabase OAuth / Password</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Session Status</span>
                    <span className="font-semibold text-emerald-600">Authenticated</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setResetEmail(user.email)
                    setResetOpen(true)
                    setResetMsg('')
                  }}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-navy-800 transition-colors hover:bg-slate-100"
                >
                  <KeyRound className="h-3.5 w-3.5" /> Request Password Change
                </button>
              </div>

              {/* Need Help / Support Banner */}
              <div className="rounded-3xl bg-hero-gradient p-6 text-white shadow-md">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Fast Advisory</p>
                <h3 className="mt-2 text-lg font-bold">Have Questions About Your Application?</h3>
                <p className="mt-1 text-xs text-blue-100/80">
                  Our dedicated financial consultants are available 6 days a week to guide your application.
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-xs font-bold text-navy-900 transition-transform hover:scale-[1.02]"
                >
                  Contact Advisory Team <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Password Modal */}
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
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl relative border border-slate-100"
              >
                <button
                  type="button"
                  onClick={() => setResetOpen(false)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 mb-3">
                  <KeyRound className="h-5 w-5" />
                </div>

                <h2 className="text-lg font-bold text-navy-900">Reset your password</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>

                {resetMsg && (
                  <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
                    {resetMsg}
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy-900 focus:border-brand-500 focus:outline-none"
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
      </div>
    )
  }

  // --- UNAUTHENTICATED SIGN IN / SIGN UP PAGE ---
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
