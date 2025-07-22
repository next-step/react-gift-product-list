import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, generatePath } from 'react-router-dom';
import styled from '@emotion/styled';
import { getThemeInfo } from '@/api/themes';
import type { Theme } from '@/api/types';
import { ROUTE_HOME, ROUTE_ORDER } from '@/constants';
import ProductGrid from '@/components/ranking/ProductGrid';
import { getThemeProducts } from '@/api/themes';
import type { Product } from '@/api/types';
import type { ThemeProductsResponse } from '@/api/themes';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const HeroSection = styled.div<{ bg: string }>`
  background: ${(props) => props.bg};
  color: #fff;
  border-radius: 20px;
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  margin: 2rem 0;
  max-width: 100%;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08);
  text-align: left;
`;

const HeroName = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 8px;
`;

const HeroTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 6px;
`;

const HeroDescription = styled.div`
  font-weight: 400;
  font-size: 15px;
  opacity: 0.95;
`;

const ThemeProductListPage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!themeId) return;
    setLoading(true);
    setError(null);

    // theme 정보 호출
    getThemeInfo(themeId)
      .then((themeData) => {
        setTheme(themeData);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          navigate(ROUTE_HOME, { replace: true });
        } else {
          setError('테마 정보를 불러오지 못했습니다.');
          console.error(err);
        }
      })
      .finally(() => setLoading(false));

    // 상품 목록 호출
    getThemeProducts(themeId)
      .then((productData: ThemeProductsResponse) => {
        setProducts(productData.list);
        setCursor(productData.cursor);
        setHasMore(productData.hasMoreList);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          navigate(ROUTE_HOME, { replace: true });
        } else {
          setError('테마 상품 정보를 불러오지 못했습니다.');
          console.error(err);
        }
      });
  }, [themeId, navigate]);

  const handleProductClick = (product: Product) => {
    navigate(
      generatePath(`${ROUTE_ORDER}/:productId`, {
        productId: String(product.id),
      })
    );
  };

  // 추가 상품 로드 함수
  const fetchMoreProducts = async () => {
    if (!themeId || !hasMore || isFetchingMore) return;
    setIsFetchingMore(true);
    try {
      const data = await getThemeProducts(themeId, cursor ?? undefined);
      setProducts((prev) => [...prev, ...data.list]);
      setCursor(data.cursor);
      setHasMore(data.hasMoreList);
    } catch (err) {
      // 에러 무시(필요시 처리)
    } finally {
      setIsFetchingMore(false);
    }
  };

  const observerRef = useInfiniteScroll({
    onIntersect: fetchMoreProducts,
    enabled: hasMore && !isFetchingMore && !loading,
    rootMargin: '100px',
  });

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!theme) return null;

  return (
    <div>
      {/* 히어로 영역 */}
      <HeroSection bg={theme.backgroundColor}>
        <HeroName>{theme.name}</HeroName>
        <HeroTitle>{theme.title}</HeroTitle>
        <HeroDescription>{theme.description}</HeroDescription>
      </HeroSection>
      {/* 상품 목록 영역 */}
      <ProductGrid
        products={products}
        showMore={true}
        onProductClick={handleProductClick}
      />
      {/* 무한 스크롤 관찰용 div */}
      <div ref={observerRef} style={{ height: 1 }} />
      {isFetchingMore && (
        <div style={{ textAlign: 'center', padding: 16 }}>
          상품을 불러오는 중...
        </div>
      )}
      {!hasMore && !loading && products.length > 0 && (
        <div style={{ textAlign: 'center', color: '#aaa', padding: 16 }}>
          마지막 상품입니다
        </div>
      )}
    </div>
  );
};

export default ThemeProductListPage;
