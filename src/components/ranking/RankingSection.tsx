import { useState } from 'react';
import { useSearchParams, useNavigate, generatePath } from 'react-router-dom';
import { Section } from '@/components/layout';
import FilterButtonGroup from './FilterButtonGroup';
import ProductGrid from './ProductGrid';
import MoreButton from './MoreButton';
import { getValidValue, getValidValues } from '@/utils';
import { targetOptions, rankOptions, ROUTE_ORDER } from '@/constants';
import { useRankingProducts } from '@/hooks';
import type { Product, TargetType, RankType } from '@/api/types';
import RankingSkeleton from './RankingSkeleton';

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

  // API 호출 - targetType과 rankType을 각각 전달
  const { data, isLoading, error } = useRankingProducts(targetType, rankType);

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

  const renderContent = () => {
    if (isLoading) {
      return <RankingSkeleton />;
    }

    if (error) {
      return null;
    }

    return (
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
    );
  };

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

      {renderContent()}
    </Section>
  );
};

export default RankingSection;
