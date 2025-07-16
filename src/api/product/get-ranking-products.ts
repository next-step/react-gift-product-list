import { api } from "@/api/api";
import { executeApi } from "@/api/ErrorHandler";
import { API_ERROR_MESSAGE, type TAB_DATA, type TAGS } from "@/constants";
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
  return executeApi(async () => {
    const { data: response } = await api.get<BaseResponse<ProductType[]>>(
      "/products/ranking",
      {
        params: {
          targetType: params.targetType,
          rankType: params.rankType,
        },
      },
    );
    return response.data;
  }, API_ERROR_MESSAGE.RANKING);
};
