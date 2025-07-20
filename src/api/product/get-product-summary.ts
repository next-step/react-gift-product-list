import { api } from "@/api/api";

interface ProductSummaryResponseBody {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export const getProductSummary = async (
  productId: number,
): Promise<ProductSummaryResponseBody> => {
  const { data: response } = await api.get<
    BaseResponse<ProductSummaryResponseBody>
  >(`/products/${productId}/summary`);
  return response.data;
};
