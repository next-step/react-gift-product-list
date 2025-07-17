import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchProductRankings = (
  rankType: string = 'POPULAR',
  targetType?: string
) => {
  const params = new URLSearchParams();
  params.append('rankType', rankType);
  if (targetType && targetType !== 'ALL') {
    params.append('targetType', targetType);
  }

  return API.get(`/api/products/ranking?${params.toString()}`);
};
