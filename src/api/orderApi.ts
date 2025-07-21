import API from './axiosInstance';

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

export const submitOrder = async (orderData: OrderRequest) => {
  const response = await API.post('/api/order', orderData);
  return response.data;
};
