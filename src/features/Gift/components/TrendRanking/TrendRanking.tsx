import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Loading from '@/components/Loading/Loading';
import * as S from '@/features/Gift/components/TrendRanking/TrendRanking.style';
import ProductCard from '@/components/ProductCard/ProductCard';
import { ROUTE_PATH } from '@/routes/Router';
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

const isValidGender = (value: string): value is Gender =>
  genderList.some((g) => g.label === value);

const isValidType = (value: string): value is Type =>
  typeList.includes(value as Type);

const updateSearchParams = (
  currentParams: URLSearchParams,
  updates: Partial<{ gender: string; type: string }>,
  replace: (params: URLSearchParams, options?: { replace?: boolean }) => void
) => {
  const newParams = new URLSearchParams(currentParams);

  if (updates.gender !== undefined) {
    newParams.set('gender', updates.gender);
  }
  if (updates.type !== undefined) {
    newParams.set('type', updates.type);
  }

  replace(newParams, { replace: true });
};

const TrendRanking = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawGender = searchParams.get('gender');
  const rawType = searchParams.get('type');

  const rawG = rawGender ?? '';
  const selectedGender: Gender = isValidGender(rawG)
    ? rawG
    : genderList[0].label;

  const rawT = rawType ?? '';
  const selectedType: Type = isValidType(rawT) ? rawT : typeList[0];

  const { products, loading, error } = useProductsRanking(
    selectedGender,
    selectedType
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGenderSelect = (gender: Gender) => {
    updateSearchParams(
      searchParams,
      { gender, type: selectedType },
      setSearchParams
    );
  };

  const handleTypeSelect = (label: string) => {
    const type = isValidType(label) ? label : typeList[0];
    updateSearchParams(
      searchParams,
      { type, gender: selectedGender },
      setSearchParams
    );
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    navigate(ROUTE_PATH.ORDER.replace(':productId', String(product.id)));
  };

  const handleToggleView = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? INITIAL_VISIBLE_COUNT : products.length);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const prevGender = params.get('gender');
    const prevType = params.get('type');

    const genderValid = isValidGender(prevGender ?? '');
    const typeValid = isValidType(prevType ?? '');

    if (!genderValid || !typeValid) {
      updateSearchParams(
        searchParams,
        {
          gender: genderValid ? prevGender! : genderList[0].label,
          type: typeValid ? prevType! : typeList[0],
        },
        setSearchParams
      );
    }
  }, [searchParams, setSearchParams]);

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
            onClick={() => handleGenderSelect(label)}
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
      {error && <S.ErrorText>{error}</S.ErrorText>}

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
