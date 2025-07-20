import axios from 'axios';
import type { OrderData } from '@/types/order';
import type { ProductSummary } from '@/pages/OrderPage';
import type { AxiosResponse } from 'axios';

export interface LoginResponse {
  data: {
    email: string;
    name: string;
    authToken: string;
  };
}

export interface ProductSummaryResponse {
  data: ProductSummary;
}

export interface CreateOrderResponse {
  success: boolean;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AxiosResponse<LoginResponse>> {
  return axios.post<LoginResponse>('/api/login', { email, password });
}

export async function fetchProductSummary(
  productId: number,
): Promise<AxiosResponse<ProductSummaryResponse>> {
  return axios.get<ProductSummaryResponse>(
    `/api/products/${productId}/summary`,
  );
}

export async function createOrder(
  orderData: OrderData,
  authToken: string,
): Promise<AxiosResponse<CreateOrderResponse>> {
  return axios.post<CreateOrderResponse>('/api/order', orderData, {
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
  });
}
