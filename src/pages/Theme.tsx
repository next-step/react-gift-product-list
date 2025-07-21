import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import NavigationBar from '@/components/navigation-bar/NavigationBar';
import {
  HeroSection,
  Name,
  Title,
  Description,
  Gap,
  LoadingWrapper,
} from '@/components/theme/TopBanner.style';
import { ProductGrid } from '@/components/theme/ThemeGrid.style';
import { FadeLoader } from 'react-spinners';
import { fetchThemeInfo, fetchThemeProducts } from '@/api/themesApi';
import type { ThemeInfo } from '@/types/themeInfo';
import type { ThemeProduct } from '@/types/themeProduct';
import ThemeProductCard from '@/components/theme/ThemeProductCard';

const Theme = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const [products, setProducts] = useState<ThemeProduct[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const loadThemeInfo = useCallback(async () => {
    try {
      const data = await fetchThemeInfo(Number(themeId));
      setThemeInfo(data);
    } catch {
      navigate('/');
    }
  }, [themeId, navigate]);

const loadProducts = useCallback(
  async (cursor: number) => {
    try {
      const res = await fetchThemeProducts(Number(themeId), cursor);
      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const newItems = res.list.filter((item:ThemeProduct) => !ids.has(item.id));
        return [...prev, ...newItems];
      });
      setCursor(res.cursor);
      setHasMore(res.hasMoreList);
    } catch (e) {
      console.error('상품 조회 실패', e);
    }
  },
  [themeId]
);


  useEffect(() => {
    loadThemeInfo();
    loadProducts(0);
  }, [loadThemeInfo, loadProducts]);

  useEffect(() => {
    if (loadingMore || !hasMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoadingMore(true);
        loadProducts(cursor).finally(() => setLoadingMore(false));
      }
    });

    if (lastItemRef.current) {
      observerRef.current.observe(lastItemRef.current);
    }
  }, [cursor, loadProducts, hasMore, loadingMore]);

  if (!themeInfo) {
    return (
      <LoadingWrapper>
        <FadeLoader color="#333" />
      </LoadingWrapper>
    );
  }

  return (
    <Layout>
      <NavigationBar />
      <HeroSection bgColor={themeInfo.backgroundColor}>
        <Name>{themeInfo.name}</Name>
        <Gap />
        <Title>{themeInfo.title}</Title>
        <Gap />
        <Description>{themeInfo.description}</Description>
      </HeroSection>

      <ProductGrid>
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <div key={product.id} ref={isLast ? lastItemRef : null}>
              <ThemeProductCard product={product} />
            </div>
          );
        })}
      </ProductGrid>
    </Layout>
  );
};

export default Theme;
