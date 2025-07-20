import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

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
      setLoading(false);
    }
  }, [cursor, hasMore, isLoadingMore, id]);

  useEffect(() => {
    loadThemeInfo();
  }, [loadThemeInfo]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const observerRef = useIntersect<HTMLDivElement>(() => {
  if (!isLoadingMore && hasMore) {
    loadProducts();
  }
}, hasMore);

  if (loading) return <Spinner size={48} withWrapper />;

  return (
    <PageLayout>
      <PageContainer>
        <Navigation />

        {theme && (
          <HeroSection bgColor={theme.backgroundColor}>
            <ThemeLabel>{theme.name}</ThemeLabel>
            <ThemeTitle>{theme.title}</ThemeTitle>
            <ThemeDescription>{theme.description}</ThemeDescription>
          </HeroSection>
        )}

        <Section>
          {products.length === 0 ? (
            <EmptyBox>상품이 없습니다.</EmptyBox>
          ) : (
            <ProductList>
              {products.map((item, index) => {
                const isLast = index === products.length - 1;
                return (
                  <ProductCard key={item.id}>
                    {isLast ? (
                      <div ref={observerRef}>
                        <ProductImage src={item.imageURL} alt={item.name} />
                        <ProductName>{item.name}</ProductName>
                        <ProductBrand>{item.brandInfo.name}</ProductBrand>
                        <ProductPrice>
                          {item.price.sellingPrice.toLocaleString()}원
                        </ProductPrice>
                      </div>
                    ) : (
                      <>
                        <ProductImage src={item.imageURL} alt={item.name} />
                        <ProductName>{item.name}</ProductName>
                        <ProductBrand>{item.brandInfo.name}</ProductBrand>
                        <ProductPrice>
                          {item.price.sellingPrice.toLocaleString()}원
                        </ProductPrice>
                      </>
                    )}
                  </ProductCard>
                );
              })}
            </ProductList>
          )}
        </Section>
      </PageContainer>
    </PageLayout>
  );
};

export default ThemeProduct;

const HeroSection = styled.section<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 24px 16px;
  border-radius: 5px;
`;

const ThemeLabel = styled.p`
  ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.colors.gray00};
  margin-bottom: 8px;
`;

const ThemeTitle = styled.h2`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.gray00};
  margin: 0 0 5px;
`;

const ThemeDescription = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.gray00};
  margin: 0;
`;

const Section = styled.section`
  margin-top: 5px;
`;

const EmptyBox = styled.div`
  text-align: center;
  padding: 40px 0;
  color: ${({ theme }) => theme.colors.gray800};
  ${({ theme }) => theme.typography.body1Regular};
`;

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;

const ProductCard = styled.li`
  border-radius: 5px;
  padding: 15px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductName = styled.p`
  ${({ theme }) => theme.typography.body2Bold};
  color: ${({ theme }) => theme.colors.textDefault};
  margin: 9px 0 4px;
`;

const ProductBrand = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.textSub};
  margin: 0;
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.typography.body1Bold};
  color: ${({ theme }) => theme.colors.textDefault};
  margin: 3px 0 0;
`;
