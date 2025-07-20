import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { getThemeProducts, type ThemeProduct } from "@/apis/theme";
import AsyncBoundary from "@/components/AsyncBoundary";
import { useNavigate } from "react-router";
import { useCallback } from "react";


interface ThemeProductSectionProps {
    themeId: string;
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing6} ${({ theme }) => theme.spacing.spacing4};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing4};
`;

const ProductCard = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray.gray200};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.spacing3};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 6px;
`;

const Brand = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.semantic.textSub};
`;

const Name = styled.span`
  font-weight: bold;
`;

const Price = styled.p`
  font-weight: bold;
`;

const Message = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
  ${({ theme }) => theme.typography.body.body2Regular};
`;

export default function ThemeProductSection({ themeId }: ThemeProductSectionProps) {
    const [products, setProducts] = useState<ThemeProduct[]>([]);
    const [cursor, setCursor] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const loadInitialProducts = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await getThemeProducts(themeId, 0, 10);
            setProducts(res.list);
            setCursor(res.cursor);
            setHasMore(res.hasMoreList);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [themeId]);

    const loadMoreProducts = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await getThemeProducts(themeId, cursor, 10);
            setProducts((prev) => {
                const merged = [...prev, ...res.list];
                const uniqueMap = new Map(merged.map((item) => [item.id, item]));
                return Array.from(uniqueMap.values());
            });
            setCursor(res.cursor);
            setHasMore(res.hasMoreList);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [themeId, cursor, hasMore, loading]);

    useEffect(() => {
        setProducts([]);
        setCursor(0);
        setHasMore(true);
        setError(false);
        loadInitialProducts();
    }, [loadInitialProducts]);

    useEffect(() => {
        if (!hasMore || loading) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreProducts();
            }
        },
            { threshold: 0.1 }
        );

        const currentRef = observerRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [loadMoreProducts, hasMore, loading]);

    return (
        <AsyncBoundary loading={loading} error={error}>
            <Section>
                {products.length === 0 ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "150px" }}>
                        <Message>상품이 없습니다.</Message>
                    </div>
                ) : (
                    <Grid>
                        {products.map((product) => (
                            <ProductCard key={product.id} onClick={() => navigate(`/order/${product.id}`)}>
                                <ProductImage src={product.imageURL} alt={product.name} />
                                <Brand>{product.brandInfo.name}</Brand>
                                <Name>{product.name}</Name>
                                <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
                            </ProductCard>
                        ))}
                    </Grid>
                )}
                <div ref={observerRef} style={{ height: "1px" }} />
            </Section>
        </AsyncBoundary>
    );
}
