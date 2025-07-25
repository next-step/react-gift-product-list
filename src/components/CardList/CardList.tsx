import { Grid } from "@/components/CardList/CardList.style";
import Card from "@/components/Card/Card";
import type { CardItem } from "@/types/DTO/productDTO";
import type { RefObject } from "react";

interface CardListProps {
  cards: CardItem[];
  showRank?: boolean;
  onCardClick?: (id: number) => void;
  lastCardRef?: RefObject<HTMLDivElement | null>;
}

export default function CardList({
  cards,
  onCardClick,
  showRank,
  lastCardRef,
}: CardListProps) {
  return (
    <Grid>
      {cards.map((card, idx) => (
        <Card
          key={card.id}
          rank={showRank ? idx + 1 : undefined}
          imageUrl={card.imageUrl}
          brand={card.brand}
          name={card.name}
          price={card.price}
          onClick={onCardClick ? () => onCardClick(card.id) : undefined}
        />
      ))}
      {lastCardRef && <div ref={lastCardRef} />}
    </Grid>
  );
}
