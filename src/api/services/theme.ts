import apiClient from '@/api'
import { API_ENDPOINTS } from '@/api/constants/endpoints'
import type { Theme } from '@/api/types/theme'

// * 선물 테마 목록 불러오기
export const fetchThemes = async (): Promise<Theme[]> => {
  const res = await apiClient.get<{ data: Theme[] }>(API_ENDPOINTS.THEMES.LIST)
  return res.data.data
}
