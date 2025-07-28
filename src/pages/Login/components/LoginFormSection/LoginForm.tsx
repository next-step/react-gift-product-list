import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { ROUTE_PATH } from '@/pages/Routes'
import { LoginFormSection } from './index'
import { AuthContext, User } from '@/context/AuthContext'

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

  // ▶ 이메일 유효성 검사
  useEffect(() => {
    if (!email) {
      setEmailError('이메일을 입력해주세요.')
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError('유효한 이메일 형식이 아닙니다.')
    } else {
      setEmailError(null)
    }
  }, [email])

  // ▶ 비밀번호 유효성 검사
  useEffect(() => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.')
    } else if (password.length < PASSWORD_MIN_LENGTH) {
      setPasswordError(`비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`)
    } else {
      setPasswordError(null)
    }
  }, [password])

  const isFormValid = !emailError && !passwordError
  const { login } = useContext(AuthContext)

  const handleSubmit = async () => {
    if (!isFormValid) return

    try {
      // ▶ 실제 로그인 API 호출 (필요하다면 baseURL 설정 확인)
      console.log('[Login] 요청 payload:', { email, password })
      const res = await axios.post('/api/login', { email, password })
      console.log('[Login] 응답:', res)

      const { authToken, email: userEmail, name } = res.data as {
        authToken: string
        email: string
        name: string
      }

      // context + localStorage에 저장
      login({ user: { email: userEmail, name }, token: authToken })

      // 리다이렉트
      const target = redirect ? decodeURIComponent(redirect) : ROUTE_PATH.HOME
      navigate(target, { replace: true })
    } catch (err: any) {
      // ▶ 에러 디테일 로그
      if (axios.isAxiosError(err)) {
        console.error('[Login] AxiosError:', err.response ?? err)
        const msg =
          err.response?.data?.message ||
          err.response?.statusText ||
          '로그인에 실패했습니다.'
        alert(msg)
      } else {
        console.error('[Login] UnexpectedError:', err)
        alert('로그인 중 알 수 없는 오류가 발생했습니다.')
      }
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
