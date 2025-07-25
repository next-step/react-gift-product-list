import useFetch from "@/hooks/useFetch"
import { ThemeProductListResponse } from "@/interfaces/ThemeProductListResponse"

export default function useThemeProduct(themeId: string, cursor = 0, limit = 12) {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const url = new URL(`/api/themes/${themeId}/products`, baseUrl)
  url.searchParams.append("cursor", String(cursor))
  url.searchParams.append("limit", String(limit))

  const { data, loading, error } =
    useFetch<ThemeProductListResponse>(url.toString(), {
      dependencies: [themeId, cursor],
    })

  return {
    list: data?.data.list ?? [],
    cursor: data?.data.cursor,         
    hasMore: data?.data.hasMoreList ?? false,
    loading,
    error,
  }
}

