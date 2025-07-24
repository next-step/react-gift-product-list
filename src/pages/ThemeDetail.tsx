import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getThemeInfo, getThemeProducts } from '@/apis/theme';
import type { ThemeInfoResponseDTO } from '@/types/DTO/themeDTO';
import type { RankItemType } from '@/types/DTO/productDTO';
import {
  ThemeContainerWrapper,
  ThemeInfoContainer,
  ProductList,
  ProductCard,
  ProductImg,
  ProductName,
  ProductBrand,
  ProductPrice,
} from '@/styles/Theme/ThemeDetail.styled';

function ThemeDetail() {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const [themeInfo, setThemeInfo] = useState<ThemeInfoResponseDTO>();
  const [products, setProducts] = useState<RankItemType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    if (!themeId) return;
    getThemeInfo(Number(themeId))
      .then((data) => setThemeInfo(data))
      .catch((err) => {
        if (err?.response?.status === 404) {
          navigate('/');
        }
      });
  }, [themeId, navigate]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCursor((prev) => prev + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, limit],
  );

  useEffect(() => {
    if (!themeId || !hasMore) return;
    setLoading(true);
    getThemeProducts(Number(themeId), cursor, limit)
      .then((data) => {
        setProducts((prev) => [...prev, ...data.list]);
        setHasMore(data.hasMoreList);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 500);
      });
  }, [themeId, cursor, limit]);

  return (
    <ThemeContainerWrapper>
      {themeInfo ? (
        <ThemeInfoContainer backgroundColor={themeInfo.backgroundColor}>
          <p>{themeInfo.name}</p>
          <p>{themeInfo.title}</p>
          <p>{themeInfo.description}</p>
        </ThemeInfoContainer>
      ) : (
        <p>로딩중...</p>
      )}

      <ProductList>
        {products.length === 0 && !loading && <div>상품이 없습니다.</div>}
        {products.map((item, idx) => (
          <ProductCard
            key={`${item.id}-${idx}`}
            ref={idx === products.length - 1 ? lastProductRef : undefined}
          >
            <ProductImg src={item.imageURL} alt={item.name} />
            <ProductName>{item.name}</ProductName>
            <ProductBrand>{item.brandInfo.name}</ProductBrand>
            <ProductPrice>{item.price.basicPrice}원</ProductPrice>
          </ProductCard>
        ))}
      </ProductList>
      {loading && <div style={{ textAlign: 'center', padding: '16px' }}>로딩중...</div>}
    </ThemeContainerWrapper>
  );
}

export default ThemeDetail;
