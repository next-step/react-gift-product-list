import axios from 'axios';
import { API_BASE_URL } from '../apiBaseUrl';
import type { OrderInfoValues } from '@/page/Order';

interface FetchOrderProps {
  orderData: OrderInfoValues;
  id: string;
  token: string;
}

const fetchOrder = async ({ orderData, id, token }: FetchOrderProps) => {
  const { message, name, receiverInfos } = orderData;
  const data = {
    productId: Number(id),
    message: message,
    messageCardId: 'card123',
    ordererName: name,
    receivers: receiverInfos,
  };

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  };
  const response = await axios.post(`${API_BASE_URL}/api/order`, data, headers);
  console.log(response.data.data);
};

export default fetchOrder;
