import { API_BASE_URL, apiClient } from '@/api/apiClient';

const fetchSummary = async (id: string) => {
  const response = await apiClient(`${API_BASE_URL}/api/products/${id}/summary`);
  return response.data.data;
};
export default fetchSummary;
