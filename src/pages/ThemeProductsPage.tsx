import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchThemeDetail } from '@/api/theme';
import { fetchThemeProducts } from '@/api/product';
import type { Theme } from '@/types/theme';
import type { Product } from '@/types/product';
import { ROUTE } from '@/constants/routes';
import axios, { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';

const Hero = styled.section<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: ${({ theme }) => theme.spacing.spacing6};
  color: ${({ theme }) => theme.colors.gray.gray00};
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.title1Bold};
  margin-top: ${({ theme }) => theme.spacing.spacing2};
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
`;

const ThemeName = styled.h2`
  ${({ theme }) => theme.typography.body2Bold};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing3};
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.spacing.spacing2};
    margin-bottom: ${({ theme }) => theme.spacing.spacing2};
  }

  div {
    ${({ theme }) => theme.typography.body2Regular};
    color: ${({ theme }) => theme.colors.semantic.textDefault};
  }

  .brand {
    ${({ theme }) => theme.typography.label1Regular};
    color: ${({ theme }) => theme.colors.semantic.textSub};
    margin-bottom: ${({ theme }) => theme.spacing.spacing1};
  }

  .name {
    ${({ theme }) => theme.typography.label1Regular};
  }

  .price {
    ${({ theme }) => theme.typography.body1Bold};
    margin-top: ${({ theme }) => theme.spacing.spacing1};
  }
`;

const EmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing6};
  text-align: center;
  color: ${({ theme }) => theme.colors.semantic.textSub};
`;

const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const [theme, setTheme] = useState<Theme | null>(null);
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef(0);
  const loadingRef = useRef(false);

  const LIMIT = 20;

  useEffect(() => {
    const loadTheme = async () => {
      try {
        if (!themeId) {
          return;
        }
        const data = await fetchThemeDetail(Number(themeId));
        setTheme(data);
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          const status = error.response?.status;
          const msg = error.response?.data?.data?.message || '테마 정보를 불러오지 못했습니다.';

          if (status === HttpStatusCode.NotFound) {
            navigate(ROUTE.MAIN);
          } else {
            toast.error(msg);
          }
        } else {
          toast.error('오류가 발생했습니다.');
        }
      }
    };

    loadTheme();
  }, [themeId, navigate]);

  const loadProducts = async () => {
    if (!themeId || loadingRef.current || !hasMore) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetchThemeProducts({
        themeId: Number(themeId),
        cursor: cursorRef.current,
        limit: LIMIT,
      });

      const seen = new Set(products.map((p) => p.id));
      const newItems = res.list.filter((item) => !seen.has(item.id));

      setProducts((prev) => [...prev, ...newItems]);
      cursorRef.current = res.cursor;
      setHasMore(res.hasMoreList);
    } catch {
      toast.error('상품 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    if (!themeId) {
      return;
    }
    setProducts([]);
    cursorRef.current = 0;
    setHasMore(true);
    loadingRef.current = false;

    setTimeout(() => {
      loadProducts();
    }, 0);
  }, [themeId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          loadProducts();
        }
      },
      {
        threshold: 0.1,
      }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loading]);

  if (!theme) {
    return null;
  }

  return (
    <>
      <Hero bgColor={theme.backgroundColor}>
        <ThemeName>{theme.name}</ThemeName>
        <Title>{theme.title}</Title>
        <Description>{theme.description}</Description>
      </Hero>

      {products.length === 0 && !loading ? (
        <EmptyMessage>상품이 없습니다.</EmptyMessage>
      ) : (
        <>
          <ProductGrid>
            {products.map((item) => (
              <ProductCard key={item.id}>
                <img src={item.imageURL} alt={item.name} />
                <div className="brand">{item.brandInfo.name}</div>
                <div className="name">{item.name}</div>
                <div className="price">{item.price.sellingPrice.toLocaleString()} 원</div>
              </ProductCard>
            ))}
          </ProductGrid>

          <div ref={observerRef} style={{ height: '1px' }} />
          {loading && <Spinner />}
        </>
      )}
    </>
  );
};

export default ThemeProductsPage;
