import useFetch from "@/hooks/useFetch"
import ThemeInfoResponse from "@/interfaces/ThemeInfoResponse"

export default function useThemeInfo(themeId?: string) {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const themeUrl = new URL(`/api/themes/${themeId}/info`, baseUrl).toString()
  
  const { data, loading, error } = useFetch<ThemeInfoResponse>(themeUrl, {
    dependencies: [themeId],
  })

  return {
    theme: data?.data,
    loading,
    error,
  }
}
