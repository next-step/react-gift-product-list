import styled from '@emotion/styled'
import { Navbar } from '@/components/Navbar/Navbar'
import { Layout } from '@/components/Layout/Layout'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { OrderForm } from '@/components/OrderPage/OrderForm'
import { toast } from 'react-toastify'
import type { Product } from '@/types/product'

export function OrderPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
        )
        setProduct(response.data.data)
      } catch (error: any) {
        const message = error.response?.data.data.message
        toast.error(
          typeof message === 'string' ? message : '잘못된 요청입니다.'
        )
        navigate('/', { replace: true })
      }
    }

    fetchProduct()
  }, [id, navigate])

  if (!product) return <div>상품을 찾을 수 없습니다.</div>

  return (
    <>
      <Layout>
        <Navbar />
        <Container>
          <OrderForm product={product} />
        </Container>
      </Layout>
    </>
  )
}

const Container = styled.div`
  width: 100%;
`
