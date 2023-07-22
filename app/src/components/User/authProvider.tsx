import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './auth'

import type { User } from 'firebase/auth'

export type UserType = User | null
export type AuthContextProps = {
  user: UserType
}
export type AuthProps = {
  children: ReactNode
}
const AuthContext = createContext<Partial<AuthContextProps>>({})
export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<UserType>(null)
  const value = { user }

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      console.log('login user', user)
    })
    return () => {
      authStateChanged()
    }
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
