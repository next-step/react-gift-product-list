import apiClient from '@/api'
import type { Theme } from '@/api/types/theme'

// * 선물 테마 목록 불러오기
export const fetchThemes = async (): Promise<Theme[]> => {
  const res = await apiClient.get<{ data: Theme[] }>('/api/themes')
  return res.data.data
}
