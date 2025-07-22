import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types/GiftTheme';
import { ProductList } from '../components/giftTheme/ProductList';
import { fetchThemeProducts } from '../api/themeProducts';

const ThemeProductListPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (!themeId || loading || !hasNext) return;

    setLoading(true);
    try {
      const res = await fetchThemeProducts(Number(themeId), cursor);
      setProducts(prev => [...prev, ...res.products]);
      setCursor(res.nextCursor);
      setHasNext(res.hasNext);
    } catch (err) {
      console.error('상품 로딩 실패:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [themeId, cursor, loading, hasNext]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNext && !loading) {
        loadMore();
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasNext, loading]);

  useEffect(() => {
    setProducts([]);
    setCursor(0);
    setHasNext(true);
    setError(false);
  }, [themeId]);

  useEffect(() => {
    if (products.length === 0 && themeId) {
      loadMore();
    }
  }, [themeId, products.length, loadMore]);

  if (error) return <div>상품을 불러오는 데 실패했습니다.</div>;
  if (products.length === 0 && !loading)
    return <div>등록된 상품이 없습니다.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>상품 목록</h2>
      <ProductList products={products} />
      {loading && <p>불러오는 중...</p>}
      <div ref={observerRef} style={{ height: 1 }} />
    </div>
  );
};

export default ThemeProductListPage;
