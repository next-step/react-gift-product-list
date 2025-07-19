import { useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useApi from '../../apis/useApi';
import {
  FAILED_TO_LOAD_PRODUCT_INFO_MESSAGE,
  PRODUCT_ID_MISSING_MESSAGE,
} from './constants';

interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

interface UseProductSummaryResult {
  product: ProductSummary | null;
  loading: boolean;
  error: Error | null;
}

const useGetProductSummary = (): UseProductSummaryResult => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const {
    data: apiResponse,
    isLoading: loading,
    error,
  } = useApi<{
    data: ProductSummary;
  }>(
    'get',
    productId ? `/products/${productId}/summary` : '',
  );

  const product = apiResponse?.data || null;

  useEffect(() => {
    if (error) {
      toast.error(FAILED_TO_LOAD_PRODUCT_INFO_MESSAGE);
      navigate('/');
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!productId) {
      toast.error(PRODUCT_ID_MISSING_MESSAGE);
      navigate('/');
    }
  }, [productId, navigate]);

  return { product, loading, error };
};

export default useGetProductSummary;
