import type { TrendingGiftsType } from "@/types/TrendingGiftsType";
import {
  TrendingGiftsSection,
  TitleWarpper,
  SectionTitle,
  TabsWrapper,
  MainTabButton,
  TabIconContainer,
  TabLabel,
  ErrorContainer,
  ErrorMessage,
} from "./TrendingGifts.styles";
import { LocalStorageProvider } from "@/pages/HomePage/context/TabStorageContext";
import { useMainTab, useSubTab } from "@/pages/HomePage/hooks/useTabStorage";
import { Loading } from "@/components/Loading/Loading";
import { RANK_TYPE, TARGET_TYPE, TRENDING_GIFTS_TABS } from "./constants/tabs";
import {
  TRENDING_GIFTS_ERROR_MESSAGES,
  TRENDING_GIFTS_LABELS,
} from "./constants/labels";
import { getTrendingGifts } from "@/data/api";
import { useFetch } from "@/hooks/useFetch";
import TrendingGiftsProductsGrid from "./TrendingGiftsProductsGrid";
import TabContentWrapper from "./TabContentWrapper";

function TrendingGiftsContent() {
  const [mainTabIdx, setMainTabIdx] = useMainTab();
  const [subTabIdx, setSubTabIdx] = useSubTab();

  const { data, isLoading, isError } = useFetch<TrendingGiftsType[]>({
    fetchFn: () =>
      getTrendingGifts(TARGET_TYPE[mainTabIdx], RANK_TYPE[subTabIdx]),
    errorHandler: () => {
      console.error(TRENDING_GIFTS_ERROR_MESSAGES.FETCH_ERROR);
    },
    deps: [mainTabIdx, subTabIdx],
  });

  const renderTrendingGiftsContent = () => {
    if (isError) {
      return (
        <ErrorContainer>
          <ErrorMessage>
            {TRENDING_GIFTS_ERROR_MESSAGES.FETCH_ERROR}
          </ErrorMessage>
        </ErrorContainer>
      );
    }

    if (isLoading) {
      return <Loading />;
    }

    return <TrendingGiftsProductsGrid products={data || []} />;
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
