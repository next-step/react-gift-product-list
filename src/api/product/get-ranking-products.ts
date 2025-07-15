import { api } from "@/api/api";
import ApiErrorHandler from "@/api/ErrorHandler";
import type { TAB_DATA, TAGS } from "@/constants";
import type { ProductType } from "@/types";

export type RankingTargetType = (typeof TAGS)[number]["id"];
export type RankingRankType = (typeof TAB_DATA)[number]["id"];
interface GetRankingProductParams {
  targetType: RankingTargetType;
  rankType: RankingRankType;
}

export const getRankingProduct = async (
  params: GetRankingProductParams = {
    targetType: "ALL",
    rankType: "MANY_WISH",
  },
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
