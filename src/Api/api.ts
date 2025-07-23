import type { ProductSummary, ThemeInfo, ThemeListItem } from '@/types/types';
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

interface ProductSummaryResponse {
  data: ProductSummary;
}

export const postLogin = (email: string, password: string): Promise<AxiosResponse<LoginResponse>> =>
  api.post<LoginResponse>('/api/login', { email, password });

export const getProductSummary = async (productId: number): Promise<ProductSummary> => {
  const { data } = await api.get<ProductSummaryResponse>(`/api/products/${productId}/summary`);
  return data.data;
};

interface OrderBody {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
}

export const postOrder = (body: OrderBody) => api.post('/api/order', body);

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth');
  if (raw) {
    try {
      const { authToken } = JSON.parse(raw);
      if (authToken) config.headers.Authorization = authToken;
    } catch {}
  }
  return config;
});

interface ThemeInfoResponse {
  data: ThemeInfo;
}

export const getThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
  const { data } = await api.get<ThemeInfoResponse>(`/api/themes/${themeId}/info`);
  return data.data;
};

interface ThemeListResponse {
  data: ThemeListItem[];
}

export const getThemeList = async (): Promise<ThemeListItem[]> => {
  const { data } = await api.get<ThemeListResponse>('/api/themes');
  return data.data;
};
