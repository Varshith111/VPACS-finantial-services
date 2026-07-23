// Firebase initialization for Google Authentication.
// Config values are read from environment variables (see .env.example).
// If the environment is not configured, the app still runs but Google
// sign-in is disabled gracefully (see AuthContext).

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// True only when the essential keys are present.
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId,
)

let auth = null
let googleProvider = null

if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({ prompt: 'select_account' })
}

export { auth, googleProvider }
