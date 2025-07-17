import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  const [product, setProduct] = useState<ProductSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProductSummary = async () => {
      if (!productId) {
        setError(new Error('Product ID is missing.'));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/api/products/${productId}/summary`);
        setProduct(response.data.data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductSummary();
  }, [productId]);

  return { product, loading, error };
};

export default useGetProductSummary;
