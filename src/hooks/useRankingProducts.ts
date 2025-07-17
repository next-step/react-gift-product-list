import { useState, useEffect } from 'react';
import axios from 'axios';
import type { RankingResponse, TargetType, RankType } from '../api/types';

/**
 * 실시간 급상승 선물 랭킹을 조회하는 커스텀 훅
 * @param initialTargetType - 초기 대상 타입
 * @param initialRankType - 초기 랭킹 타입
 */
function useRankingProducts(
  initialTargetType: TargetType = 'ALL',
  initialRankType: RankType = 'MANY_WISH'
) {
  const [targetType, setTargetType] = useState<TargetType>(initialTargetType);
  const [rankType, setRankType] = useState<RankType>(initialRankType);
  const [data, setData] = useState<RankingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRankingProducts = async (
    currentTargetType: TargetType,
    currentRankType: RankType
  ) => {
    try {
      setIsLoading(true);
      const response = await axios.get<RankingResponse>(
        'http://localhost:3000/api/products/ranking',
        {
          params: { targetType: currentTargetType, rankType: currentRankType },
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
    fetchRankingProducts(targetType, rankType);
  }, [targetType, rankType]);

  const changeTargetType = (newTargetType: TargetType) => {
    setTargetType(newTargetType);
  };

  const changeRankType = (newRankType: RankType) => {
    setRankType(newRankType);
  };

  return {
    data,
    isLoading,
    error,
    targetType,
    rankType,
    changeTargetType,
    changeRankType,
    refetch: () => fetchRankingProducts(targetType, rankType),
  };
}

export default useRankingProducts;
