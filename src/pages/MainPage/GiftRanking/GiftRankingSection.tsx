// import { productList } from '@/data/products';
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
  // const repeatedProducts = productList.slice(0, 9);

  const receivers = ['전체', '여성이', '남성이', '청소년이'];
  const sorts = ['받고 싶어한', '많이 선물한', '위시로 받은'];

  const [searchParams, setSearchParams] = useSearchParams();

  const initialReceiver = searchParams.get('receiver') || '전체';
  const initialSort = searchParams.get('sort') || '받고 싶어한';

  const [selectedReceiver, setSelectedReceiver] = useState(initialReceiver);
  const [selectedSort, setSelectedSort] = useState(initialSort);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSearchParams({
      receiver: selectedReceiver,
      sort: selectedSort,
    });
  }, [selectedReceiver, selectedSort, setSearchParams]);

  const mapFilterToApiParam = useCallback((filter: string, type: 'receiver' | 'sort') => {
    if (type === 'receiver') {
      switch (filter) {
        case '전체':
          return 'ALL';
        case '여성이':
          return 'FEMALE';
        case '남성이':
          return 'MALE';
        case '청소년이':
          return 'TEEN';
        default:
          return 'ALL';
      }
    } else {
      switch (filter) {
        case '받고 싶어한':
          return 'MANY_WISH';
        case '많이 선물한':
          return 'MANY_RECEIVE';
        case '위시로 받은':
          return 'MANY_WISH_RECEIVE';
        default:
          return 'MANY_WISH';
      }
    }
  }, []);

  const fetchRankingProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const receiverParam = mapFilterToApiParam(selectedReceiver, 'receiver');
    const sortParam = mapFilterToApiParam(selectedSort, 'sort');

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/ranking?receiver=${receiverParam}&sort=${sortParam}`
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
  }, [selectedReceiver, selectedSort, mapFilterToApiParam]);

  useEffect(() => {
    fetchRankingProducts();
  }, [fetchRankingProducts]);

  return (
    <S.Section>
      <FilterGroup items={receivers} selected={selectedReceiver} onSelect={setSelectedReceiver} />
      <FilterGroup items={sorts} selected={selectedSort} onSelect={setSelectedSort} />
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
