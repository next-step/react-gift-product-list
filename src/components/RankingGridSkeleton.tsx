import { css } from '@emotion/react';
import { GiftCardSkeleton } from './GiftCardSkeleton';
import type { GiftItem } from '@/types';
import { GiftCard } from '@/components/GiftCard';

const grid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px 15px;
  padding-bottom: 50px;
`;

interface Props {
  items: GiftItem[];
  onCardClick: (item: GiftItem) => void;
}

export const RankingGridSkeleton = ({ items, onCardClick }: Props) => (
  <div css={grid}>
    {items.map((item, i) => (
      <GiftCard key={item.id} item={item} rank={i + 1} onCardClick={onCardClick}/>
    ))}
  </div>
);
