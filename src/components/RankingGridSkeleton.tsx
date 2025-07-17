import { css } from '@emotion/react';
import { GiftCardSkeleton } from './GIftCardSkeleton';

const grid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px 15px;
  padding-bottom: 50px;
`;

export const RankingGridSkeleton = () => (
  <div css={grid}>
    {Array.from({ length: 20 }).map((_, i) => (
      <GiftCardSkeleton key={i} />
    ))}
  </div>
);
