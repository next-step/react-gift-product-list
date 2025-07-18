import baseHttp from "./baseHttp";
import type { Product } from "@/types/product";

export const productSummary = async (
  productId: string
): Promise<{ data: Product }> => {
  const response = await baseHttp.get<{ data: Product }>(`/products/${productId}/summary`);
  return response.data;
};

type OrderReceiver = {
  name: string;
  phoneNumber: string;
  quantity: number;
};

type OrderRequest = {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: OrderReceiver[];
};

export const orderProduct = async (data: OrderRequest, authToken: string) => {
  const response = await baseHttp.post("/order", data, {
    headers: {
      Authorization: `${authToken}`,
    },
  });

  return response.data;
};
