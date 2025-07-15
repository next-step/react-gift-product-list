import { useState, useEffect } from "react";
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
  LoadingContainer,
  ErrorContainer,
  ErrorMessage,
} from "./TrendingGifts.styles";
import { LocalStorageProvider } from "@/pages/HomePage/context/TabStorageContext";
import { useMainTab, useSubTab } from "@/pages/HomePage/hooks/useTabStorage";
import type { FetchState } from "@/types/FetchState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { TRENDING_GIFTS_TABS, TARGET_TYPE, RANK_TYPE } from "./constants/tabs";
import {
  TRENDING_GIFTS_ERROR_MESSAGES,
  TRENDING_GIFTS_LABELS,
} from "./constants/labels";
import { getTrendingGifts } from "@/data/api";

function TrendingGiftsContent() {
  const [mainTabIdx, setMainTabIdx] = useMainTab();
  const [subTabIdx, setSubTabIdx] = useSubTab();
  const [fetchState, setFetchState] = useState<FetchState<TrendingGiftsType>>({
    data: null,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    const fetchTrendingGifts = async () => {
      setFetchState({
        data: null,
        isLoading: true,
        isError: false,
      });

      try {
        const trendingGifts = await getTrendingGifts(
          TARGET_TYPE[mainTabIdx],
          RANK_TYPE[subTabIdx]
        );

        setFetchState({
          data: trendingGifts,
          isLoading: false,
          isError: false,
        });
      } catch (error) {
        console.error(TRENDING_GIFTS_ERROR_MESSAGES.FETCH_ERROR, error);

        setFetchState({
          data: null,
          isLoading: false,
          isError: true,
        });
      }
    };

    fetchTrendingGifts();
  }, [mainTabIdx, subTabIdx]);

  const renderTrendingGiftsContent = () => {
    if (fetchState.isError) {
      return (
        <ErrorContainer>
          <ErrorMessage>
            {TRENDING_GIFTS_ERROR_MESSAGES.FETCH_ERROR}
          </ErrorMessage>
        </ErrorContainer>
      );
    }

    if (fetchState.isLoading) {
      return (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      );
    }

    return <ProductGrid products={fetchState.data || []} />;
  };

  return (
    <>
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
        {renderTrendingGiftsContent()}
      </TabContentWrapper>
    </>
  );
}

function TrendingGifts() {
  return (
    <LocalStorageProvider>
      <TrendingGiftsSection>
        <TitleWarpper>
          <SectionTitle>{TRENDING_GIFTS_LABELS.SECTION_TITLE}</SectionTitle>
        </TitleWarpper>
        <TrendingGiftsContent />
      </TrendingGiftsSection>
    </LocalStorageProvider>
  );
}

export default TrendingGifts;
