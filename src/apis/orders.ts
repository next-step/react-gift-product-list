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

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authToken) {
    headers.Authorization = authToken;
  }

  const res = await fetch(`${BASE_URL}/api/order`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    console.error('인증 오류');
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    let errorData = null;
    try {
      errorData = await res.json();
      console.error('주문 API 에러 응답:', errorData);
    } catch {
      console.error('주문 API 에러 응답 파싱 실패');
    }
    throw new Error(
      errorData?.data?.message || errorData?.message || '주문에 실패했습니다.'
    );
  }
}
