import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface User {
  userID: string
}

type UserContextType = {
  user: User | null
  login: (userID: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export type UserProps = {
  children: ReactNode
}

const UserProvider: React.FC<UserProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  // const [user, setUser] = usePersistentState('user', { userID: '' })

  useEffect(() => {
    const localUser = localStorage.getItem('user')
    if (localUser) {
      setUser(JSON.parse(localUser))
    }
  }, [])

  const login = (userID: string) => {
    localStorage.setItem('user', JSON.stringify({ userID: userID }))
    setUser({ userID: userID })
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserContext, UserProvider, useUser }
