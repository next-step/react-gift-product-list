import { orderUrl } from '@/constant/api';
import type { Receiver } from '@/type/GiftAPI/order';
import axios from 'axios';


export async function orderAPI(
  productId: number,
  message: string,
  messageCardId: string,
  ordererName: string,
  receivers: Receiver[],
  authToken : string
  ) : Promise<void> {
  try {
    await axios.post(orderUrl, {
      productId,
      message,
      messageCardId,
      ordererName,
      receivers,
    },
      {
        headers: {
          Authorization: authToken,
        },
      });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.data?.message);
    } else {
      throw new Error(`알수없는 에러`);
    }
  }
};