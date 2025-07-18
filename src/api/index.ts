import axios from 'axios'
import { toast } from 'react-toastify'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// * axios 인스턴스
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
})

// * 에러 처리 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const message = error.response?.data?.data?.message

    if (status === 401) {
      toast.error(message)
    } else if (status && status >= 400 && status < 500) {
      toast.error(message)
    }

    return Promise.reject(error)
  },
)

export default apiClient
