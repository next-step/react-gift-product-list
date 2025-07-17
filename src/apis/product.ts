import axiosInstance from "./axiosInstance";

export interface ProductSummary {
    id: number;
    name: string;
    brandName: string;
    price: number;
    imageURL: string;
}

export async function getProductSummary(productId: number): Promise<ProductSummary> {
    const res = await axiosInstance.get<{ data: ProductSummary }>(`/api/products/${productId}/summary`);
    return res.data.data;
}