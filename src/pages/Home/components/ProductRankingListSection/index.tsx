// import { Typography } from '@/components/common/Typography';
// import type { ProductRankingFilterOption } from '@/types/products';
// import styled from '@emotion/styled';
// import { useState } from 'react';
// import { ProductRankingFilter } from './RankingFilter';
// import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
// import { ProductRankingList } from './ProductRankingList';
// import { useSearchParams } from 'react-router-dom';

// export const ProductRankingListSection = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const targetType = (searchParams.get('targetType') ??
//     'ALL') as ProductRankingFilterOption['targetType'];
//   const rankType = (searchParams.get('rankType') ??
//     'MANY_WISH') as ProductRankingFilterOption['rankType'];

//   const [filterOption, setFilterOption] = useState<ProductRankingFilterOption>({
//     targetType,
//     rankType,
//   });

//   const handleFilterOptionChange = (option: ProductRankingFilterOption) => {
//     setFilterOption(option);

//     searchParams.set('targetType', option.targetType);
//     searchParams.set('rankType', option.rankType);
//     setSearchParams(searchParams, {
//       replace: true,
//     });
//   };

//   return (
//     <Section>
//       <Typography as='h3' variant='title1Bold' color='default' width='100%'>
//         실시간 급상승 선물랭킹
//       </Typography>
//       <HorizontalSpacing size='spacing5' />
//       <ProductRankingFilter option={filterOption} onOptionChange={handleFilterOptionChange} />
//       <HorizontalSpacing size='spacing4' />
//       <ProductRankingList />
//     </Section>
//   );
// };

// const Section = styled.section(({ theme }) => ({
//   padding: `0 ${theme.spacing.spacing4}`,
//   width: '100%',
// }));

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import styled from '@emotion/styled';
import { Typography } from '@/components/common/Typography';
import { ProductRankingFilter } from './RankingFilter';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import ProductRankingList from './ProductRankingList';
import type { ProductData, ProductRankingFilterOption } from '@/types/products';

const ProductRankingListSection: React.FC = () => {
  // 필터 상태 관리
  const [filterOption, setFilterOption] = useState<ProductRankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  // API 데이터 & 상태
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading]   = useState<boolean>(true);
  const [error, setError]       = useState<boolean>(false);

  // 랭킹 조회 함수
  const fetchRanking = () => {
    setLoading(true);
    setError(false);
    axios
      .get<{ data: ProductData[] }>('/api/products/ranking', { params: filterOption })
      .then((res: AxiosResponse<{ data: ProductData[] }>) => {
        setProducts(res.data.data ?? []);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.error('랭킹 조회 실패:', err);
        setError(true);
        setLoading(false);
      });
  };

  // 필터가 바뀔 때마다 재조회
  useEffect(fetchRanking, [filterOption]);

  return (
    <Section>
      <Typography as="h3" variant="title1Bold" color="default">
        실시간 급상승 선물랭킹
      </Typography>
      <HorizontalSpacing size="spacing5" />

      <ProductRankingFilter
        option={filterOption}
        onOptionChange={opt => setFilterOption(opt)}
      />

      <HorizontalSpacing size="spacing4" />

      {loading && (
        <Typography as="p" variant="body1Regular" color="default">
          로딩 중…
        </Typography>
      )}

      {!loading && error && (
        <Typography as="p" variant="body1Regular" color="default">
          랭킹을 불러오는 중 오류가 발생했습니다.
        </Typography>
      )}

      {!loading && !error && products.length === 0 && (
        <Typography as="p" variant="body1Regular" color="default">
          현재 급상승 선물이 없습니다.
        </Typography>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductRankingList products={products} />
      )}
    </Section>
  );
};

export default ProductRankingListSection;

const Section = styled.section(({ theme }) => ({
  padding: `0 ${theme.spacing.spacing4}`,
  width: '100%',
}));
