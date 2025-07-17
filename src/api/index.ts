import { STORAGES } from '@/api/constants/storages'
import axios from 'axios'
import { toast } from 'react-toastify'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// * axios 인스턴스
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
})

// * 토큰 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem(STORAGES.AUTH)
    if (storedUser) {
      const { authToken } = JSON.parse(storedUser)

      // ? 다른 API 요청 시 Authorization헤더에 로그인 응답에서 전달 받은 authToken이 필요
      if (authToken) {
        config.headers.Authorization = `${authToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// * 4XX 에러 발생 시 Toast를 통한 에러메시지 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const message = error.response?.data?.data?.message || '요청 처리 중 오류가 발생했습니다.'

    if (status === 401) {
      toast.warning('세션이 만료되었습니다. 다시 로그인해주세요.')
    } else if (status && status >= 400 && status < 500) {
      toast.error(message)
    }

    return Promise.reject(error)
  },
)

export default apiClient
