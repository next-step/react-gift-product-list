import { useEffect, useState } from 'react';
import axios from 'axios';
import { getProductSummaryUrl } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/validation';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { toast } from 'react-toastify';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export const useProductSummary = (id: string | undefined) => {
  const [product, setProduct] = useState<ProductSummary | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get<{ data: ProductSummary }>(
          getProductSummaryUrl(id)
        );
        setProduct(res.data.data);
      } catch {
        toast.error(ERROR_MESSAGES.LOAD_PRODUCT_FAIL, {
          toastId: 'product-load-fail',
        });
        navigate(ROUTES.HOME);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  return { product, isLoading };
};
