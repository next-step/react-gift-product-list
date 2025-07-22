import { useApi } from '@/hooks/useApi'
import type { ThemeInfo } from '../types/ThemeTypes'
import { api } from '@/lib/axios'

const fetchThemeInfo = async (themeId: number | null) => {
  if (!themeId) return null

  try {
    const res = await api.get(`/themes/${themeId}/info`)
    return res.data.data
  } catch (err: any) {
    if (err.response?.status === 404) {
      return null
    }
    throw err
  }
}

export const useThemeInfo = (themeId: number | null) => {
  const fetcher = () => fetchThemeInfo(themeId)
  const { data, loading, error } = useApi<ThemeInfo | null>(fetcher, [themeId])

  return {
    themeInfo: data,
    loading,
    error,
  }
}
