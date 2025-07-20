import { api } from "@/api/api";

interface CreateOrderRequestBody {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
}

interface CreateOrderResponseBody {
  success: boolean;
}
export const createOrder = async (
  requestBody: CreateOrderRequestBody,
): Promise<CreateOrderResponseBody> => {
  const { data: response } = await api.post<
    BaseResponse<CreateOrderResponseBody>
  >("/order", requestBody);
  return response.data;
};
