import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import styled from '@emotion/styled'
import Layout from '@/Layout'
import {
  fetchThemeProducts,
  fetchThemeInfo,
  type ThemeInfo,
} from '@/api/themes'
import type { Product } from '@/type'
import ProductItem from '@/components/ProductItem'
import ThemeHero from '@/components/ThemeHero'
import { spacing } from '@/theme/spacing'
import useIntersection from '@/hooks/useIntersection'

const Grid = styled.div`
  padding: ${spacing.spacing4};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.spacing4};
`

export default function ThemeProductsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [info, setInfo] = useState<ThemeInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const themeId = Number(id)

  const load = useCallback(async () => {
    if (!id || Number.isNaN(themeId)) {
      navigate('/', { replace: true })
      return
    }
    try {
      const data = await fetchThemeProducts(themeId, { cursor })
      setProducts((prev) => [...prev, ...data.list])
      setCursor(data.cursor)
      setHasMore(data.hasMoreList)
    } catch (err: any) {
      const code = err?.statusCode ?? 0
      if (code === 404) {
        navigate('/', { replace: true })
      } else {
        setError(true)
      }
    }
  }, [id, themeId, cursor, navigate])

  useEffect(() => {
    if (!id || Number.isNaN(themeId)) {
      navigate('/', { replace: true })
      return
    }
    async function init() {
      setLoading(true)
      setError(false)
      try {
        const [infoData, productsData] = await Promise.all([
          fetchThemeInfo(themeId),
          fetchThemeProducts(themeId),
        ])
        setInfo(infoData)
        setProducts(productsData.list)
        setCursor(productsData.cursor)
        setHasMore(productsData.hasMoreList)
      } catch (err: any) {
        const code = err?.statusCode ?? 0
        if (code === 404) {
          navigate('/', { replace: true })
        } else {
          setError(true)
        }
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [id, themeId, navigate])

  const intersectionRef = useIntersection(() => {
    if (loading || loadingMore || !hasMore) return
    setLoadingMore(true)
    load().finally(() => setLoadingMore(false))
  })


  if (loading) {
    return (
      <Layout>
        <p>로딩 중...</p>
      </Layout>
    )
  }
  if (error) {
    return (
      <Layout>
        <p>상품을 불러오지 못했습니다.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      {info && <ThemeHero info={info} />}
            {products.length === 0 && <p>상품이 없습니다.</p>}
      <Grid>
        {products.map((prod) => (
          <ProductItem key={prod.id} product={prod} />
        ))}
      </Grid>
      {hasMore && <div ref={intersectionRef} />}
      {loadingMore && <p>추가 로딩 중...</p>}
    </Layout>
  )
}