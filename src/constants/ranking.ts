export const GENDER_FILTERS = [
  { label: "전체", value: "ALL" },
  { label: "여성", value: "FEMALE" },
  { label: "남성", value: "MALE" },
  { label: "청소년", value: "TEEN" },
] as const;

export type GenderType = (typeof GENDER_FILTERS)[number]["value"];

export const RANKING_TABS = [
  { label: "받고 싶어한", value: "MANY_WISH" },
  { label: "많이 선물한", value: "MANY_RECEIVE" },
  { label: "위시로 받은", value: "MANY_WISH_RECEIVE" },
] as const;

export type TabType = (typeof RANKING_TABS)[number]["value"];
