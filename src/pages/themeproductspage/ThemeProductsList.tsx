import styled from "@emotion/styled";
import { useParams, useNavigate } from "react-router-dom";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import type { Product } from "@/types/api_types";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useEffect, useRef, useState, useCallback } from "react";

type ThemeProductResponse = {
  list: Product[];
  cursor?: string | null;
  hasMoreList?: boolean;
};

export default function ThemeProductsList() {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const handleApiError = useApiErrorHandler({
    fallbackMessage: "상품 정보를 불러오는데 실패했어요.",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);

  const { data, status, error, refetch } = useApiRequest<ThemeProductResponse>({
    url: `/api/themes/${themeId}/products${cursor ? `?cursor=${cursor}` : ""}`,
    manual: true,
  });

  useEffect(() => {
    if (status === "error" && error) {
      handleApiError(error);
    }
  }, [status, error, handleApiError]);

  const loadingNext = status === "loading";

  useEffect(() => {
    setInitLoading(true);
    setProducts([]);
    setCursor(undefined);
    setHasMore(true);
    refetch();
  }, [themeId]);

  useEffect(() => {
    if (!data) return;
    setProducts((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const filtered = data.list.filter((item) => !existingIds.has(item.id));
      return [...prev, ...filtered];
    });
    setCursor(data.cursor ?? null);
    setHasMore(data.hasMoreList !== false && !!data.list.length);
    setInitLoading(false);
  }, [data]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (
        entry.isIntersecting &&
        !loadingNext &&
        hasMore &&
        !initLoading &&
        products.length > 0
      ) {
        refetch();
      }
    },
    [
      loadingNext,
      hasMore,
      initLoading,
      products.length,
      refetch,
      themeId,
      cursor,
    ]
  );

  useEffect(() => {
    if (!observerRef.current) return;
    if (observerInstance.current) observerInstance.current.disconnect();
    observerInstance.current = new window.IntersectionObserver(handleObserver, {
      threshold: 0.4,
    });
    observerInstance.current.observe(observerRef.current);
    return () => {
      observerInstance.current?.disconnect();
    };
  }, [handleObserver]);

  const handleItemClick = (id: number) => {
    navigate(`/order/${id}`);
  };

  if (initLoading) return <LoadingSpinner />;
  if (products.length === 0)
    return <EmptyMessage>상품이 없습니다.</EmptyMessage>;

  return (
    <>
      <List>
        {products.map((product) => (
          <Card key={product.id} onClick={() => handleItemClick(product.id)}>
            <Image src={product.imageURL} alt={product.name} />
            <Name>{product.name}</Name>
            <Brand>{product.brandInfo.name}</Brand>
            <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
          </Card>
        ))}
      </List>
      <ObserverTarget ref={observerRef} />
      {loadingNext && <LoadingSpinner />}
    </>
  );
}

const EmptyMessage = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin-top: 50px;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
`;

const Card = styled.div`
  overflow: hidden;
  text-align: center;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 30px;
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin: 8px 0;
`;

const Brand = styled.div`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin: 8px 0;
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  font-weight: bold;
  margin: 8px 0;
`;

const ObserverTarget = styled.div`
  height: 100px;
  margin-top: 32px;
`;
