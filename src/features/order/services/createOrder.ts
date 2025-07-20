import { toast } from "react-toastify";

import { isAxiosError } from "axios";

import { api } from "@/app/lib/api";

import { useHTTP } from "@/shared/hooks/useHTTP";
import { useRedirect } from "@/shared/hooks/useRedirect";

export interface CreateOrderRequestBody {
    productId: number;
    messageCardId: string;
    message: string;
    ordererName: string;
    receivers: Array<{
        name: string;
        phoneNumber: string;
        quantity: number;
    }>;
}

export interface CreateOrderResponseBody {
    success: boolean;
}

export async function createOrder(body?: CreateOrderRequestBody) {
    const { data: response } = await api.post<BaseResponse<CreateOrderResponseBody>>(
        "/order",
        body,
    );
    return response.data;
}

export const useCreateOrder = () => {
    const { navigateWithRedirect } = useRedirect();

    return useHTTP<CreateOrderRequestBody, CreateOrderResponseBody>({
        apiFunction: createOrder,
        onError: (error) => {
            if (!isAxiosError(error)) throw error;
            switch (error.response?.status) {
                case 401:
                    toast.error("로그인이 필요합니다. 다시 로그인해주세요.");
                    navigateWithRedirect("/auth/signin");
                    break;
                case 400:
                    toast.error("입력한 정보를 확인해주세요");
                    break;
                default:
                    toast.error("주문에 실패했습니다. 다시 시도해주세요.");
                    break;
            }
        },
    });
};
