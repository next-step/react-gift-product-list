import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductSummaryUrl } from '@/hooks/constants/api';
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

  const fetchProduct = useCallback(async (): Promise<
    ProductSummary | undefined
  > => {
    if (!id) {
      navigate(ROUTES.NOT_FOUND);
      return undefined;
    }

    const res = await fetch(getProductSummaryUrl(id));

    if (res.status === 404) {
      navigate(ROUTES.NOT_FOUND);
      return undefined;
    }

    if (!res.ok) {
      toast.error(ERROR_MESSAGES.LOAD_PRODUCT_FAIL, {
        toastId: 'product-load-fail',
      });
      navigate(ROUTES.HOME);
      return undefined;
    }

    const json = await res.json();
    return json.data as ProductSummary;
  }, [id, navigate]);

  const { data: product, pending: isLoading } = useFetch<
    ProductSummary | undefined
  >(fetchProduct);

  return { product, isLoading };
};
