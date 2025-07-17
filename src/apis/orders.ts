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
  const res = await fetch('/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || '주문에 실패했습니다.');
  }
}
