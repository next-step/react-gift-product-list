import apiClient from "@/api/apiClient";

export type OrderRequest = {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
};

export type OrderResponse = {
  success: boolean;
};

export const createOrder = (payload: OrderRequest): Promise<OrderResponse> => {
  return apiClient.post("/order", payload);
};
