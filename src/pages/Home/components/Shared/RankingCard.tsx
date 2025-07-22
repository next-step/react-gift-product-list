/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type ProductCardProps = {
  imageUrl: string;
  name: string;
  brand: string;
  price?: number;
  rank?: number;
  onClick?: () => void;
};

const ProductCard = ({
  imageUrl,
  name,
  brand,
  price,
  rank,
  onClick,
}: ProductCardProps) => {
  return (
    <div css={cardStyle} onClick={onClick}>
      {typeof rank === 'number' && <div css={rankBadgeStyle(rank)}>{rank}</div>}
      <img src={imageUrl} alt={name} css={imageStyle} />
      <div css={brandStyle}>{brand}</div>
      <div css={nameStyle}>{name}</div>
      {typeof price === 'number' && (
        <div css={priceStyle}>{price.toLocaleString()}원</div>
      )}
    </div>
  );
};

export default ProductCard;

const cardStyle = css`
  position: relative;
  text-align: center;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;
`;

const rankBadgeStyle = (rank: number) => css`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: ${rank <= 3 ? '#d32f2f' : '#888'};
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const imageStyle = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const brandStyle = css`
  font-size: 12px;
  color: #666;
  margin-top: 6px;
`;

const nameStyle = css`
  font-size: 14px;
  font-weight: 500;
  margin-top: 2px;
`;

const priceStyle = css`
  font-size: 14px;
  font-weight: 700;
  margin-top: 4px;
`;
