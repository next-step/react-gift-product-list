import useFetch from "@/hooks/useFetch"
import { ThemeProductListResponse } from "@/interfaces/ThemeProductListResponse"

export default function useThemeInfo(themeId?: string) {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const themeProductUrl = new URL(`/api/themes/${themeId}/products`, baseUrl).toString()
  
  const { data, loading, error } = useFetch<ThemeProductListResponse>(themeProductUrl, {
    dependencies: [themeId],
  })

  return {
    themeProducts: data?.data,
    loading,
    error,
  }
}
