import { useGoToHome } from './useGoTo';
import useApiRequest from './useApiRequest';
import { fetchProduct } from '@/api/ProductApi';
import type { ProductSummary } from '@/types/Product';
import useToastOnError from './useToastOnError';

export function useProductSummary(productId: string | undefined) {
  const goToHome = useGoToHome();

  const {
    data: product,
    isLoading,
    hasError,
  } = useApiRequest<ProductSummary, [string]>(fetchProduct, [productId!]);

  useToastOnError({
    error: hasError,
    id: 'fetch-product-error',
    message: '상품 정보를 불러올 수 없습니다.',
    onError: goToHome,
  });

  return { product, loading: isLoading };
}
