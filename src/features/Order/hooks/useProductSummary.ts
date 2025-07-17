import { useApi } from '@/hooks/useApi'
import { api } from '@/lib/axios'

export interface ProductSummary {
  id: number
  name: string
  brandName: string
  price: number
  imageURL: string
}

export const useProductSummary = (productId: number | null) => {
  const { data, loading, error } = useApi<ProductSummary | null>(async () => {
    if (!productId) {
      return null
    }
    const res = await api.get(`/products/${productId}/summary`)
    return res.data.data
  }, [productId])

  return {
    product: data,
    loading,
    error,
  }
}
