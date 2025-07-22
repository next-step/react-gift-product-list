import apiClient from '@/api'
import { API_ENDPOINTS } from '@/api/constants/endpoints'
import type { Theme, ThemeInfo, ThemeProductListResponse } from '@/api/types/theme'

// * 선물 테마 목록 불러오기
export const fetchThemes = async (): Promise<Theme[]> => {
  const res = await apiClient.get<{ data: Theme[] }>(API_ENDPOINTS.THEMES.LIST)
  return res.data.data
}

// * 테마 상세 정보 불러오기
export const fetchThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
  const res = await apiClient.get<{ data: ThemeInfo }>(API_ENDPOINTS.THEMES.INFO(themeId))
  return res.data.data
}

// * 테마별 상품 목록 불러오기 (페이지네이션)
export const fetchThemeProducts = async (
  themeId: number,
  cursor = 0,
  limit = 10,
): Promise<ThemeProductListResponse> => {
  const res = await apiClient.get<{ data: ThemeProductListResponse }>(
    API_ENDPOINTS.THEMES.PRODUCTS(themeId),
    {
      params: {
        cursor,
        limit,
      },
    },
  )
  return res.data.data
}
