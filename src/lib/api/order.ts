import { api } from "./core";
import type { OrderRequest, OrderResponse, ApiResponse } from "../../types/api";

export const createOrder = async (orderData: OrderRequest, authToken: string): Promise<OrderResponse> => {
    const response = await api.post<ApiResponse<OrderResponse>>("/order", orderData, {
        headers: {
            Authorization: authToken
        }
    });
    return response.data.data;
} 