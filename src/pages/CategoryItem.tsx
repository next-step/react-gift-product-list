import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import RankingItem from '../components/RankingSection/RankingItem'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import axios from 'axios'
const Wrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing5};
`

const Title = styled.h2`
  ${({ theme }) => theme.typography.body1Regular};
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
`

const Description = styled.p`
  ${({ theme }) => theme.typography.title1Bold};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing4};
`

export const CategoryItem = () => {
  const { themeId } = useParams()
  const [themeInfo, setThemeInfo] = useState(null)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if (!themeId) return

    const fetchData = async () => {
      try {
        const infoRes = await axios.get(`/api/themes/${themeId}/info`)
        setThemeInfo(infoRes.data.data)

        const productsRes = await fetch(
          `/api/themes/${themeId}/products?cursor=0&limit=10`
        )
        const productsData = await productsRes.json()
        setProducts(productsData.data.list)
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate('/')
        } else {
          console.error(error)
        }
      }
    }

    fetchData()
  }, [themeId])

  if (!themeInfo) {
    return <Wrapper>로딩 중...</Wrapper>
  }

  return (
    <Layout>
      <Wrapper
        style={{ backgroundColor: themeInfo.backgroundColor || '#ffffff' }}
      >
        <Title>{themeInfo.name}</Title>
        <Description>{themeInfo.title}</Description>
      </Wrapper>
      <Grid>
        {products.map((product, index) => (
          <RankingItem
            key={product.id}
            rank={index + 1}
            image={product.imageURL}
            brand={product.brandInfo?.name || ''}
            name={product.name}
            price={product.price.sellingPrice}
            onClick={() => {
              navigate(`/order/${product.id}`)
            }}
          />
        ))}
      </Grid>
    </Layout>
  )
}
