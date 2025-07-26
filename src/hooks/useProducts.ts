import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import type { GetRankingProductsResponse, Product } from '@/types/product';

type TargetType = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
type RankType = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

export function useProducts(mainTab: TargetType, subTab: 'WANT' | 'GIVE' | 'WISH') {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const rankType: RankType = subTab === 'WANT' ? 'MANY_WISH' : subTab === 'GIVE' ? 'MANY_RECEIVE' : 'MANY_WISH_RECEIVE';
        const response = await api.get<GetRankingProductsResponse>('/products/ranking', {
          params: {
            targetType: mainTab,
            rankType,
          },
        });
        setProducts(response.data.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [mainTab, subTab]);

  return { products, isLoading, error };
}


