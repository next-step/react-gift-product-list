import { orderUrl } from '@/constant/api';
import type { Receiver } from '@/type/GiftAPI/order';
import axios from 'axios';
import api from './api';


export async function orderAPI(
  productId: number,
  message: string,
  messageCardId: string,
  ordererName: string,
  receivers: Receiver[],
  ) : Promise<void> {
  try {
    await api.post(orderUrl, {
      productId,
      message,
      messageCardId,
      ordererName,
      receivers,
    },);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.data?.message);
    } else {
      throw new Error(`알수없는 에러`);
    }
  }
};