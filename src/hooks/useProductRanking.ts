import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Product } from '@/types/product';
import { PRODUCT_RANKING_API_URL } from '@/hooks/constants/api';

interface UseProductRankingResult {
  data: Product[] | null;
  pending: boolean;
  error: boolean;
}

const fetchProductRankings = async (
  targetType: string,
  rankType: string
): Promise<Product[]> => {
  const res = await axios.get<{ data: Product[] }>(
    `${PRODUCT_RANKING_API_URL}`,
    { params: { targetType, rankType } }
  );
  return res.data.data;
};

export const useProductRanking = (
  targetType: string,
  rankType: string
): UseProductRankingResult => {
  const [data, setData] = useState<Product[] | null>(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setPending(true);
      setError(false);
      try {
        const result = await fetchProductRankings(targetType, rankType);
        setData(result);
      } catch {
        setError(true);
        setData(null);
      } finally {
        setPending(false);
      }
    };

    load();
  }, [targetType, rankType]);

  return { data, pending, error };
};
