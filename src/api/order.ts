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

  if (typeof data !== 'object' || typeof data.success !== 'boolean') {
    throw new Error('Invalid response from /api/order')
  }

  return data
}