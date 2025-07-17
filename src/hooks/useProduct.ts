import { useState, useEffect } from 'react';
import { getProductById } from '../api/products';
import type { Product } from '../api/types';

/**
 * 특정 상품의 상세 정보를 가져오는 커스텀 훅
 * @param productId - 상품 ID
 */
export const useProduct = (productId: string | number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productId) {
      setError(new Error('상품 ID가 필요합니다.'));
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const productResponse = await getProductById(productId);
        setProduct(productResponse.data); // API 응답에서 .data 필드 사용
        setError(null);
      } catch (err) {
        console.error('상품 정보 가져오기 실패:', err);
        setError(err as Error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, isLoading, error };
};
