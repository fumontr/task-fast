import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDKFVsyh9QQvO0Mt2QkNcKn1fOgZWpEgvY',
  authDomain: 'task-fast-0928.firebaseapp.com',
  projectId: 'task-fast-0928',
  storageBucket: 'task-fast-0928.appspot.com',
  messagingSenderId: '410354198723',
  appId: '1:410354198723:web:5406de2ac09815b5beda76',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const loginWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then((_) => {
      console.log('success')
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`error: [${errorCode}] ${errorMessage}`)
    })
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, (_) => {
    // if (process.env.NODE_ENV !== 'development') return
    // if (user) {
    //   console.log('login user: ', user)
    // } else {
    //   console.log('No one login now')
    // }
  })
}

monitorAuthState()

export const logout = async () => {
  await signOut(auth)
}
