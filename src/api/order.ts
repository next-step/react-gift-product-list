import apiClient from '@/api/apiClient';

interface Receiver {
  name: string;
  phoneNumber: string;
  quantity: number;
}

interface OrderRequest {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: Receiver[];
}

export const postOrder = async (orderData: OrderRequest, authToken: string) => {
  const response = await apiClient.post('/order', orderData, {
    headers: {
      Authorization: authToken,
    },
  });

  return response.data;
};
