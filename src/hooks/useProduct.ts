const baseURL = import.meta.env.VITE_API_BASE_URL;
import { useFetch } from './useFetch';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

/**
 * 특정 상품의 요약 정보를 가져오는 커스텀 훅
 * @param productId - 상품 ID
 */
export const useProduct = (productId: string | number | undefined) => {
  // productId가 없으면 빈 문자열을 전달하여 404 에러 발생시킴
  const url = productId
    ? `${baseURL}/api/products/${productId}/summary`
    : `${baseURL}/api/products/`;
  const result = useFetch<{ data: ProductSummary }>(url);

  return {
    product: result.data?.data || null,
    isLoading: result.isLoading,
    error: result.error,
  };
};
