export const TRENDING_GIFTS_TABS = [
  {
    NAME: "전체",
    ICON: "ALL",
  },
  {
    NAME: "여성이",
    ICON: "👩🏻",
  },
  {
    NAME: "남성이",
    ICON: "👨🏻",
  },
  {
    NAME: "청소년이",
    ICON: "👦🏻",
  },
] as const;

export const TRENDING_GIFTS_SUB_TABS = [
  "받고 싶어한",
  "많이 선물한",
  "위시로 받은",
] as const;

export const TRENDING_GIFTS_STORAGE_KEYS = {
  MAIN_TAB: "mainTab",
  SUB_TAB: "subTab",
} as const;

export const TARGET_TYPE = ["ALL", "FEMALE", "MALE", "TEEN"] as const;
export const RANK_TYPE = [
  "MANY_WISH",
  "MANY_RECEIVE",
  "MANY_WISH_RECEIVE",
] as const;
