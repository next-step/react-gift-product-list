import { client } from './client';
import type { GenderFilter, SortFilter } from '@/components/RankingTabs';

export const getThemes = async () => {
  const response = await client.get('/api/themes');
  return response.data.data;
};

export const getRanking = async (targetType: GenderFilter, rankType: SortFilter) => {
  const rankTypeMap: Record<SortFilter, string> = {
    WANT: 'MANY_WISH',
    RECEIVE: 'MANY_RECEIVE',
    WISH_RECEIVE: 'MANY_WISH_RECEIVE',
  };

  const response = await client.get('/api/products/ranking', {
    params: {
      targetType,
      rankType: rankTypeMap[rankType],
    },
  });
  return response.data.data;
};

export const getProductDetail = async (productId: string) => {
  const response = await client.get(`/api/products/${productId}`);
  return response.data.data;
};

export const getProductSummary = async (productId: string) => {
  const response = await client.get(`/api/products/${productId}/summary`);
  return response.data.data;
};

export const login = async (email: string, password: string) => {
  const response = await client.post('/api/login', { email, password });
  return response.data.data;
};

export const createOrder = async (orderData: any) => {
  const response = await client.post('/api/order', orderData);
  return response.data.data;
};
