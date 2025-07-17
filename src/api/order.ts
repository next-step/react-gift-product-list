import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { OrderRequest } from "@/types/order";

export const postOrder = async (orderData: OrderRequest, token: string) => {
  return await axiosInstance.post(API_PATHS.ORDER, orderData, {
    headers: {
      Authorization: token,
    },
  });
};
