import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductSummary } from '@/api/product';
import type { ProductSummary } from '@/api/product';
import toast from 'react-hot-toast';

export const useProductSummary = (productId?: number) => {
  const [product, setProduct] = useState<ProductSummary | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) return;

    getProductSummary(productId)
      .then((data) => setProduct(data))
      .catch(() => {
        toast.error('상품 정보를 불러올 수 없습니다.');
        navigate('/');
      });
  }, [productId, navigate]);

  return product;
};
