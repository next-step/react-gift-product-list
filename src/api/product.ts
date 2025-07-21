import apiClient from '@/api/apiClient';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export const getProductSummary = async (
  productId: number
): Promise<ProductSummary> => {
  const response = await apiClient.get(`/api/products/${productId}/summary`);
  return response.data.data;
};
