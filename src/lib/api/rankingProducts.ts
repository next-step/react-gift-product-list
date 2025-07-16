import { api } from "./core";
import type { RankType, TargetType, RankingProduct } from "../../types/api";

export const getRankingProducts = async (targetType: TargetType = 'ALL', rankType: RankType = 'MANY_WISH'): Promise<RankingProduct[]> => {
    try {
        const response = await api.get<{data: RankingProduct[]}>("/products/ranking", {
            params: {
                targetType,
                rankType
            }
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getProductById = async (productId: number): Promise<RankingProduct> => {
    try {
        const response = await api.get<{data: RankingProduct}>(`/products/${productId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
