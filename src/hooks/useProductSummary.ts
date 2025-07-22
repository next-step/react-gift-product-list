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

  const fetchProduct = async () => {
    if (!id) throw new Error('Product ID is undefined');

    try {
      const res = await fetch(getProductSummaryUrl(id));
      const json = await res.json();
      return json.data as ProductSummary;
    } catch (err) {
      toast.error(ERROR_MESSAGES.LOAD_PRODUCT_FAIL, {
        toastId: 'product-load-fail',
      });
      navigate(ROUTES.HOME);
      throw err;
    }
  };

  const { data: product, pending: isLoading } =
    useFetch<ProductSummary>(fetchProduct);

  return { product, isLoading };
};
