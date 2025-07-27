import { api } from './api';
import type { Product } from '@/types/product';
import { AxiosError } from 'axios';

export const getProductSummary = async (productId: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${productId}/summary`);
    const summaryData = response.data.data;

    return {
      ...summaryData,
      price: {
        sellingPrice: summaryData.price,
        basicPrice: summaryData.price,
        discountRate: 0,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`HTTP ${error.response?.status || 'Unknown'}`);
    }
    throw new Error('Failed to fetch product');
  }
};
