import { useState } from 'react';
import { useSearchParams, useNavigate, generatePath } from 'react-router-dom';
import { Section } from '@/components/layout';
import FilterButtonGroup from './FilterButtonGroup';
import ProductGrid from './ProductGrid';
import MoreButton from './MoreButton';
import { getValidValue, getValidValues } from '@/utils';
import { targetOptions, rankOptions, ROUTE_ORDER } from '@/constants';
import { useRankingProducts } from '@/hooks';
import styled from '@emotion/styled';
import type { FilterOption, Product } from '@/api/types';

type TargetType = (typeof targetOptions)[number]['value'];
type RankType = (typeof rankOptions)[number]['value'];

// 로딩 스켈레톤 컴포넌트
const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${(props) => props.theme.spacing.spacing4};
  margin-bottom: ${(props) => props.theme.spacing.spacing4};
`;

const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.spacing2};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.gray200};
`;

const SkeletonText = styled.div`
  height: 16px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.gray200};
  width: 80%;
`;

const SkeletonPrice = styled.div`
  height: 20px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.gray200};
  width: 60%;
`;

const RankingSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMore, setShowMore] = useState(false); // 더보기는 URL에 저장하지 않음 (UX 고려)
  const navigate = useNavigate();

  // URL 쿼리 파라미터에서 필터 상태 읽기 및 유효성 검증
  const targetValidValues = getValidValues(targetOptions);
  const rankValidValues = getValidValues(rankOptions);

  const targetParam = searchParams.get('target');
  const rankParam = searchParams.get('rank');

  const targetType = getValidValue(
    targetParam,
    targetValidValues,
    'ALL' as TargetType
  );
  const rankType = getValidValue(
    rankParam,
    rankValidValues,
    'MANY_WISH' as RankType
  );

  // API filter 매핑 - target과 rank를 합쳐서 필터로 변환
  const getFilterFromParams = (): FilterOption => {
    // 현재는 API가 단순 필터만 받으므로 'all'로 고정
    // 향후 API에서 target/rank 조합을 지원하면 이 부분 확장
    return 'all';
  };

  // API 호출
  const { data, isLoading, error } = useRankingProducts(getFilterFromParams());

  // 공통 Parameter Handler로 통합
  const handleParamChange = (key: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(key, value);
      return newParams;
    });
  };

  // 상품 클릭 시 주문 페이지로 이동
  const handleProductClick = (product: Product) => {
    console.log('상품 클릭:', product.id, product.name);

    // 실제 상품 ID를 사용
    navigate(
      generatePath(`${ROUTE_ORDER}/:productId`, {
        productId: String(product.id),
      })
    );
  };

  const renderLoadingSkeleton = () => (
    <LoadingContainer>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonItem key={index}>
          <SkeletonImage />
          <SkeletonText />
          <SkeletonText />
          <SkeletonPrice />
        </SkeletonItem>
      ))}
    </LoadingContainer>
  );

  return (
    <Section title="실시간 급상승 선물랭킹" spacing="md">
      <FilterButtonGroup
        type="target"
        options={targetOptions}
        selected={targetType}
        onChange={(value) => handleParamChange('target', value)}
      />

      <FilterButtonGroup
        type="rank"
        options={rankOptions}
        selected={rankType}
        onChange={(value) => handleParamChange('rank', value)}
      />

      {isLoading ? (
        renderLoadingSkeleton()
      ) : error ? null : ( // 에러시 아무것도 표시하지 않음
        <>
          <ProductGrid
            products={data?.data || []}
            showMore={showMore}
            onProductClick={handleProductClick}
          />

          {data?.data && data.data.length > 6 && (
            <MoreButton onClick={() => setShowMore(!showMore)}>
              {showMore ? '접기' : '더보기'}
            </MoreButton>
          )}
        </>
      )}
    </Section>
  );
};

export default RankingSection;
