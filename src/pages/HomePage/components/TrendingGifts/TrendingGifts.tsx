import { useState, useEffect } from "react";
import { TRENDING_GIFTS_TABS, TRENDING_GIFTS_LABELS } from "./constants/labels";
import TabContentWrapper from "./TabContentWrapper/TabContentWrapper";
import ProductGrid from "./ProductGrid/ProductGrid";
import type { TrendingGiftsType } from "@/types/TrendingGiftsType";
import {
  TrendingGiftsSection,
  TitleWarpper,
  SectionTitle,
  TabsWrapper,
  MainTabButton,
  TabIconContainer,
  TabLabel,
  MoreInfoWrapper,
  MoreInfo,
} from "./TrendingGifts.styles";
import { LocalStorageProvider } from "@/pages/HomePage/context/TabStorageContext";
import { useMainTab, useSubTab } from "@/pages/HomePage/hooks/useTabStorage";
import axios from "axios";

const TARGET_TYPE = ["ALL", "FEMALE", "MALE", "TEEN"];
const RANK_TYPE = ["MANY_WISH", "MANY_RECEIVE", "MANY_WISH_RECEIVE"];

function TrendingGiftsContent() {
  const [mainTabIdx, setMainTabIdx] = useMainTab();
  const [subTabIdx, setSubTabIdx] = useSubTab();
  const [data, setData] = useState<TrendingGiftsType[]>([]);

  useEffect(() => {
    const fetchTrendingGifts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/ranking?targetType=${TARGET_TYPE[mainTabIdx]}&rankType=${RANK_TYPE[subTabIdx]}`
        );
        const trendingGifts = response.data.data;
        console.log(trendingGifts);
        setData(trendingGifts);
      } catch (error) {
        console.error("실시간 급상승 선물랭킹 데이터 로딩 실패", error);
      }
    };

    fetchTrendingGifts();
  }, [mainTabIdx, subTabIdx]);

  return (
    <TrendingGiftsSection>
      <TitleWarpper>
        <SectionTitle>{TRENDING_GIFTS_LABELS.SECTION_TITLE}</SectionTitle>
      </TitleWarpper>
      <TabsWrapper>
        {TRENDING_GIFTS_TABS.map((el, idx) => (
          <MainTabButton key={idx} onClick={() => setMainTabIdx(idx)}>
            <TabIconContainer isSelected={idx === mainTabIdx}>
              {el.ICON}
            </TabIconContainer>
            <TabLabel isSelected={idx === mainTabIdx}>{el.NAME}</TabLabel>
          </MainTabButton>
        ))}
      </TabsWrapper>

      <TabContentWrapper subTabIdx={subTabIdx} onClick={setSubTabIdx}>
        <ProductGrid products={data} />
      </TabContentWrapper>

      <MoreInfoWrapper>
        <MoreInfo>{TRENDING_GIFTS_LABELS.MORE_INFO}</MoreInfo>
      </MoreInfoWrapper>
    </TrendingGiftsSection>
  );
}

function TrendingGifts() {
  return (
    <LocalStorageProvider>
      <TrendingGiftsContent />
    </LocalStorageProvider>
  );
}

export default TrendingGifts;
