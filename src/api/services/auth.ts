import apiClient from '@/api'
import { API_ENDPOINTS } from '@/api/constants/endpoints'
import { STORAGES } from '@/api/constants/storages'
import { type LoginRequest, type LoginResponse } from '@/api/types/auth'

// * 로그인 요청하기
export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await apiClient.post<{ data: LoginResponse }>(API_ENDPOINTS.AUTH.LOGIN, data)

  const { email, name, authToken } = res.data.data
  localStorage.setItem(STORAGES.AUTH, JSON.stringify({ email, name, authToken }))

  return res.data.data
}
