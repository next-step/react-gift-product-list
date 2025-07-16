import type { TargetType, RankType } from "@/types/gift";
import { targetType, rankType } from "@/data/giftType";

export const isValidTargetType = (value: string): value is TargetType => {
  return targetType.some(type => type.id === value);
};

export const isValidRankType = (value: string): value is RankType => {
  return rankType.some(type => type.id === value);
};
