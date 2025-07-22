import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductSummaryUrl } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/validation';
import { ROUTES } from '@/constants/routes';
import { useFetch } from '@/hooks/useFetch';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export const useProductSummary = (id: string | undefined) => {
  const navigate = useNavigate();

  const fetchProduct = useCallback(async () => {
    if (!id) {
      navigate(ROUTES.NOT_FOUND);
      return null;
    }

    const res = await fetch(getProductSummaryUrl(id));

    if (res.status === 404) {
      navigate(ROUTES.NOT_FOUND);
      return null;
    }

    if (!res.ok) {
      toast.error(ERROR_MESSAGES.LOAD_PRODUCT_FAIL, {
        toastId: 'product-load-fail',
      });
      navigate(ROUTES.HOME);
      return null;
    }

    const json = await res.json();
    return json.data as ProductSummary;
  }, [id, navigate]);

  const { data: product, pending: isLoading } = useFetch<ProductSummary | null>(
    fetchProduct
  );

  return { product, isLoading };
};
