import { useState } from 'react';
import {
  CategoryGroup,
  GiftRanKingSection,
  IconWrapper,
  Label,
  PeopleFilterButton,
  PeopleGroup,
  WishFilterButton,
  WishGroup,
} from './GiftRanking.styled';

import GiftRankingList from './GiftRankingList';
import { RankFilterOption, RankType, TargetFilterOption, TargetType } from '@/type/giftRanking';
import {EmptyDiv16h, EmptyDiv20h, Title } from '@/styles/CommomStyle/Common.styled';
import { ProductDiv } from '@/styles/CommomStyle/ProductList';


const GiftRanking = () => {

  const [targetType, settargetType] = useState<TargetType>(TargetType.ALL);
  const [rankType, setrankType] = useState<RankType>(RankType.MANY_WISH);

  const handlePeopleClick = (type: TargetType) => {
    settargetType(type);
  };

  const handleWishClick = (type: RankType) => {
    setrankType(type);
  };

  return (
    <GiftRanKingSection>
      <Title> 실시간 급상승 선물랭킹 </Title>
      <EmptyDiv20h/>
      <CategoryGroup>
        <PeopleGroup>

          {TargetFilterOption.map(({ type, icon, label }) => (
            <PeopleFilterButton
              key={type}
              active={targetType === type}
              onClick={() => handlePeopleClick(type)}
            >
              <IconWrapper>{icon}</IconWrapper>
              <Label>{label}</Label>
            </PeopleFilterButton>
          ))}
        </PeopleGroup>

        <EmptyDiv16h />
        <WishGroup>
          {RankFilterOption.map(({ type, text }) => (
            <WishFilterButton
              key={type}
              active={rankType === type}
              onClick={() => handleWishClick(type)}
            >
              {text}
            </WishFilterButton>
          ))}


        </WishGroup>
      </CategoryGroup>
      <EmptyDiv16h />
      <ProductDiv>
        <GiftRankingList targetType ={targetType} rankType = {rankType} />
      </ProductDiv>
    </GiftRanKingSection>
  );
};

export default GiftRanking;
