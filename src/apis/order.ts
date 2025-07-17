import axiosInstance from "./axiosInstance";

export interface OrderRequest {
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

export async function orderProduct(data: OrderRequest, authToken: string): Promise<void> {
    await axiosInstance.post("/api/order", data, {
        headers: {
            Authorization: authToken,
        },
    });
}
