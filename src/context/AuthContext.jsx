import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signInWithGoogle = useCallback(async () => {
    setError(null)
    if (!isFirebaseConfigured || !auth) {
      setError(
        'Google sign-in is not configured yet. Add your Firebase credentials to the .env file.',
      )
      return { ok: false }
    }
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return { ok: true, user: result.user }
    } catch (err) {
      // Ignore user-initiated popup closes.
      if (err?.code !== 'auth/popup-closed-by-user') {
        setError(err?.message || 'Sign-in failed. Please try again.')
      }
      return { ok: false, error: err }
    }
  }, [])

  const signOut = useCallback(async () => {
    if (!isFirebaseConfigured || !auth) return
    try {
      await fbSignOut(auth)
    } catch (err) {
      setError(err?.message || 'Sign-out failed.')
    }
  }, [])

  const value = {
    user,
    loading,
    error,
    isFirebaseConfigured,
    signInWithGoogle,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
