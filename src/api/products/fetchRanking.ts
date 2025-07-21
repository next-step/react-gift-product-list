import { API_BASE_URL, apiClient } from '../apiClient';
import type { RankingApiProps } from '@/page/Home/hooks/useRanking';

const fetchRanking = async ({ activeGenerationButton, activeFilterButton }: RankingApiProps) => {
  const response = await apiClient.get(
    `${API_BASE_URL}/api/products/ranking?targetType=${activeGenerationButton}&rankType=${activeFilterButton}`
  );
  return response.data.data;
};
export default fetchRanking;
