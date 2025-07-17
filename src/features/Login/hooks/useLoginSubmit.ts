import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserContext } from '@/contexts/UserContext'
import { api } from '@/lib/axios'
import type { LoginFormInputs } from '../schema/loginSchema'

export const useLoginSubmit = (redirectPath: string) => {
  const navigate = useNavigate()
  const { login } = useUserContext()

  const submitLogin = async (data: LoginFormInputs) => {
    try {
      const res = await api.post('/login', {
        email: data.email,
        password: data.password,
      })

      const { email, name, authToken } = res.data.data
      login({ email, nickname: name, authToken })
      navigate(redirectPath, { replace: true })
    } catch (err: any) {
      if (err.response?.status === 400) {
        toast.error(err.response.data.data.message)
      } else {
        toast.error('오류 발생')
      }
    }
  }

  return { submitLogin }
}
