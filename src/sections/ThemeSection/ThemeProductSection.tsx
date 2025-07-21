import styled from "@emotion/styled";
import { useEffect, useRef, useState, useCallback, memo, useMemo } from "react";
import { getThemeProducts, type ThemeProduct, DEFAULT_THEME_PRODUCT_LIMIT } from "@/apis/theme";
import { useNavigate } from "react-router";
import Spinner from "@/components/Spinner";


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
  cursor: pointer;
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

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const ProductCardComponent = memo(function ProductCardComponent({
    product,
    onClick,
}: {
    product: ThemeProduct;
    onClick: () => void;
}) {
    return (
        <ProductCard onClick={onClick}>
            <ProductImage src={product.imageURL} alt={product.name} />
            <Brand>{product.brandInfo.name}</Brand>
            <Name>{product.name}</Name>
            <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        </ProductCard>
    );
});

export default function ThemeProductSection({ themeId }: ThemeProductSectionProps) {
    const [products, setProducts] = useState<ThemeProduct[]>([]);
    const [cursor, setCursor] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const handleClick = useCallback(
        (id: number) => () => {
            navigate(`/order/${id}`);
        },
        [navigate]
    );

    const loadInitialProducts = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await getThemeProducts(themeId, 0, DEFAULT_THEME_PRODUCT_LIMIT);
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
            const res = await getThemeProducts(themeId, cursor, DEFAULT_THEME_PRODUCT_LIMIT);
            setProducts((prev) => {
                const prevMap = new Map(prev.map((p) => [p.id, p]));
                const merged = [...prev];

                for (const item of res.list) {
                    if (!prevMap.has(item.id)) {
                        merged.push(item);
                    }
                }
                return merged;
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
        const observer = new IntersectionObserver(
            (entries) => {
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

    const renderedProductCards = useMemo(
        () =>
            products.map((product) => (
                <ProductCardComponent
                    key={product.id}
                    product={product}
                    onClick={handleClick(product.id)}
                />
            )),
        [products, handleClick]
    );

    if (error) {
        return (
            <Section>
                <EmptyWrapper>
                    <Message>문제가 발생했습니다. 다시 시도해 주세요.</Message>
                </EmptyWrapper>
            </Section>
        );
    }
    if (loading && products.length === 0) {
        return (
            <Section>
                <EmptyWrapper>
                    <Spinner />
                </EmptyWrapper>
            </Section>
        );
    }
    if (products.length === 0) {
        return (
            <Section>
                <EmptyWrapper>
                    <Message>상품이 없습니다.</Message>
                </EmptyWrapper>
            </Section>
        );
    }
    return (
        <Section>
            <Grid>{renderedProductCards}</Grid>
            <div ref={observerRef} style={{ height: "20px" }} />
        </Section>
    );
}
