import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@/contexts/UserContext'
import { api } from '@/lib/axios'
import { toast } from 'react-toastify'
import { ROUTE_PATH } from '@/routes/Router'

export const useOrderSubmit = () => {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const authToken = user?.authToken

  const submitOrder = async (orderPayload: any) => {
    try {
      const res = await api.post('/order', orderPayload, {
        headers: { Authorization: authToken },
      })
      console.log(res.statusText)
      return res
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast('로그인이 필요합니다.')
        navigate(ROUTE_PATH.LOGIN)
      } else {
        toast('주문 중 오류가 발생했습니다.')
        console.error(error.response?.data)
      }
      throw error
    }
  }

  return { submitOrder }
}
