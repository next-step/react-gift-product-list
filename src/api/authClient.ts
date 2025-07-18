import apiClient from '@/api'
import { STORAGES } from '@/api/constants/storages'
import { ROUTE_PATH } from '@/Router'
import { toast } from 'react-toastify'

// * 인증이 필요한 요청용 클라이언트 생성
// ? apiClient 인스턴스 기본 설정 상속
const authClient = apiClient.create()

// * 토큰 인터셉터
authClient.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem(STORAGES.AUTH)
    if (storedUser) {
      const { authToken } = JSON.parse(storedUser)

      if (authToken) {
        config.headers.Authorization = `${authToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// * 에러 처리 인터셉터
authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const message = error.response?.data?.data?.message

    // ! 401 에러가 발생하면 로그인 페이지로 연결
    if (status === 401) {
      toast.error(message)
      // * 로그인 페이지로 리다이렉트
      window.location.href = ROUTE_PATH.LOGIN
    } else if (status && status >= 400 && status < 500) {
      toast.error(message)
    }

    return Promise.reject(error)
  },
)

export default authClient
