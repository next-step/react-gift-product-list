import axios from 'axios';
import { API_BASE_URL } from '../apiBaseUrl';

interface fetchDataProps {
  activeGenerationButton: string;
  activeFilterButton: string;
}

const fetchRanking = async ({ activeGenerationButton, activeFilterButton }: fetchDataProps) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/products/ranking?targetType=${activeGenerationButton}&rankType=${activeFilterButton}`
  );
  return response.data.data;
};
export default fetchRanking;
