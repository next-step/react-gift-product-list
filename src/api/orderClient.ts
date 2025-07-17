import apiClient from '@/api'
import { ROUTE_PATH } from '@/Router'
import { toast } from 'react-toastify'

// * 주문하기 전용 클라이언트 생성
// ? 주문하기 전용 인터셉터를 적용하기위해!
const orderClient = apiClient.create()

// * 주문 전용 인터셉터
orderClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const message = error.response?.data?.data?.message || '주문 처리 중 오류가 발생했습니다.'

    // ! 401 에러가 발생하면 로그인 페이지로 연결
    if (status === 401) {
      toast.warning('세션이 만료되었습니다. 다시 로그인해주세요.')
      // * 로그인 페이지로 연결
      window.location.href = ROUTE_PATH.LOGIN
    } else if (status && status >= 400 && status < 500) {
      toast.error(message)
    }

    return Promise.reject(error)
  },
)

export default orderClient
