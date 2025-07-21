import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';

import ProductCard from '@/components/RankingSection/ProductCard';
import CardGrid from '@/components/common/CardGrid';
import { getThemeProductsUrl } from '@/constants/api';

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

const LIMIT = 10;

const ThemeProductList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!themeId || !hasMore || pending) return;
    setPending(true);
    setError(false);
    try {
      const res = await axios.get<{
        data: { list: Product[]; hasMoreList: boolean; cursor: number };
      }>(getThemeProductsUrl(themeId), {
        params: { cursor, limit: LIMIT },
      });

      const {
        list: newProducts,
        hasMoreList,
        cursor: nextCursor,
      } = res.data.data;

      setProducts(prev => {
        const merged = [...prev, ...newProducts];
        const unique = Array.from(new Map(merged.map(p => [p.id, p])).values());
        return unique;
      });
      setHasMore(hasMoreList);
      setCursor(nextCursor);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }, [themeId, cursor, hasMore, pending]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (!hasMore || pending) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchProducts();
        }
      },
      { threshold: 1 }
    );
    const el = observerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetchProducts, hasMore, pending]);

  if (error) return <ErrorText>상품 정보를 불러오지 못했어요.</ErrorText>;
  if (!pending && products.length === 0)
    return <EmptyText>상품이 없습니다.</EmptyText>;

  return (
    <Wrapper>
      <CardGrid>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            {...product}
            rank={index + 1}
            hideRank
          />
        ))}
      </CardGrid>
      {pending && <LoadingText>상품을 불러오는 중...</LoadingText>}
      {hasMore && <ObserverTarget ref={observerRef} />}
    </Wrapper>
  );
};

export default ThemeProductList;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
`;

const LoadingText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
`;

const ErrorText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.color.red[500]};
  text-align: center;
`;

const EmptyText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.color.gray[500]};
  text-align: center;
`;

const ObserverTarget = styled.div`
  height: 1px;
`;
