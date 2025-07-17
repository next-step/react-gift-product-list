import { createContext, useContext } from 'react'
import { useStorageState } from '@/hooks/useStorageState'

interface UserInfo {
  email: string
  name: string
  authToken: string
}

interface AuthContextType {
  user: UserInfo | null
  login: (userInfo: UserInfo) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useStorageState<UserInfo>('userInfo')
  const login = (userInfo: UserInfo) => setUser(userInfo)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용되어야 합니다')
  }
  return context
}
