import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import type { Product } from '@/types/product'

export interface ThemeInfo {
  themeId: number
  name: string
  title: string
  description: string
  backgroundColor: string
}

export function useTheme(themeId?: string) {
  const navigate = useNavigate()

  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [cursor, setCursor] = useState<number>(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const observerRef = useRef<HTMLDivElement | null>(null)

  const fetchThemeInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/themes/${themeId}/info`
      )
      setThemeInfo(response.data.data)
    } catch (error) {
      if (
        error instanceof axios.AxiosError &&
        error.response?.status === axios.HttpStatusCode.NotFound
      ) {
        navigate('/')
      }
    }
  }

  const fetchProducts = useCallback(async () => {
    if (!hasMore || loading) return
    setLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/themes/${themeId}/products`,
        {
          params: { cursor, limit: 10 },
        }
      )

      const { list, cursor: nextCursor, hasMoreList } = response.data.data

      setProducts((prev) => [...prev, ...list])
      setCursor(nextCursor)
      setHasMore(hasMoreList)
    } catch (err) {
      console.error('상품 목록 조회 실패', err)
    } finally {
      setLoading(false)
    }
  }, [cursor, hasMore, loading, themeId])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchProducts()
      }
    },
    [fetchProducts, hasMore, loading]
  )

  useEffect(() => {
    fetchThemeInfo()
  }, [themeId])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    })
    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [handleObserver])

  return {
    themeInfo,
    products,
    observerRef,
  }
}
