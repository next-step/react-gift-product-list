import { API_BASE_URL } from '@/api/apiBaseUrl';
import axios from 'axios';

const fetchSummary = async (id: string) => {
  const response = await axios(`${API_BASE_URL}/api/products/${id}/summary`);
  return response.data.data;
};
export default fetchSummary;
