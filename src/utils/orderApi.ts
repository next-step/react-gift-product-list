import type { Receiver } from '@/type/GiftAPI/order';
import axios from 'axios';

const orderUrl = 'http://localhost:3000/api/order';

export async function orderAPI(
  productId: number,
  message: string,
  messageCardId: string,
  ordererName: string,
  receivers: Receiver[],
  authToken : string
  ) {
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