// src/pages/Login/LoginForm.tsx
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { ROUTE_PATH } from '@/pages/Routes'
import { LoginFormSection } from './index'
import { AuthContext } from '@/context/AuthContext'

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN_LENGTH = 8

export const LoginForm: React.FC = () => {
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // ... (이메일/비번 유효성 검사 useEffect 생략) ...

  const isFormValid = !emailError && !passwordError
  const { login } = useContext(AuthContext)

  const handleSubmit = async () => {
    if (!isFormValid) return

    try {
      console.log('[Login] 요청 payload:', { email, password })
      const res = await axios.post('/api/login', { email, password })
      console.log('[Login] 원본 응답:', res)

      // ⚠️ 여기서 반드시 res.data.data 로 꺼내야 합니다
      const payload = res.data.data as {
        authToken: string
        email: string
        name: string
      }
      const { authToken, email: userEmail, name } = payload
      console.log('📦 파싱된 payload:', payload)

      // context + sessionStorage 저장
      login({ user: { email: userEmail, name }, token: authToken })

      // 리다이렉트
      const target = redirect ? decodeURIComponent(redirect) : ROUTE_PATH.HOME
      navigate(target, { replace: true })
    } catch (err: any) {
      console.error('[Login] 에러:', err.response ?? err)
      const msg = err.response?.data?.message || '로그인에 실패했습니다.'
      alert(msg)
    }
  }

  return (
    <LoginFormSection
      email={email}
      password={password}
      onChangeEmail={e => setEmail(e.target.value)}
      onChangePassword={e => setPassword(e.target.value)}
      onSubmit={handleSubmit}
      emailError={emailError}
      passwordError={passwordError}
      isFormValid={isFormValid}
    />
  )
}

export default LoginForm
