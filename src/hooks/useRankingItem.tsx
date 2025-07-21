import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import { PARAMS } from '@src/assets/params';
import type { Goods } from '@src/types/Goods';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useRankingItem = () => {
  const { search } = useLocation();
  const [goods, setGoods] = useState<Goods | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const rankType = params.get(PARAMS.rankType);
    const targetType = params.get(PARAMS.targetType);
    const typeUrls = `?targetType=${targetType}&rankType=${rankType}`;

    const fetchProductRanking = async () => {
      try {
        const apiRequestData = {
          methods: 'GET' as HttpTypes,
          requestName: BASIC_ENDPOINT.ranking,
          body: {},
          params: typeUrls,
          headers: null,
        };
        const data = await apiClient(apiRequestData);
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
  }, [search]);

  return {
    goods,
    isLoading,
    isError,
  };
};
