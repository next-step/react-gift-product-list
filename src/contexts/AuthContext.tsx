import { createContext, useContext, useState, type ReactNode } from 'react'
import {
  loadUserInfo,
  saveUserInfo,
  clearUserInfo,
  type UserInfo,
} from '../utils/storage'
interface AuthContextValue {
  isLoggedIn: boolean
  userInfo: UserInfo | null
  login: (info: UserInfo) => void
  logout: () => void

}
const STORAGE_KEY = 'isLoggedIn'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => loadUserInfo())
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!loadUserInfo())

  const login = (info: UserInfo) => {
    setIsLoggedIn(true)
    setUserInfo(info)
    sessionStorage.setItem(STORAGE_KEY, 'true')
    saveUserInfo(info)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserInfo(null)
    sessionStorage.removeItem(STORAGE_KEY)
    clearUserInfo()
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}