import { api } from "./core";
import type { RankType, TargetType, RankingProduct, ProductSummary } from "../../types/api";

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

export const getProductSummary = async (productId: number): Promise<ProductSummary> => {
    try {
        const response = await api.get<{data: ProductSummary}>(`/products/${productId}/summary`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
