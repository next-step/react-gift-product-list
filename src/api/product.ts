//상품 정보용 api
import { client } from "./client";

export interface ProductSummary {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export const getProductSummary = async (
  productId: number,
): Promise<ProductSummary> => {
  const res = await client.get(`/api/products/${productId}`);
  return res.data.data;
};
