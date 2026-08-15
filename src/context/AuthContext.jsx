import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Decorate user object with fallback properties for seamless UI compatibility
  const formatUser = (rawUser) => {
    if (!rawUser) return null
    return {
      ...rawUser,
      displayName:
        rawUser.user_metadata?.full_name ||
        rawUser.user_metadata?.name ||
        rawUser.email?.split('@')[0] ||
        'User',
      photoURL: rawUser.user_metadata?.avatar_url || rawUser.user_metadata?.picture || null,
    }
  }

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: initSession } }) => {
      setSession(initSession)
      setUser(formatUser(initSession?.user ?? null))
      setLoading(false)
    }).catch((err) => {
      console.warn('Error fetching initial Supabase session:', err)
      setLoading(false)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession)
      setUser(formatUser(currentSession?.user ?? null))
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Sign up with Email & Password
  const signUp = useCallback(async ({ email, password, fullName }) => {
    setError(null)
    if (!isSupabaseConfigured) {
      const msg = 'Supabase authentication is not configured yet. Add your credentials to the .env file.'
      setError(msg)
      return { ok: false, error: msg }
    }
    try {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      if (err) throw err
      return { ok: true, data }
    } catch (err) {
      const msg = err?.message || 'Failed to sign up. Please try again.'
      setError(msg)
      return { ok: false, error: msg }
    }
  }, [])

  // Sign in with Email & Password
  const signIn = useCallback(async ({ email, password }) => {
    setError(null)
    if (!isSupabaseConfigured) {
      const msg = 'Supabase authentication is not configured yet. Add your credentials to the .env file.'
      setError(msg)
      return { ok: false, error: msg }
    }
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      return { ok: true, data }
    } catch (err) {
      const msg = err?.message || 'Invalid login credentials.'
      setError(msg)
      return { ok: false, error: msg }
    }
  }, [])

  // Sign in with Google OAuth
  const signInWithGoogle = useCallback(async () => {
    setError(null)
    if (!isSupabaseConfigured) {
      const msg = 'Supabase authentication is not configured yet. Add your credentials to the .env file.'
      setError(msg)
      return { ok: false, error: msg }
    }
    try {
      const { data, error: err } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      })
      if (err) throw err
      return { ok: true, data }
    } catch (err) {
      const msg = err?.message || 'Google sign-in failed.'
      setError(msg)
      return { ok: false, error: msg }
    }
  }, [])

  // Reset password
  const resetPassword = useCallback(async (email) => {
    setError(null)
    if (!isSupabaseConfigured) {
      const msg = 'Supabase authentication is not configured yet.'
      setError(msg)
      return { ok: false, error: msg }
    }
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/signin`,
      })
      if (err) throw err
      return { ok: true }
    } catch (err) {
      const msg = err?.message || 'Failed to send reset password email.'
      setError(msg)
      return { ok: false, error: msg }
    }
  }, [])

  // Sign out
  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return
    try {
      await supabase.auth.signOut()
    } catch (err) {
      setError(err?.message || 'Sign-out failed.')
    }
  }, [])

  const value = {
    user,
    session,
    loading,
    error,
    isSupabaseConfigured,
    signUp,
    signIn,
    signInWithGoogle,
    resetPassword,
    signOut,
    setError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
