import axios from 'axios';
import { API_BASE_URL } from '../apiBaseUrl';
import type { RankingApiProps } from '@/page/Home/hooks/useRanking';

const fetchRanking = async ({ activeGenerationButton, activeFilterButton }: RankingApiProps) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/products/ranking?targetType=${activeGenerationButton}&rankType=${activeFilterButton}`
  );
  return response.data.data;
};
export default fetchRanking;
