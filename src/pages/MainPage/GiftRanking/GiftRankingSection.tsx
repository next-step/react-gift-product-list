import * as S from './GiftRankingSection.styles';
import ProductItem from './ProductItem';
import { useEffect, useState, useCallback } from 'react';
import FilterGroup from './FilterGroup';
import { useSearchParams } from 'react-router-dom';

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
  const receiverOptions = [
    { text: '전체', apiValue: 'ALL' },
    { text: '여성이', apiValue: 'FEMALE' },
    { text: '남성이', apiValue: 'MALE' },
    { text: '청소년이', apiValue: 'TEEN' },
  ];

  const sortOptions = [
    { text: '받고 싶어한', apiValue: 'MANY_WISH' },
    { text: '많이 선물한', apiValue: 'MANY_RECEIVE' },
    { text: '위시로 받은', apiValue: 'MANY_WISH_RECEIVE' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const initialTargetType = searchParams.get('targetType') || 'ALL';
  const initialRankType = searchParams.get('rankType') || 'MANY_WISH';

  const [selectedTargetType, setSelectedTargetType] = useState<string>(initialTargetType);
  const [selectedRankType, setSelectedRankType] = useState<string>(initialRankType);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSearchParams({
      targetType: selectedTargetType,
      rankType: selectedRankType,
    });
  }, [selectedTargetType, selectedRankType, setSearchParams]);

  const fetchRankingProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/ranking?targetType=${selectedTargetType}&rankType=${selectedRankType}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result && Array.isArray(result.data)) {
        setProducts(result.data);
      } else {
        throw new Error('Unexpected API response structure or no data');
      }
    } catch (err) {
      console.error('Failed to fetch ranking products:', err);
      setError('상품 목록을 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedTargetType, selectedRankType]);

  useEffect(() => {
    fetchRankingProducts();
  }, [fetchRankingProducts]);

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

  return (
    <S.Section>
      <FilterGroup
        items={receivers}
        selected={currentReceiverText}
        onSelect={handleReceiverSelect}
      />
      <FilterGroup items={sorts} selected={currentSortText} onSelect={handleSortSelect} />
      {isLoading ? (
        <S.LoadingMessage>상품 목록을 불러오는 중...</S.LoadingMessage>
      ) : error ? (
        <S.ErrorMessage>{error}</S.ErrorMessage>
      ) : products.length === 0 ? (
        <S.NoProductMessage>보여줄 상품 목록이 없습니다.</S.NoProductMessage>
      ) : (
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
      )}
    </S.Section>
  );
};

export default GiftRankingSection;
