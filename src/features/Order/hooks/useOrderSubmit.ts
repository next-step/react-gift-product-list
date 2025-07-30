import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserContext';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';
import { ROUTE_PATH } from '@/routes/Router';
import type { AxiosError } from 'axios';

interface OrderPayload {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
}

export const useOrderSubmit = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const authToken = user?.authToken;

  const submitOrder = async (orderPayload: OrderPayload) => {
    try {
      const res = await api.post('/order', orderPayload, {
        headers: { Authorization: authToken },
      });
      console.log(res.statusText);
      return res;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        toast.error('로그인이 필요합니다.');
        navigate(ROUTE_PATH.LOGIN);
      } else {
        toast.error('주문 중 오류가 발생했습니다.');
        console.error(axiosError.response?.data);
      }

      throw error;
    }
  };

  return { submitOrder };
};
