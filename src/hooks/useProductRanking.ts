import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Product } from '@/types/product';

interface UseProductRankingResult {
  products: Product[] | null;
  isLoading: boolean;
  isError: boolean;
}

export const useProductRanking = (
  targetType: string,
  rankType: string
): UseProductRankingResult => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchRanking = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await axios.get<{ data: Product[] }>(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/ranking`,
          {
            params: { targetType, rankType },
          }
        );
        setProducts(res.data.data);
      } catch (e) {
        setIsError(true);
        setProducts(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, [targetType, rankType]);

  return { products, isLoading, isError };
};
