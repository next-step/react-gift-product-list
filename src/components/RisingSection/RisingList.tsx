import type { Product } from "@/mocks/types";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApiRequest } from "@/hooks/useApiRequest";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import RisingItem from "@/components/RisingSection/RisingItem";

const INITIAL_VISIBLE_COUNT = 6;

export default function RisingList() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetType = searchParams.get("targetType") ?? "ALL";
  const rankType = searchParams.get("rankType") ?? "MANY_WISH";

  const { data: products, status } = useApiRequest<Product[]>({
    url: "/api/products/ranking",
    params: { targetType, rankType },
  });

  const handleItemClick = (item: Product & { id: number }) => {
    navigate(`/order/${item.id}`);
  };

  if (status === "loading") return <LoadingSpinner />;
  if (status === "error" || !products || products.length === 0) {
    return (
      <Wrapper>
        <EmptyMessage>상품이 없습니다.</EmptyMessage>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Grid>
        {products.slice(0, visibleCount).map((item) => (
          <div key={item.id} onClick={() => handleItemClick(item)}>
            <RisingItem product={item} />
          </div>
        ))}
      </Grid>
      {visibleCount < products.length && (
        <MoreButton onClick={() => setVisibleCount(products.length)}>
          더보기
        </MoreButton>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 14px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const MoreButton = styled.button`
  margin: 16px auto 0;
  display: block;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray600};
  background: ${({ theme }) => theme.colors.default};
  color: ${({ theme }) => theme.colors.gray1000};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  cursor: pointer;
`;

const EmptyMessage = styled.div`
  text-align: center;
  margin: 40px 0;
  color: ${({ theme }) => theme.colors.gray1000};
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
`;
