import { Typography } from '@/components/common/Typography';
import styled from '@emotion/styled';
import { useState } from 'react';
import { ProductRankingFilter } from './RankingFilter';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { ProductRankingList } from './ProductRankingList';
import { useSearchParams } from 'react-router';
import type { ProductRankingFilterOption } from '@/apis/domain/products/type';
import { getProductRanking } from '@/apis/domain/products/getProductsRanking';
import { useRead } from '@/hooks/useRead';
import { Spinner } from '@/components/common/Spinner';

export const ProductRankingListSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetType = (searchParams.get('targetType') ??
    'ALL') as ProductRankingFilterOption['targetType'];
  const rankType = (searchParams.get('rankType') ??
    'MANY_WISH') as ProductRankingFilterOption['rankType'];

  const [filterOption, setFilterOption] = useState<ProductRankingFilterOption>({
    targetType,
    rankType,
  });

  const { isLoading, data, refetch } = useRead({
    fetch: getProductRanking,
    initFetchParams: {
      targetType: filterOption.targetType,
      rankType: filterOption.rankType,
    },
  });

  const handleFilterOptionChange = (option: ProductRankingFilterOption) => {
    setFilterOption(option);

    refetch({
      targetType: option.targetType,
      rankType: option.rankType,
    });

    searchParams.set('targetType', option.targetType);
    searchParams.set('rankType', option.rankType);
    setSearchParams(searchParams, {
      replace: true,
    });
  };

  const productList = data?.data ?? [];

  return (
    <Section>
      <Typography as='h3' variant='title1Bold' color='default' width='100%'>
        실시간 급상승 선물랭킹
      </Typography>
      <HorizontalSpacing size='spacing5' />
      <ProductRankingFilter option={filterOption} onOptionChange={handleFilterOptionChange} />
      <HorizontalSpacing size='spacing4' />
      {isLoading ? (
        <LoadingWrapper>
          <Spinner size='large' color='kakaoBrown' />
        </LoadingWrapper>
      ) : (
        <ProductRankingList productList={productList} />
      )}
    </Section>
  );
};

const Section = styled.section(({ theme }) => ({
  padding: `0 ${theme.spacing.spacing4}`,
  width: '100%',
}));

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
`;
