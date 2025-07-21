import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "@/styles/ThemeProductStyles";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Navigation } from "@/components/header/Navigation";
import { Spinner } from "@/components/common/Spinner";
import { fetchThemeInfo, fetchThemeProducts } from "@/api/theme";
import { PATH } from "@/constants/path";
import { useIntersect } from "@/hooks/useIntersect";
import type { ProductSummary } from "@/api/product";

interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const ThemeProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<ThemeInfo | null>(null);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadThemeInfo = useCallback(async () => {
    try {
      const data = await fetchThemeInfo(Number(id));
      setTheme(data);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        navigate(PATH.HOME, { replace: true });
      }
    }
  }, [id, navigate]);

  const loadProducts = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const data = await fetchThemeProducts(Number(id), cursor, 10);
      setProducts(prev => [...prev, ...data.list]);
      setCursor(data.cursor);
      setHasMore(data.hasMoreList);
    } catch {
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [cursor, hasMore, isLoadingMore, id]);

  useEffect(() => {
    const init = async () => {
      await Promise.all([loadThemeInfo(), loadProducts()]);
      setLoading(false);
    };
    init();
  }, [loadThemeInfo, loadProducts]);

  const observerRef = useIntersect<HTMLDivElement>(loadProducts, hasMore);

  if (loading) return <Spinner size={48} withWrapper />;

  return (
    <PageLayout>
      <PageContainer>
        <Navigation />

        {theme && (
          <S.HeroSection bgColor={theme.backgroundColor}>
            <S.ThemeLabel>{theme.name}</S.ThemeLabel>
            <S.ThemeTitle>{theme.title}</S.ThemeTitle>
            <S.ThemeDescription>{theme.description}</S.ThemeDescription>
          </S.HeroSection>
        )}

        <S.Section>
          {products.length === 0 ? (
            <S.EmptyBox>상품이 없습니다.</S.EmptyBox>
          ) : (
            <S.ProductList>
              {products.map((item, index) => {
                const isLast = index === products.length - 1;
                return (
                  <S.ProductCard key={item.id}>
                    {isLast ? (
                      <div ref={observerRef}>
                        <S.ProductImage src={item.imageURL} alt={item.name} />
                        <S.ProductName>{item.name}</S.ProductName>
                        <S.ProductBrand>{item.brandInfo.name}</S.ProductBrand>
                        <S.ProductPrice>
                          {item.price.sellingPrice.toLocaleString()}원
                        </S.ProductPrice>
                      </div>
                    ) : (
                      <>
                        <S.ProductImage src={item.imageURL} alt={item.name} />
                        <S.ProductName>{item.name}</S.ProductName>
                        <S.ProductBrand>{item.brandInfo.name}</S.ProductBrand>
                        <S.ProductPrice>
                          {item.price.sellingPrice.toLocaleString()}원
                        </S.ProductPrice>
                      </>
                    )}
                  </S.ProductCard>
                );
              })}
            </S.ProductList>
          )}
          {hasMore && isLoadingMore && <Spinner size={32} withWrapper />}
        </S.Section>
      </PageContainer>
    </PageLayout>
  );
};

export default ThemeProduct;
