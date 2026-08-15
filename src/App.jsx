import { Suspense, lazy, useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActions, { StickyHelp } from './components/FloatingActions'
import ScrollToTop from './components/ScrollToTop'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'

// Route-level code splitting keeps the initial bundle lean.
const GeneralFinance = lazy(() => import('./pages/GeneralFinance'))
const HealthcareFinance = lazy(() => import('./pages/HealthcareFinance'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const SignIn = lazy(() => import('./pages/SignIn'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy-200 border-t-brand-600" />
    </div>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const handleSplashFinish = useCallback(() => setSplashDone(true), [])

  return (
    <>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}
      <div
        className="flex min-h-screen flex-col"
        style={!splashDone ? { overflow: 'hidden', height: '100vh', opacity: 0 } : undefined}
      >
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/general-finance" element={<GeneralFinance />} />
              <Route path="/healthcare-finance" element={<HealthcareFinance />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/profile" element={<SignIn />} />
              <Route path="/privacy-policy" element={<Legal doc="privacy" />} />
              <Route path="/terms" element={<Legal doc="terms" />} />
              <Route path="/disclaimer" element={<Legal doc="disclaimer" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <FloatingActions />
        <StickyHelp />
      </div>
    </>
  )
}
