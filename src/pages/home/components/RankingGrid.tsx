import styled from "@emotion/styled";
import { useState } from "react";
import { useProductRanking } from "@/hooks/useProductRanking";
import { RankingCard } from "@/pages/home/components/RankingCard";
import { type TabType, type GenderType } from "@/constants/ranking";
import { INITIAL_RANKING_COUNT } from "@/constants/grid";
import { ERROR_MESSAGES } from "@/constants/messages";

type RankingGridProps = {
  gender: GenderType;
  tab: TabType;
};

export const RankingGrid = ({ gender, tab }: RankingGridProps) => {
  const { products, loading, error } = useProductRanking(gender, tab);

  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll
    ? products
    : products.slice(0, INITIAL_RANKING_COUNT);
  const canToggle = products.length > INITIAL_RANKING_COUNT;

  if (error) return null;

  if (loading) {
    return <Placeholder>{ERROR_MESSAGES.PRODUCT.LOAD}</Placeholder>;
  }

  if (products.length === 0) {
    return <Placeholder>{ERROR_MESSAGES.PRODUCT.NONE}</Placeholder>;
  }

  return (
    <>
      <Grid>
        {visibleItems.map((item, idx) => (
          <RankingCard
            key={item.id}
            rank={idx + 1}
            name={item.name}
            imageURL={item.imageURL}
            price={item.price.sellingPrice}
            brandName={item.brandInfo.name}
            brandImageURL={item.brandInfo.imageURL}
            productId={item.id}
          />
        ))}
      </Grid>
      {canToggle && (
        <ToggleButton onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? "접기" : "더보기"}
        </ToggleButton>
      )}
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 12px;
  margin-top: 16px;
`;

const ToggleButton = styled.button`
  margin: 24px auto 0;
  display: block;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #f7f8f9;
  color: #2a3038;
  border: 1px solid #dcdee3;
`;

const Placeholder = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.semantic.text.disabled};
`;
