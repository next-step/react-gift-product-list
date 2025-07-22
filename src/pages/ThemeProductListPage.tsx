import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { type Product, type ThemeInfo } from '../types/GiftTheme';
import { ProductList } from '../components/giftTheme/ProductList';
import { fetchThemeProducts } from '../api/themeProducts';
import { HeroSection } from '../components/giftTheme/HeroSection';
import { fetchThemeInfo } from '../api/themeInfo';
import { Header } from '../components/common/Header';

const ThemeProductListPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);

  const loadMore = useCallback(async () => {
    if (!themeId || loading || !hasNext) return;

    setLoading(true);
    try {
      const res = await fetchThemeProducts(Number(themeId), cursor);
      setProducts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const newProducts = res.products.filter(
          p => !existingIds.has(p.id)
        );
        return [...prev, ...newProducts];
      });
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

  useEffect(() => {
    const loadThemeInfo = async () => {
      try {
        const res = await fetchThemeInfo(Number(themeId));
        setThemeInfo(res);
      } catch (err) {
        console.error('테마 정보 로딩 실패:', err);
        setError(true);
      }
    };

    if (themeId) {
      loadThemeInfo();
    }
  }, [themeId]);

  if (error) return <div>상품을 불러오는 데 실패했습니다.</div>;

  return (
    <>
      <Header />
      {themeInfo && <HeroSection themeInfo={themeInfo} />}{' '}
      <ProductList products={products} />
      {loading && <p>불러오는 중...</p>}
      <div ref={observerRef} style={{ height: 1 }} />
    </>
  );
};

export default ThemeProductListPage;
