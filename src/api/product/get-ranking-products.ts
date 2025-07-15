import { api } from "@/api/api";
import ApiErrorHandler from "@/api/ErrorHandler";
import type { ProductType } from "@/types";

interface GetRankingProductParams {
  targetType?: "ALL" | "FEMALE" | "MALE" | "TEEN";
  rankType?: "MANY_WISH" | "MANY_RECEIVE" | "MANY_WISH_RECEIVE";
}

export const getRankingProduct = async (
  params: GetRankingProductParams = {},
): Promise<ProductType[]> => {
  return ApiErrorHandler.executeApi(async () => {
    const { data: response } = await api.get<BaseResponse<ProductType[]>>(
      "/products/ranking",
      {
        params: {
          targetType: params.targetType || "ALL",
          rankType: params.rankType || "MANY_WISH",
        },
      },
    );
    return response.data;
  }, "실시간 급상승 랭킹을 불러오는 중 오류가 발생했습니다.");
};
