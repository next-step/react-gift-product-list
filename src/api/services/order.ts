import { API_ENDPOINTS } from '@/api/constants/endpoints'
import orderClient from '@/api/orderClient'
import type { CreateOrderRequest, CreateOrderResponse } from '@/api/types/order'

// * 주문 하기
export const createOrder = async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
  const res = await orderClient.post<{ data: CreateOrderResponse }>(API_ENDPOINTS.ORDER, orderData)
  return res.data.data
}
