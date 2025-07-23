import PresentRankingItem from '@src/components/Home/PresentRanking/Item/PresentRankingItem';
import RankingTagContainer from '@src/components/Home/PresentRanking/Cotainer/RankingTagContainer';
import { useState } from 'react';
import {
  StyledPresenetRankingAddItemBtn,
  StyledPresenetRankingAddItemBtnDiv,
  StyledPresentRankingContainer,
  StyledPresentRankingContainerTitle,
  StyledPrsentRankingDiv,
} from '@src/components/Home/PresentRanking/Cotainer/StyledPresentRankingContainer';
import { useRankingItem } from '@src/hooks/useRankingItem';

const PresentRankingContainer = () => {
  const [isVisible, setisVisible] = useState(false);
  const { goods, isLoading, isError } = useRankingItem();

  const handelToogle = () => {
    setisVisible((prev) => !prev);
  };

  return (
    <StyledPresentRankingContainer>
      <StyledPresentRankingContainerTitle>
        실시간 급상승 선물랭킹
      </StyledPresentRankingContainerTitle>
      <div>
        <RankingTagContainer></RankingTagContainer>
      </div>
      <StyledPrsentRankingDiv>
        <PresentRankingItem
          goods={goods}
          isLoading={isLoading}
          isError={isError}
          isVisible={isVisible}
          showRankingNumber={true}
        ></PresentRankingItem>
      </StyledPrsentRankingDiv>
      <StyledPresenetRankingAddItemBtnDiv>
        <StyledPresenetRankingAddItemBtn onClick={handelToogle}>
          {isVisible ? '닫기' : '더보기'}
        </StyledPresenetRankingAddItemBtn>
      </StyledPresenetRankingAddItemBtnDiv>
    </StyledPresentRankingContainer>
  );
};

export default PresentRankingContainer;
