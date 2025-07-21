import { apiInstance } from '@/apis/instance';
import { API_ORDER_PATH } from './path';
import type { OrderFormData } from '@/schemas/orderForm';

type PostOrderParams = OrderFormData & {
  productId: number;
};

export const postOrder = async (params: PostOrderParams) => {
  return await apiInstance.post<{ data: { success: boolean } }>(API_ORDER_PATH.base, params);
};
