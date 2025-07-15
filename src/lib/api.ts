import axios from "axios";
import { type Theme, type TargetType, type RankType, type RankingProduct} from "../types/api";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export const getThemes = async (): Promise<Theme[]> => {
    try {
        const response = await api.get<{data: Theme[]}>("/themes");
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

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