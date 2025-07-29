import React, { useEffect, useState, useRef, useCallback } from 'react';
import api from '@/api/api';
import styled from '@emotion/styled';
import { ProductCard } from './ProductCard';
import { Typography } from '@/components/common/Typography';

interface ThemeProduct {
  id: number;
  name: string;
  price: { basicPrice: number; sellingPrice: number; discountRate: number; };
  imageURL: string;
  brandInfo: { name: string };
}

export const ProductList: React.FC<{ themeId: number }> = ({ themeId }) => {
  const [products, setProducts] = useState<ThemeProduct[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchPage = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await api.get<{ data: { list: ThemeProduct[]; cursor: number; hasMoreList: boolean } }>(
        `/api/themes/${themeId}/products`,
        { params: { cursor, limit: 10 } }
      );
      const { list, cursor: nextCursor, hasMoreList } = res.data.data;
      setProducts(prev => [...prev, ...list]);
      setCursor(nextCursor);
      setHasMore(hasMoreList);
    } catch (err) {
      console.error('테마별 상품 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  }, [themeId, cursor, hasMore, loading]);

  useEffect(() => { setProducts([]); setCursor(0); setHasMore(true); }, [themeId]);
  useEffect(() => { fetchPage(); }, [fetchPage]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) fetchPage(); }, { rootMargin: '200px' });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchPage]);

  if (!loading && products.length === 0) {
    return (
      <Section>
        <Typography>등록된 상품이 없습니다.</Typography>
      </Section>
    );
  }

  return (
    <>
      <Grid>
        {products.map(p => (
          <ProductCard
            key={p.id}
            image={p.imageURL}
            name={p.name}
            price={p.price.sellingPrice}
            brandName={p.brandInfo.name}
          />
        ))}
      </Grid>
      <div ref={loaderRef} />
      {loading && <Section><Typography>로딩 중…</Typography></Section>}
    </>
  );
};

const Grid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: theme.spacing.spacing3,
}));

const Section = styled.section(({ theme }) => ({
  padding: `${theme.spacing.spacing4} ${theme.spacing.spacing2}`,
  textAlign: 'center',
}));
