import fetchOrder from '@/api/order/fetchOrder';
import { ROUTES } from '@/routes/routes';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { OrderInfoValues } from '..';

export interface postOrderInfoProps {
  orderData: OrderInfoValues;
  navigate: (path: string) => void;
  id: string;
  token: string;
}

const postOrderInfo = async ({
  orderData,
  navigate,
  id,
  token,
}: postOrderInfoProps): Promise<boolean> => {
  try {
    const data = await fetchOrder({ orderData, id, token });
    console.log(data);
    return true;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.data?.data?.statusCode;
      toast(
        status && status >= 400 && status < 500
          ? error.response?.data?.data?.message
          : '기타 에러 발생(서버 에러, 네트워크 에러 등)'
      );
      if (status === 401) {
        navigate(ROUTES.LOGIN);
      }
    }
    return false;
  }
};

export default postOrderInfo;
