import axios from 'axios';

interface Receiver {
  name: string;
  phoneNumber: string;
  quantity: number;
}

interface OrderPayload {
  productId: number;
  message: string;
  messageCardId: number | string;
  ordererName: string;
  receivers: Receiver[];
}

export async function postOrder(
  payload: OrderPayload,
  authToken: string
): Promise<void> {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  try {
    await axios.post(`${BASE_URL}/api/order`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.error('인증 오류');
      throw new Error('Unauthorized');
    }

    const errorData = error.response?.data;

    console.error('주문 API 에러 응답:', errorData);

    throw new Error(
      errorData?.data?.message || errorData?.message || '주문에 실패했습니다.'
    );
  }
}
