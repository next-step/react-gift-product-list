import { api } from "@/api/api";
import { executeApi } from "@/api/ErrorHandler";
import { API_ERROR_MESSAGE } from "@/constants";

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
  return executeApi(async () => {
    const { data: response } = await api.post<
      BaseResponse<CreateOrderResponseBody>
    >("/order", requestBody);
    return response.data;
  }, API_ERROR_MESSAGE.ORDER);
};
