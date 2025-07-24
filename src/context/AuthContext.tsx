import { createContext, useContext } from "react"

export interface AuthContextType {
  isLoggedIn: boolean
  email: string
  name: string
  authToken: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth는 반드시 provider안에 있어야 함")
  }
  return context
}
