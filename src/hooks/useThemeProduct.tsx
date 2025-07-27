import useFetch from "@/hooks/useFetch"
import { ThemeProductListResponse } from "@/interfaces/ThemeProductListResponse"
import { useEffect } from "react"
import { useState } from "react"
import { Product } from "@/interfaces/Product"
import { useCallback } from "react"
import { fetchThemeProducts } from "@/functions/fetchThemeProduct"

export default function useThemeProduct(themeId: string, limit = 12) {
  const [products, setProducts] = useState<Product[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  const baseUrl = import.meta.env.VITE_BASE_URL
  const url = new URL(`/api/themes/${themeId}/products`, baseUrl)
  url.searchParams.append("limit", String(limit))

  const { data, loading, error } = useFetch<ThemeProductListResponse>(
    url.toString(),
    {
      dependencies: [themeId],
    }
  )
  useEffect(() => {
    if (!loading && data?.data) {
      setProducts(data.data.list)
      setCursor(data.data.cursor ?? null)
      setHasMore(data.data.hasMoreList)
    }
  }, [loading, data])

  const fetchMore = useCallback(async () => {
    if (!hasMore || isFetching) return
    setIsFetching(true)
    try {
      const res = await fetchThemeProducts(themeId, cursor)
      setProducts((prev) => [...prev, ...res.list])
      setCursor(res.cursor)
      setHasMore(res.hasMoreList)
    } finally {
      setIsFetching(false)
    }
  }, [themeId, cursor, hasMore])
  return {
      products,
       hasMore,
       loadingInitial: loading,      
       error,
       isFetching,                      
       fetchMore,
     }
}
