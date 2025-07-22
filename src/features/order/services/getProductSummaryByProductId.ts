import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { isAxiosError } from "axios";

import { api } from "@/app/lib/api";

import type { GiftModel } from "@/entities/gift/model/GiftModel";

import { useHTTP } from "@/shared/hooks/useHTTP";

export interface GetProductSummaryByIdResponse extends Omit<GiftModel, "price" | "brandInfo"> {
    price: number;
    brandName: string;
}

export async function getProductSummary(productId: number) {
    const { data: response } = await api.get<BaseResponse<GetProductSummaryByIdResponse>>(
        `/products/${productId}/summary`,
    );
    return response.data;
}

export const useProductSummaryByProductId = (productId: number) => {
    const navigate = useNavigate();

    return useHTTP<void, GetProductSummaryByIdResponse>({
        apiFunction: () => getProductSummary(productId),
        requestOnMount: true,
        onError: (error) => {
            if (!isAxiosError(error)) throw error;

            const status = Number(error.response?.status);
            if (400 <= status && status < 500) {
                toast.error("클라이언트 오류가 발생했습니다. 요청을 확인해주세요.");
                navigate("/");
            }
        },
    });
};
