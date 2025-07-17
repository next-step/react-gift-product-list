import axios from 'axios';

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
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}/summary`
  );
  return response.data.data;
};
