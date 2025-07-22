import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductSummary } from '@/api/product';
import type { ProductSummary } from '@/api/product';
import toast from 'react-hot-toast';
import { useFetch } from '@/hooks/useFetch';

export const useProductSummary = (productId?: number) => {
  const navigate = useNavigate();
  const { data: product, error } = useFetch<ProductSummary>(
    getProductSummary,
    [productId!],
    {
      immediate: !!productId,
      errorMessage: '상품 정보를 불러올 수 없습니다.',
    }
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      navigate('/');
    }
  }, [error, navigate]);

  return product;
};
