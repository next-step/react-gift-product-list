import { useEffect, useState } from 'react';
import SexContainer from '@/pages/SexContainer';
import CategoryContainer from '@/pages/CategoryContainer';
import ItemContainer from '@/pages/ItemContainer';
import { mockItemList } from '@/mocks/mockItem';
import { RankingContainer, RankingTitle } from '@/styles/RankingStyle.styles.ts';
import type { SexType } from '@/types/sex';
import { SEX_TYPE } from '@/types/sex';

function Ranking() {
  function getInitialSex(): SexType {
    const saved = localStorage.getItem('selectedSex');
    if (saved && Object.values(SEX_TYPE).includes(saved as SexType)) return saved as SexType;
    return SEX_TYPE.ALL;
  }
  const [selectedSex, setSelectedSex] = useState<SexType>(getInitialSex);

  function handleSelect(sex: SexType) {
    setSelectedSex(sex);
    localStorage.setItem('selectedSex', sex);
  }
  useEffect(() => {
    const sex = localStorage.getItem('selectedSex');
    setSelectedSex(sex as SexType);
    console.log(selectedSex);
  }, [selectedSex]);

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
