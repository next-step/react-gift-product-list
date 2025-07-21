import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import type { Product } from '@/types/product'
import { Layout } from '@/components/Layout/Layout'
import { Navbar } from '@/components/Navbar/Navbar'
import styled from '@emotion/styled'
import { ProductItem } from '@/components/Product/ProductItem'

interface ThemeInfo {
  themeId: number
  name: string
  title: string
  description: string
  backgroundColor: string
}

export function ThemePage() {
  const { themeId } = useParams()
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

  useEffect(() => {
    fetchThemeInfo()
  }, [themeId])

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchProducts()
      }
    },
    [fetchProducts, hasMore, loading]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    })
    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [handleObserver])

  if (!themeInfo) return <div>로딩 중...</div>

  return (
    <Layout>
      <Navbar />
      <Wrapper>
        <Header style={{ backgroundColor: themeInfo.backgroundColor }}>
          <p className="name">{themeInfo.name}</p>
          <p className="title">{themeInfo.title}</p>
          <p className="desc">{themeInfo.description}</p>
        </Header>

        <ProductSection>
          {products.length === 0 ? (
            <p>상품이 없습니다.</p>
          ) : (
            <ProductList>
              {products.map((product) => (
                <li key={product.id}>
                  <ProductItem {...product} />
                </li>
              ))}
            </ProductList>
          )}
          <div ref={observerRef} style={{ height: 1 }} />
        </ProductSection>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const Header = styled.header`
  color: white;
  padding: 1.9rem 1rem;

  .name {
    font-size: 0.9rem;
    font-weight: bold;
  }

  .title {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .desc {
    font-size: 1rem;
  }
`

const ProductSection = styled.section`
  padding: 1rem;
`

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`
