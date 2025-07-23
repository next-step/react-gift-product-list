import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const themeId = Number(id)

    if (!id || Number.isNaN(themeId)) {
      navigate('/', { replace: true })
      return
    }

    async function load() {
      setLoading(true)
      setError(false)
      try {
        const [infoData, productsData] = await Promise.all([
          fetchThemeInfo(themeId),
          fetchThemeProducts(themeId),
        ])
        setInfo(infoData)
        setProducts(productsData.list)
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
    load()
  }, [id, navigate])


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
      <Grid>
        {products.map((prod) => (
          <ProductItem key={prod.id} product={prod} />
        ))}
      </Grid>
    </Layout>
  )
}