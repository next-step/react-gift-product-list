import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// * axios 인스턴스
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
})

export default apiClient
