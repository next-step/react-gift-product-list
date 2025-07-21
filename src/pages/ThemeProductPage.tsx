import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchThemeInfo, fetchThemeProducts } from '@/api/theme';
import ThemeHeroSection from '@/components/ThemeHeroSection';
import ProductList from '@/components/ProductList';
import type { ThemeInfo } from '@/types/theme';
import type { Product } from '@/types/product';
import Header from '@/components/Header';
import styled from '@emotion/styled';

const PageContainer = styled.div`
  width: 100vw;
  max-width: 720px;
  margin: 0 auto;
  background: #f8f9fa;
  min-height: 100vh;
`;

const ThemeProductPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const [theme, setTheme] = useState<ThemeInfo | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 추가 상품 불러오기
  const loadMore = useCallback(() => {
    if (!themeId || loading || !hasMore) return;
    setLoading(true);
    fetchThemeProducts(Number(themeId), cursor, 10)
      .then((res) => {
        setProducts((prev) => [...prev, ...res.data.list]);
        setCursor(res.data.cursor);
        setHasMore(res.data.hasMoreList);
      })
      .catch(() => setError('상품 목록을 불러올 수 없습니다.'))
      .finally(() => setLoading(false));
  }, [themeId, cursor, loading, hasMore]);

  // 최초 테마 정보 + 첫 상품 목록 불러오기
  useEffect(() => {
    if (!themeId) return;
    setLoading(true);
    fetchThemeInfo(Number(themeId))
      .then((themeRes) => setTheme(themeRes.data))
      .catch(() => setError('테마 정보를 불러올 수 없습니다.'));

    fetchThemeProducts(Number(themeId), 0, 10)
      .then((productsRes) => {
        setProducts(productsRes.data.list);
        setCursor(productsRes.data.cursor);
        setHasMore(productsRes.data.hasMoreList);
        setError(null);
      })
      .catch(() => {
        setError('상품 목록을 불러올 수 없습니다.');
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [themeId]);

  // Intersection Observer로 하단 감지
  useEffect(() => {
    if (!hasMore) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 },
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadMore, hasMore]);

  if (loading && products.length === 0) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;
  if (!theme) return <div>테마 정보를 찾을 수 없습니다.</div>;

  return (
    <PageContainer>
      <Header />
      <ThemeHeroSection theme={theme} />
      <ProductList products={products} />
      {loading && <div>로딩중...</div>}
      <div ref={observerRef} style={{ height: 1 }} />
      {!hasMore && products.length === 0 && <div>상품이 없습니다.</div>}
    </PageContainer>
  );
};

export default ThemeProductPage;
