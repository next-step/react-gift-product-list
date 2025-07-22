import useFetchThemesProduct from '@/hooks/fetch/useFetchThemesProduct.ts';
import CardList from '@/components/Common/CardItem/CardList.tsx';
import {
  ProductsError,
  ProductsList,
  ProductsLoading,
  ThemeProductsWrapper,
} from '@/components/GiftThema/ThemaItem/ThemeProducts.styles.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import useInfiniteScrollObserver from '@/hooks/useInfiniteScrollObserver.ts';

export default function ThemeProducts({ themeId }: number) {
  const navigate = useNavigate();
  const {
    list: themeProducts,
    loading,
    error,
    hasMore,
    fetchNextPage,
    statusCode,
  } = useFetchThemesProduct(themeId);

  const observerRef = useInfiniteScrollObserver({
    fetchNextPage,
    hasMore,
    loading,
  });

  useEffect(() => {
    if (statusCode === 404) {
      navigate(`${PATH.HOME}`);
    }
  }, [statusCode, navigate]);

  return (
    <ThemeProductsWrapper error={error} product={themeProducts.length}>
      {loading && themeProducts.length === 0 ? (
        <ProductsLoading>로딩 중...</ProductsLoading>
      ) : error || themeProducts.length === 0 ? (
        <ProductsError>상품이 없습니다.</ProductsError>
      ) : (
        <>
          <ProductsList>
            {themeProducts.map((item) => (
              <CardList
                key={item.id}
                image={item.imageURL}
                name={item.name}
                price={item.price.sellingPrice}
                brand={item.brandInfo.name}
              />
            ))}
          </ProductsList>

          <div ref={observerRef} style={{ height: '1px' }} />
        </>
      )}
    </ThemeProductsWrapper>
  );
}
