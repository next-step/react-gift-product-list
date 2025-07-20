import { useState } from "react"
import { AuthContext, type AuthContextType } from "@/context/AuthContext"
import axios from "axios"

type AuthContextProviderProps = {
  children: React.ReactNode
}

const STORAGE_KEYS = {
  token: "authToken",
  email: "email",
  name: "name",
} as const
interface LoginResponse {
  code: number
  data: {
    authToken: string
    email: string
    name: string
  }
  error?: string
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem(STORAGE_KEYS.token)
  )
  const [email, setEmail] = useState<string>(
    localStorage.getItem(STORAGE_KEYS.email) ?? ""
  )
  const [name, setName] = useState<string>(
    localStorage.getItem(STORAGE_KEYS.name) ?? ""
  )
  const isLoggedIn = !!authToken

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!email || !password) return false

      const baseUrl = import.meta.env.VITE_BASE_URL
      const loginUrl = new URL("/api/login", baseUrl).toString()

      const response = await axios.post<LoginResponse>(loginUrl, {
        email,
        password,
      })

      console.log("response", response)
      if (response.status === 200 || response.status === 201) {
        const { authToken, email, name } = response.data.data

        setAuthToken(authToken)
        setEmail(email)
        setName(name)

        localStorage.setItem(STORAGE_KEYS.token, authToken)
        localStorage.setItem(STORAGE_KEYS.email, email)
        localStorage.setItem(STORAGE_KEYS.name, name)

        console.log("로그인 성공")
        return true
      } else {
        console.log("다른 응답입니다.")
        return false
      }
    } catch (error) {
      console.log("@kakao.com 이메일 주소만 가능합니다.")
      return false
    }
  }

  const logout = () => {
    setAuthToken(null)
    setEmail("")
    setName("")

    localStorage.removeItem(STORAGE_KEYS.token)
    localStorage.removeItem(STORAGE_KEYS.email)
    localStorage.removeItem(STORAGE_KEYS.name)

    console.log("logout 완료")
  }

  const value: AuthContextType = {
    isLoggedIn,
    email,
    authToken,
    name,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
