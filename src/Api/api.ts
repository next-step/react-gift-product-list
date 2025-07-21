import type { ProductSummary } from '@/types/types';
import axios, { type AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

interface LoginResponse {
  data: {
    email: string;
    name: string;
    authToken: string;
  };
}

export const postLogin = (email: string, password: string): Promise<AxiosResponse<LoginResponse>> =>
  api.post<LoginResponse>('/api/login', { email, password });

interface ProductSummaryResponse {
  data: ProductSummary;
}

export const getProductSummaryResponse = (productId: number) => {
  api.get<ProductSummaryResponse>(`/api/products/${productId}/summary`);
};
