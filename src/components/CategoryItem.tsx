import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface CategoryItemProps {
  themeId: number;
  name: string;
  image: string;
}

export function CategoryItem({ themeId, name, image }: CategoryItemProps) {
  return (
    <Link to={`/theme/${themeId}`}>
      <Item>
        <Thumb src={image} alt={name} loading="lazy" />
        <Name>{name}</Name>
      </Item>
    </Link>
  );
}

/* ───────── styles ───────── */

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Thumb = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.span`
  margin-top: ${({ theme }) => theme.spacing.spacing2};
  ${({ theme }) => theme.typography.label.label2Regular};
  color: ${({ theme }) => theme.semanticColors.text.default};
`;
