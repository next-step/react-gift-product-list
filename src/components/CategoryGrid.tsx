import { css } from '@emotion/react';
import { palette } from '@/styles/theme';
import type { Category } from '@/types';
import { Link } from 'react-router-dom';

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 10px;
  padding: 20px 0;
`;

const itemStyle = css`
  text-align: center;
  font-size: 12px;
  color: ${palette.gray900};

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: block;
    margin: 0 auto 5px;
  }
`;

interface Props {
  items: Category[];
}

export const CategoryGrid = ({ items }: Props) => (
  <div css={gridStyle}>
    {items.map((cat) => (
      <Link
        key={cat.themeId}
        to={`/theme/${cat.themeId}`} 
        css={itemStyle}
        aria-label={cat.name}
      >
        <img src={cat.image} alt={cat.name} />
        {cat.name}
      </Link>
    ))}
  </div>
);
