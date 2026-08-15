// Supabase client initialization for Authentication & Data Services.
// Config values are read from environment variables (see .env.example).
// Automatically handles raw project references and invalid URLs safely.

import { createClient } from '@supabase/supabase-js'

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

// Helper to format raw project reference or missing protocol cleanly
function formatSupabaseUrl(url) {
  if (!url || url === 'your_supabase_url_here') return ''
  if (/^https?:\/\//i.test(url)) return url
  // If user pasted only the project ref (e.g. cebdnxpjtwkgynlymssn)
  if (/^[a-z0-9]+$/i.test(url)) return `https://${url}.supabase.co`
  return `https://${url}`
}

const formattedUrl = formatSupabaseUrl(rawUrl)

function isValidUrl(urlStr) {
  if (!urlStr) return false
  try {
    new URL(urlStr)
    return true
  } catch {
    return false
  }
}

export const isSupabaseConfigured = Boolean(
  isValidUrl(formattedUrl) &&
    rawKey &&
    rawKey !== 'your_supabase_anon_key_here'
)

const targetUrl = isSupabaseConfigured ? formattedUrl : 'https://placeholder.supabase.co'
const targetKey = isSupabaseConfigured ? rawKey : 'placeholder-key'

let clientInstance
try {
  clientInstance = createClient(targetUrl, targetKey)
} catch (err) {
  console.warn('Supabase initialization warning:', err)
  clientInstance = createClient('https://placeholder.supabase.co', 'placeholder-key')
}

export const supabase = clientInstance
