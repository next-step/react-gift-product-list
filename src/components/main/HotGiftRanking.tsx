import type {
  RankingRankType,
  RankingTargetType,
} from "@/api/product/get-ranking-products";
import {
  HotGiftRankingGrid,
  HotGiftRankingTab,
  HotGiftRankingTag,
} from "@/components/main";
import { TAB_DATA, TAGS } from "@/constants";
import { parseUrlParam } from "@/utils";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const HotGiftRankingSectionContainer = styled.section(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: `0 ${theme.spacing4}`,
  backgroundColor: `${theme.color.gray[0]}`,
}));

const HotGiftRankingSectionTitle = styled.h3(({ theme }) => ({
  fontSize: `${theme.typography.title1Bold.fontSize}`,
  fontWeight: `${theme.typography.title1Bold.fontWeight}`,
  lineHeight: `${theme.typography.title1Bold.lineHeight}`,
  color: `${theme.color.gray[900]}`,
  marginBottom: `${theme.spacing5}`,
}));

const HotGiftRankingSectionTagContainer = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "67px",
  marginBottom: `${theme.spacing4}`,
}));

export const HotGiftRanking = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTag = parseUrlParam(
    searchParams.get("targetType"),
    TAGS,
    "ALL",
  );
  const selectedTab = parseUrlParam(
    searchParams.get("rankType"),
    TAB_DATA,
    "MANY_WISH",
  );

  const handleParamChange = useCallback(
    (
      key: "targetType" | "rankType",
      value: RankingTargetType | RankingRankType,
    ) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(key, value);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <HotGiftRankingSectionContainer>
      <HotGiftRankingSectionTitle>
        실시간 급상승 선물랭킹
      </HotGiftRankingSectionTitle>
      <HotGiftRankingSectionTagContainer>
        {TAGS.map(tag => (
          <HotGiftRankingTag
            key={tag.id}
            isSelected={selectedTag === tag.id}
            onClick={() => handleParamChange("targetType", tag.id)}
            tagEmoji={tag.emoji}
            tagText={tag.text}
          />
        ))}
      </HotGiftRankingSectionTagContainer>
      <HotGiftRankingTab
        selectedTab={selectedTab}
        onTabChange={tabId => handleParamChange("rankType", tabId)}
      />
      <HotGiftRankingGrid />
    </HotGiftRankingSectionContainer>
  );
};
