import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { OrderRequest } from "@/types/order";

type PostOrderParams = {
  orderData: OrderRequest;
  token: string;
};

export const postOrder = async (params: PostOrderParams) => {
  return await axiosInstance.post(API_PATHS.ORDER, params.orderData, {
    headers: {
      Authorization: params.token,
    },
  });
};
