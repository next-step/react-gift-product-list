import { useApi } from '@/hooks/useApi'
import type { ThemeInfo } from '../types/ThemeTypes'
import { api } from '@/lib/axios'

export const useThemeInfo = (themeId: number | null) => {
  const { data, loading, error } = useApi<ThemeInfo | null>(async () => {
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
  }, [themeId])

  return {
    themeInfo: data,
    loading,
    error,
  }
}
