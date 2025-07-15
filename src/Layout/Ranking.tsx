import { useEffect } from 'react';
import SexContainer from '@/pages/SexContainer';
import CategoryContainer from '@/pages/CategoryContainer';
import ItemContainer from '@/pages/ItemContainer';
import { RankingContainer, RankingTitle } from '@/styles/RankingStyle.styles.ts';
import type { SexType } from '@/types/sex';
import type { CategoryType } from '@/types/category';
import useRanking from '@/hooks/useRanking';

function Ranking() {
  const {
    isLoading,
    error,
    selectedSex,
    selectCategory,
    items,
    setSelectedSex,
    setSelectCategory,
    handleSelect,
    handleCategoryClick,
    getRank,
  } = useRanking();

  useEffect(() => {
    const sex = localStorage.getItem('selectedSex');
    setSelectedSex((sex as SexType) || 'ALL');
    const category = localStorage.getItem('selectedCategory');
    setSelectCategory((category as CategoryType) || 'MANY_WISH');
    getRank();
  }, [selectedSex, selectCategory]);

  if (isLoading) <>로딩중입니다.</>;
  if (error) return <p>{error}</p>;

  return (
    <RankingContainer>
      <RankingTitle>실시간 급상승 선물랭킹</RankingTitle>
      <SexContainer selectedSex={selectedSex} handleSelect={handleSelect} />
      <CategoryContainer
        selectedCategory={selectCategory}
        handleCategoryClick={handleCategoryClick}
      />
      <ItemContainer itemList={items} />
    </RankingContainer>
  );
}

export default Ranking;
