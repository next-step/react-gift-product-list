const baseURL = import.meta.env.VITE_API_BASE_URL;
import { useFetch } from './useFetch';
import type { RankingResponse, TargetType, RankType } from '../api/types';

/**
 * 실시간 급상승 선물 랭킹을 조회하는 커스텀 훅
 * @param targetType - 대상 타입
 * @param rankType - 랭킹 타입
 */
export const useRankingProducts = (
  targetType: TargetType = 'ALL',
  rankType: RankType = 'MANY_WISH'
) => {
  const url = `${baseURL}/api/products/ranking?targetType=${targetType}&rankType=${rankType}`;
  const { data, isLoading, error, refetch } = useFetch<RankingResponse>(url);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
