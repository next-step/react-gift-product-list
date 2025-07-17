import axios from 'axios';

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

export const postOrder = async (orderData: OrderRequest) => {
  const userInfo = sessionStorage.getItem('userInfo');
  const token = userInfo ? JSON.parse(userInfo).authToken : '';

  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/order`,
    orderData,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return res.data;
};
