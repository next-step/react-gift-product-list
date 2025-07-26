import { api } from './api';
import type { Product } from '@/types/product';
import { AxiosError } from 'axios';

export const getProductSummary = async (productId: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${productId}/summary`);
    // console.log('API Response Data:', response.data);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`HTTP ${error.response?.status || 'Unknown'}`);
    }
    throw new Error('Failed to fetch product');
  }
};
