import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchProduct } from '@/api/ProductApi';
import type { ProductSummary } from '@/types/Product';

export function useProductSummary(productId: string | undefined) {
  const [product, setProduct] = useState<ProductSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) return;

    fetchProduct(productId)
      .then(setProduct)
      .catch((err) => {
        const toastId = 'fetch-product-error';
        if (!toast.isActive(toastId)) {
          toast.error(err.message || '상품 정보를 불러올 수 없습니다.', {
            toastId,
          });
        }
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [productId, navigate]);

  return { product, loading };
}
