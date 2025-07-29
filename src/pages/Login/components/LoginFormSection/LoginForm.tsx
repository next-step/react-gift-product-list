import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
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
  const [loginError, setLoginError] = useState<string | null>(null)

  // 이메일 유효성 검사
  useEffect(() => {
    if (!email) {
      setEmailError('이메일을 입력해주세요.')
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError('유효한 이메일 형식이 아닙니다.')
    } else {
      setEmailError(null)
    }
  }, [email])

  // 비밀번호 유효성 검사
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
    setLoginError(null)

    try {
      const res = await axios.post('/api/login', { email, password })
      const payload = res.data.data as {
        authToken: string
        email: string
        name: string
      }
      const { authToken, email: userEmail, name } = payload

      login({ user: { email: userEmail, name }, token: authToken })
     sessionStorage.setItem('authToken', authToken)
     sessionStorage.setItem('userEmail', userEmail)
     sessionStorage.setItem('userName', name)
      const target = redirect ? decodeURIComponent(redirect) : ROUTE_PATH.HOME
      navigate(target, { replace: true })
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status
        const msg = err.response.data?.message || err.response.statusText
        // 4XX 에러면 toast로 보여주기
        if (status >= 400 && status < 500) {
          toast.error(msg)
        } else {
          toast.error('서버 오류가 발생했습니다.')
        }
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.')
      }
      console.error('[Login] 에러:', err)
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
      loginError={loginError}
      isFormValid={isFormValid}
    />
  )
}

export default LoginForm