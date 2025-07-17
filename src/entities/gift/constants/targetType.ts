export const targetGroup = [
    {
        query: "ALL",
        iconText: "ALL",
        label: "전체",
    },
    {
        query: "WOMEN",
        iconText: "👩‍🦰",
        label: "여성이",
    },
    {
        query: "MEN",
        iconText: "👨",
        label: "남성이",
    },
    {
        query: "TEEN",
        iconText: "👦",
        label: "청소년이",
    },
] as const;

export type TargetGroupQuery = (typeof targetGroup)[number]["query"];
