import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as S from '@/features/Gift/components/TrendRanking/TrendRankingStyle';
import ProductCard from '@/components/ProductCard/ProductCard';
import {
  FilterGender,
  FilterType,
} from '@/features/Gift/components/TrendRanking/TrendRankingFilter';
import {
  useProductsRanking,
  type Gender,
  type Type,
  type Product,
} from '@/features/Gift/hooks/useProductsRanking';

const INITIAL_VISIBLE_COUNT = 6;
const genderList = [
  { label: 'All', icon: 'ALL' },
  { label: '남성이', icon: '👨‍🦰' },
  { label: '여성이', icon: '👩‍🦰' },
  { label: '청소년이', icon: '👦' },
] as const;
const typeList = ['받고 싶어한', '많이 선물한', '위시로 받은'] as const;

const TrendRanking = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedGender = (searchParams.get('gender') ??
    genderList[0].label) as Gender;
  const selectedType = (searchParams.get('type') ?? typeList[0]) as Type;

  const { products, loading, error } = useProductsRanking(
    selectedGender,
    selectedType
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGenderClick = (gender: Gender) => {
    const params = new URLSearchParams(searchParams);
    params.set('gender', gender);
    if (selectedType) params.set('type', selectedType);
    setSearchParams(params, { replace: true });
  };

  const handleTypeSelect = (type: Type) => {
    const params = new URLSearchParams(searchParams);
    params.set('type', type);
    if (selectedGender) params.set('gender', selectedGender);
    setSearchParams(params, { replace: true });
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    navigate(`/order?productId=${product.id}`);
  };

  const handleToggleView = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? INITIAL_VISIBLE_COUNT : products.length);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const prevGender = params.get('gender');
    const prevType = params.get('type');

    const isGenderValid = genderList.some((g) => g.label === selectedGender);
    const isTypeValid = typeList.includes(selectedType as Type);

    if (!isGenderValid) params.set('gender', genderList[0].label);
    if (!isTypeValid) params.set('type', typeList[0]);

    const nextGender = params.get('gender');
    const nextType = params.get('type');

    const isChanged = prevGender !== nextGender || prevType !== nextType;

    if (isChanged) setSearchParams(params, { replace: true });
  }, [searchParams, selectedGender, selectedType, setSearchParams]);

  return (
    <S.Container>
      <S.Title>실시간 급상승 선물랭킹</S.Title>
      <S.GenderTab>
        {genderList.map(({ icon, label }) => (
          <FilterGender
            key={label}
            icon={icon}
            label={label}
            isActive={selectedGender === label}
            onClick={handleGenderClick}
          />
        ))}
      </S.GenderTab>

      <S.TypeTab>
        {typeList.map((label) => (
          <FilterType
            key={label}
            label={label}
            isActive={selectedType === label}
            onClick={handleTypeSelect}
          />
        ))}
      </S.TypeTab>

      {loading && <Loading />}
      {error && <S.ErrorText>에러: {error}</S.ErrorText>}

      {!loading && !error && products.length === 0 && (
        <S.NoProduct>상품이 없습니다.</S.NoProduct>
      )}

      {!loading && !error && products.length !== 0 && (
        <ProductCard
          products={products}
          visibleCount={visibleCount}
          isExpanded={isExpanded}
          onProductSelect={handleProductSelect}
          onToggleView={handleToggleView}
        />
      )}
    </S.Container>
  );
};

export default TrendRanking;
