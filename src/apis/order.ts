import apiClient from '@/apis/apiClient';
import type { orderRequsetDTO, orderResponseDTO } from '@/types/DTO/orderDTO';

export async function postOrder({
  productId,
  message,
  messageCardId,
  ordererName,
  receivers,
}: orderRequsetDTO): Promise<orderResponseDTO> {
  const response = await apiClient.post('/order', {
    productId,
    message,
    messageCardId,
    ordererName,
    receivers,
  });
  return response.data;
}
