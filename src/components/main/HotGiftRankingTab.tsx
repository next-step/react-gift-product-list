import type { RankingRankType } from "@/api/product/get-ranking-products";
import { TAB_DATA } from "@/constants";
import styled from "@emotion/styled";

const HotGiftTabContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "45px",
  borderRadius: `${theme.spacing2}`,
  backgroundColor: `${theme.color.blue[100]}`,
  marginBottom: `${theme.spacing4}`,
  padding: `${theme.spacing3} ${theme.spacing4}`,
  alignItems: "center",
  justifyContent: "space-around",
  transition: "all 0.2s ease",
  border: "1px solid rgba(70,132,233,0.1)",
}));

const HotGiftTabTag = styled.button<{ isSelected: boolean }>(
  ({ theme, isSelected }) => ({
    display: "flex",
    flexWrap: "wrap",
    cursor: "pointer",
    color: isSelected ? theme.color.blue[700] : theme.color.blue[500],
    fontSize: isSelected
      ? theme.typography.label1Bold.fontSize
      : theme.typography.label1Regular.fontSize,
    fontWeight: isSelected
      ? theme.typography.label1Bold.fontWeight
      : theme.typography.label1Regular.fontWeight,
    lineHeight: isSelected
      ? theme.typography.label1Bold.lineHeight
      : theme.typography.label1Regular.lineHeight,
    transition: "all 0.2s ease",
    border: "none",
    background: "none",
  }),
);

interface HotGiftRankingTabProp {
  selectedTab: RankingRankType;
  onTabChange: (tabId: RankingRankType) => void;
}

export const HotGiftRankingTab = ({
  onTabChange,
  selectedTab,
}: HotGiftRankingTabProp) => {
  return (
    <HotGiftTabContainer>
      {TAB_DATA.map(tab => (
        <HotGiftTabTag
          key={tab.id}
          isSelected={selectedTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.text}
        </HotGiftTabTag>
      ))}
    </HotGiftTabContainer>
  );
};
