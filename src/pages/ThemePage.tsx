import { useParams } from 'react-router-dom'
import { Layout } from '@/components/Layout/Layout'
import { Navbar } from '@/components/Navbar/Navbar'
import styled from '@emotion/styled'
import { ProductItem } from '@/components/Product/ProductItem'
import { useTheme } from '@/hooks/useTheme'

export function ThemePage() {
  const { themeId } = useParams()
  const { themeInfo, products, observerRef } = useTheme(themeId)

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
