import { api } from "@/api/api";
import { executeApi } from "@/api/ErrorHandler";
import { API_ERROR_MESSAGE } from "@/constants";

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
  return executeApi(async () => {
    const { data: response } = await api.get<
      BaseResponse<ProductSummaryResponseBody>
    >(`/products/${productId}/summary`);
    return response.data;
  }, API_ERROR_MESSAGE.PRODUCT);
};
