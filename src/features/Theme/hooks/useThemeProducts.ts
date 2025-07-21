import { useState, useEffect, useCallback } from 'react'
import { useApi } from '@/hooks/useApi'
import { api } from '@/lib/axios'
import type { Product } from '../types/ThemeTypes'

interface ThemeProductResponse {
  list: Product[]
  cursor: number
  hasMoreList: boolean
}

export const useThemeProducts = (themeId: number | null, limit = 10) => {
  const [products, setProducts] = useState<Product[]>([])
  const [cursor, setCursor] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const fetcher = useCallback(async () => {
    if (!themeId) return { list: [], cursor: 0, hasMoreList: false }

    const res = await api.get(`/themes/${themeId}/products`, {
      params: { cursor, limit },
    })
    return res.data.data as ThemeProductResponse
  }, [themeId, cursor, limit])

  const { data, loading, error } = useApi<ThemeProductResponse>(fetcher, [
    fetcher,
  ])

  useEffect(() => {
    if (data) {
      setProducts((prev) => [...prev, ...data.list])
      setCursor(data.cursor)
      setHasMore(data.hasMoreList)
    }
  }, [data])

  const fetchNextPage = useCallback(() => {
    if (loading || !hasMore) return
    setCursor((prev) => prev)
  }, [loading, hasMore])

  useEffect(() => {
    setProducts([])
    setCursor(0)
    setHasMore(true)
  }, [themeId])

  return { products, loading, error, fetchNextPage, hasMore }
}
