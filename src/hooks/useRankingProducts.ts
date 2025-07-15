import { useState, useEffect } from 'react';
import axios from 'axios';
import type { RankingResponse, FilterOption } from '../api/types';

/**
 * 실시간 급상승 선물 랭킹을 조회하는 커스텀 훅
 * @param initialFilter - 초기 필터 옵션
 */
function useRankingProducts(initialFilter: FilterOption = 'all') {
  const [filter, setFilter] = useState<FilterOption>(initialFilter);
  const [data, setData] = useState<RankingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRankingProducts = async (currentFilter: FilterOption) => {
    try {
      setIsLoading(true);
      const response = await axios.get<RankingResponse>(
        'http://localhost:3000/api/products/ranking',
        {
          params: { filter: currentFilter },
        }
      );
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setData(null);
      console.error('Error fetching ranking products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingProducts(filter);
  }, [filter]);

  const changeFilter = (newFilter: FilterOption) => {
    setFilter(newFilter);
  };

  return {
    data,
    isLoading,
    error,
    filter,
    changeFilter,
    refetch: () => fetchRankingProducts(filter),
  };
}

export default useRankingProducts;
