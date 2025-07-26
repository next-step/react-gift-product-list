import * as S from './GiftRankingSection.styles';
import ProductItem from '@/components/ProductItem/ProductItem';
import { useEffect, useState, useCallback } from 'react';
import FilterGroup from './FilterGroup';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';

interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

const GiftRankingSection = () => {
  const receivers = ['전체', '여성이', '남성이', '청소년이'];
  const sorts = ['받고 싶어한', '많이 선물한', '위시로 받은'];
  type TargetType = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  type RankType = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

  const receiverOptions: { text: string; apiValue: TargetType }[] = [
    { text: '전체', apiValue: 'ALL' },
    { text: '여성이', apiValue: 'FEMALE' },
    { text: '남성이', apiValue: 'MALE' },
    { text: '청소년이', apiValue: 'TEEN' },
  ];

  const sortOptions: { text: string; apiValue: RankType }[] = [
    { text: '받고 싶어한', apiValue: 'MANY_WISH' },
    { text: '많이 선물한', apiValue: 'MANY_RECEIVE' },
    { text: '위시로 받은', apiValue: 'MANY_WISH_RECEIVE' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const initialTargetType = (searchParams.get('targetType') as TargetType) || 'ALL';
  const initialRankType = (searchParams.get('rankType') as RankType) || 'MANY_WISH';

  const [selectedTargetType, setSelectedTargetType] = useState<TargetType>(initialTargetType);
  const [selectedRankType, setSelectedRankType] = useState<RankType>(initialRankType);

  const url = `http://localhost:3000/api/products/ranking?targetType=${selectedTargetType}&rankType=${selectedRankType}`;
  const { data: products, isLoading, error } = useFetch<Product[]>(url);

  useEffect(() => {
    setSearchParams({
      targetType: selectedTargetType,
      rankType: selectedRankType,
    });
  }, [selectedTargetType, selectedRankType, setSearchParams]);

  const handleReceiverSelect = useCallback((text: string) => {
    const apiValue = receiverOptions.find((opt) => opt.text === text)?.apiValue || 'ALL';
    setSelectedTargetType(apiValue);
  }, []);

  const handleSortSelect = useCallback((text: string) => {
    const apiValue = sortOptions.find((opt) => opt.text === text)?.apiValue || 'MANY_WISH';
    setSelectedRankType(apiValue);
  }, []);

  const currentReceiverText =
    receiverOptions.find((opt) => opt.apiValue === selectedTargetType)?.text || '전체';
  const currentSortText =
    sortOptions.find((opt) => opt.apiValue === selectedRankType)?.text || '받고 싶어한';

  const renderContent = () => {
    if (isLoading) {
      return <S.LoadingMessage>상품 목록을 불러오는 중...</S.LoadingMessage>;
    }

    if (error) {
      return <S.ErrorMessage>{error}</S.ErrorMessage>;
    }

    if (!products || products.length === 0) {
      return <S.NoProductMessage>보여줄 상품 목록이 없습니다.</S.NoProductMessage>;
    }

    return (
      <S.Grid>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            imageURL={product.imageURL}
            sellingPrice={product.price.sellingPrice}
            brandImageURL={product.brandInfo.imageURL}
            brandName={product.brandInfo.name}
          />
        ))}
      </S.Grid>
    );
  };

  return (
    <S.Section>
      <FilterGroup
        items={receivers}
        selected={currentReceiverText}
        onSelect={handleReceiverSelect}
      />
      <FilterGroup items={sorts} selected={currentSortText} onSelect={handleSortSelect} />
      {renderContent()}
    </S.Section>
  );
};

export default GiftRankingSection;
