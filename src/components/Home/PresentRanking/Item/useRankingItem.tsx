import { ApiClient } from '@src/api/FetchData';
import type { Goods } from '@src/types/Goods';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useRankingItem = () => {
  const { search } = useLocation();
  const [goods, setGoods] = useState<Goods | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);

  const params = new URLSearchParams(search);
  const rankType = params.get('rankType');
  const targetType = params.get('targetType');
  const typeUrls = `?targetType=${targetType}&rankType=${rankType}`;

  const fetchProductRanking = async () => {
    try {
      const data = await ApiClient('GET', 'products/ranking', null, typeUrls);
      setGoods(data);
      setError(false);
    } catch (error) {
      console.error('Error fetching Product Ranking data:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  fetchProductRanking();
  return {
    goods,
    isLoading,
    isError,
  };
};
