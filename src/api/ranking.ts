//실시간 급상승 랭킹 부분에 대한 api 함수용
import { client } from "./client";

export type TargetType = "ALL" | "FEMALE" | "MALE" | "TEEN";
export type RankType = "MANY_WISH" | "MANY_RECEIVE" | "MANY_WISH_RECEIVE";

export interface RankingItem {
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

interface FetchRankingParams {
  targetType?: TargetType;
  rankType?: RankType;
}

interface FetchRankingResponse {
  data: RankingItem[];
}

export const fetchRanking = async (
  params: FetchRankingParams = {}
): Promise<RankingItem[]> => {
  const response = await client.get<FetchRankingResponse>(
    "/api/products/ranking",
    { params }
  );
  return response.data.data;
};
