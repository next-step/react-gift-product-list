import { useEffect } from 'react';
import SexContainer from '@/pages/SexContainer';
import CategoryContainer from '@/pages/CategoryContainer';
import ItemContainer from '@/pages/ItemContainer';
import { mockItemList } from '@/mocks/mockItem';
import { RankingContainer, RankingTitle } from '@/styles/RankingStyle.styles.ts';
import type { SexType } from '@/types/sex';

import useRanking from '@/hooks/useRanking';

function Ranking() {
  const { selectedSex, selectCategory, setSelectedSex, handleSelect } = useRanking();

  useEffect(() => {
    const sex = localStorage.getItem('selectedSex');
    setSelectedSex(sex as SexType);
    console.log(selectedSex);
  });

  return (
    <RankingContainer>
      <RankingTitle>실시간 급상승 선물랭킹</RankingTitle>
      <SexContainer selectedSex={selectedSex} handleSelect={handleSelect} />
      <CategoryContainer />
      <ItemContainer itemList={mockItemList} />
    </RankingContainer>
  );
}

export default Ranking;
