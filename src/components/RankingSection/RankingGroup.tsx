import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import RankingFilter from '@/components/RankingSection/RankingFilter';
import RankingSort from '@/components/RankingSection/RankingSort';
import { useState } from 'react';
import { useProductRanking } from '@/hooks/useProductRanking';
import RankingContent from '@/components/RankingSection/RankingContent';

const INITIAL_VISIBLE_COUNT = 6;

const RankingGroup = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [searchParams, setSearchParams] = useSearchParams();

  const targetType = searchParams.get('targetType') || 'ALL';
  const rankType = searchParams.get('rankType') || 'MANY_WISH';

  const productRanking = useProductRanking(targetType, rankType);

  const isExpanded =
    productRanking.data !== null && visibleCount === productRanking.data.length;

  const toggleVisibleCount = () => {
    if (productRanking.data) {
      setVisibleCount(
        isExpanded ? INITIAL_VISIBLE_COUNT : productRanking.data.length
      );
    }
  };

  const changeTargetType = (value: string) => {
    searchParams.set('targetType', value);
    setSearchParams(searchParams);
  };

  const changeRankType = (value: string) => {
    searchParams.set('rankType', value);
    setSearchParams(searchParams);
  };

  return (
    <Section>
      <Title>실시간 급상승 선물랭킹</Title>
      <RankingFilter selectedFilter={targetType} onSelect={changeTargetType} />
      <RankingSort selectedSort={rankType} onSelect={changeRankType} />
      <RankingContent
        productRanking={productRanking}
        visibleCount={visibleCount}
        toggleVisibleCount={toggleVisibleCount}
        isExpanded={isExpanded}
      />
    </Section>
  );
};

export default RankingGroup;

const Section = styled.section`
  padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[4]}`};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.title.title1Bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
