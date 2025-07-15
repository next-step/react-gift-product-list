import axiosInstance from "./axiosInstance";

export interface GiftProduct {
    id: number;
    name: string;
    imageURL: string;
    price: {
        basicPrice: number;
        sellingPrice: number;
        discountRate: number;
    };
    brandInfo: {
        id: number;
        name: string;
        imageURL: string;
    };
}

export async function fetchGiftRanking(
    targetType: string,
    rankType: string
): Promise<GiftProduct[]> {
    const response = await axiosInstance.get<{ data: GiftProduct[] }>(
        "/api/products/ranking",
        {
            params: {
                targetType,
                rankType,
            },
        }
    );
    return response.data.data;
}