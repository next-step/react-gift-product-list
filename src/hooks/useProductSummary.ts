import { useNavigate } from 'react-router-dom';
import useApiRequest from './useApiRequest';
import { fetchProduct } from '@/api/ProductApi';
import type { ProductSummary } from '@/types/Product';
import useToastOnError from './useToastOnError';

export function useProductSummary(productId: string | undefined) {
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    hasError,
  } = useApiRequest<ProductSummary>(() => fetchProduct(productId!), [productId]);

  useToastOnError({
    error: hasError,
    id: 'fetch-product-error',
    message: '상품 정보를 불러올 수 없습니다.',
    onError: () => navigate('/'),
  });

  return { product, loading: isLoading };
}
