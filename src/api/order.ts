import { fetchApi } from './client'

export interface OrderReceiver {
  name: string
  phoneNumber: string
  quantity: number
}

export interface OrderRequest {
  productId: number
  message: string
  messageCardId: string
  ordererName: string
  receivers: OrderReceiver[]
}

export interface OrderResponse {
  success: boolean
  message?: string
}

export async function postOrder(
  order: OrderRequest,
  token: string,
): Promise<OrderResponse> {
  const data = await fetchApi<OrderResponse>('/api/order', {
    method: 'POST',
    body: order,
    headers: { Authorization: token },
  })

  if (!data.success) {
    throw new Error(data.message || '주문에 실패했습니다.')
  }

  return data
}