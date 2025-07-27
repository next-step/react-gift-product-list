import { requests } from '@/api/requests';
import { ROUTES } from '@/routes/Routes';
import axios from 'axios';
import type { OrderInfoValues } from '..';

export interface postOrderInfoProps {
  orderData: OrderInfoValues;
  navigate: (path: string) => void;
  id: string;
}

const postOrderInfo = async ({ orderData, navigate, id }: postOrderInfoProps): Promise<boolean> => {
  try {
    const data = await requests.fetchOrder({ orderData, id });
    return data.success;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.data?.data?.statusCode;
      if (status === 401) {
        navigate(ROUTES.LOGIN);
      }
    }
    return false;
  }
};

export default postOrderInfo;
