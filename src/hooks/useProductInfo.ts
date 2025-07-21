import useFetch from "@/hooks/useFetch"

import ProductsResponseSingle from "@/interfaces/ProductResponseSingle"

export default function useProductInfo(productId?: string) {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const url = new URL(`/api/products/${productId}/summary`, baseUrl).toString()

  const { data, loading, error } = useFetch<ProductsResponseSingle>(url, {
    dependencies: [productId],
  })

  return {
    product: data?.data,
    loading,
    error,
  }
}
