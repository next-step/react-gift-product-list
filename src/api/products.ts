import type { GiftItem } from "@/types/gift";
import instance from "./axiosInstance";
import type { AxiosResponse } from "axios";

export const getRanking = (
  targetType: string,
  rankType: string
): Promise<AxiosResponse<{ data: GiftItem[] }>> => {
  return instance.get("/products/rankings", {
    params: { targetType, rankType },
  });
};
