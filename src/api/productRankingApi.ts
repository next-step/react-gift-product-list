import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchProductRankings = (filter: string = 'popular', gender?: string) => {
  const params = new URLSearchParams();
  params.append('filter', filter);
  if (gender) {
    params.append('gender', gender);
  }
  return API.get(`/api/products/ranking?${params.toString()}`);
};
