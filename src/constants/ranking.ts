import type { TargetType, RankType } from "@/api/product";

export const GENDER_FILTERS: { label: string; value: TargetType }[] = [
  { label: "전체", value: "ALL" },
  { label: "여성", value: "FEMALE" },
  { label: "남성", value: "MALE" },
  { label: "청소년", value: "TEEN" },
];

export type GenderType = (typeof GENDER_FILTERS)[number]["value"];

export const RANKING_TABS: { label: string; value: RankType }[] = [
  { label: "받고 싶어한", value: "MANY_WISH" },
  { label: "많이 선물한", value: "MANY_RECEIVE" },
  { label: "위시로 받은", value: "MANY_WISH_RECEIVE" },
];

export type TabType = (typeof RANKING_TABS)[number]["value"];
