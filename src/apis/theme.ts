import axiosInstance from "./axiosInstance";

export interface ThemeInfo {
    themeId: number;
    name: string;
    title: string;
    description: string;
    backgroundColor: string;
}

export async function getThemeInfo(themeId: string): Promise<ThemeInfo> {
    const res = await axiosInstance.get<{ data: ThemeInfo }>(`/api/themes/${themeId}/info`);
    return res.data.data;
}

export interface ThemeProduct {
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

export interface GetThemeProductsResponse {
    list: ThemeProduct[];
    cursor: number;
    hasMoreList: boolean;
}

export async function getThemeProducts(
    themeId: string,
    cursor = 0,
    limit = 10
): Promise<GetThemeProductsResponse> {
    const res = await axiosInstance.get<{ data: GetThemeProductsResponse }>(
        `/api/themes/${themeId}/products`,
        {
            params: { cursor, limit },
        }
    );
    return res.data.data;
}
