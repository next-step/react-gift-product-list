import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
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
  const [product, setProduct] = useState<ProductSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchProductSummary = async () => {
      if (!productId) {
        setError(new Error(PRODUCT_ID_MISSING_MESSAGE));
        toast.error(PRODUCT_ID_MISSING_MESSAGE);
        setLoading(false);
        navigate('/');
        return;
      }
      try {
        const response = await axios.get(`/api/products/${productId}/summary`, {
          signal,
        });
        setProduct(response.data.data);
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('Request cancelled', e.message);
          return;
        }
        setError(e as Error);
        toast.error(FAILED_TO_LOAD_PRODUCT_INFO_MESSAGE);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProductSummary();

    return () => {
      abortController.abort();
    };
  }, [productId, navigate]);

  return { product, loading, error };
};

export default useGetProductSummary;
