import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Product } from '@/types/product';

interface UseProductRankingResult {
  products: Product[] | null;
  isLoading: boolean;
  isError: boolean;
}

const fetchProductRankings = async (
  targetType: string,
  rankType: string
): Promise<Product[]> => {
  const res = await axios.get<{ data: Product[] }>(
    `${import.meta.env.VITE_API_BASE_URL}/api/products/ranking`,
    { params: { targetType, rankType } }
  );
  return res.data.data;
};

export const useProductRanking = (
  targetType: string,
  rankType: string
): UseProductRankingResult => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await fetchProductRankings(targetType, rankType);
        setProducts(data);
      } catch {
        setIsError(true);
        setProducts(null);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [targetType, rankType]);

  return { products, isLoading, isError };
};
