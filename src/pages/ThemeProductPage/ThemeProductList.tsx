/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../Home/components/Shared/RankingCard';
import { css } from '@emotion/react';
import theme from '../../styles/theme';

type ProductItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  brand: string;
};

const LIMIT = 10;
const ThemeProductList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const numericThemeId = Number(themeId);
  if (!numericThemeId) {
    navigate('/');
    return null;
  }

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);

  const loadProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get(`/api/themes/${numericThemeId}/products`, {
        params: { cursor, limit: LIMIT },
      });
      console.log('API response:', res.data);

      const { list, cursor: nextCursor, hasMoreList } = res.data.data;

      if (!list || !Array.isArray(list)) {
        console.error('list 데이터가 없거나 배열이 아님');
        setHasMore(false);
        return;
      }

      const parsedProducts = list.map((item: any) => ({
        id: item.id,
        imageUrl: item.imageURL,
        name: item.name,
        price: item.price.sellingPrice,
        brand: item.brandInfo.name,
      }));

      setProducts((prev) => {
        const combined = [...prev, ...parsedProducts];
        const unique = combined.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );
        return unique;
      });

      setCursor(nextCursor);
      setHasMore(hasMoreList);
    } catch (e) {
      console.error('상품 로딩 실패:', e);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore, loading, numericThemeId, navigate]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (!observerRef.current) return;

    if (observerInstance.current) {
      observerInstance.current.disconnect();
    }

    observerInstance.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadProducts();
        }
      },
      { threshold: 1 }
    );

    observerInstance.current.observe(observerRef.current);

    return () => {
      if (observerInstance.current && observerRef.current) {
        observerInstance.current.unobserve(observerRef.current);
      }
    };
  }, [loadProducts, loading, hasMore]);

  if (!products.length && !loading)
    return <div css={emptyStyle}>상품이 없습니다.</div>;

  return (
    <>
      <div css={gridStyle}>
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/order/${item.id}`)}
            css={{ cursor: 'pointer' }}
          >
            <ProductCard
              imageUrl={item.imageUrl}
              brand={item.brand}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
      <div
        ref={observerRef}
        css={css`
          height: 20px;
        `}
      />
      {loading && <div css={loadingStyle}>로딩 중...</div>}
    </>
  );
};

export default ThemeProductList;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing[4]};
  padding: ${theme.spacing[4]};
`;

const loadingStyle = css`
  text-align: center;
  margin: ${theme.spacing[4]} 0;
`;

const emptyStyle = css`
  padding: ${theme.spacing[8]};
  margin-top: ${theme.spacing[12]};
  text-align: center;
  color: ${theme.color.gray.gray700};
`;
