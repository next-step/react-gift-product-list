import { api } from './api';
import type { OrderInfo } from '@/types/order';
import { AxiosError } from 'axios';

export const createOrder = async (orderData: OrderInfo): Promise<void> => {
  try {
    await api.post('/order', orderData);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Order failed');
  }
};
