import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface CategoryItemProps {
  name: string;
  image: string;
  themeId: number;
}

const ItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing1};
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 18px;
`;

const ItemName = styled.span`
  ${({ theme }) => theme.typography.label2Regular};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

export default function CategoryItem({ name, image, themeId }: CategoryItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/themes/${themeId}`);
  };

  return (
    <ItemWrapper onClick={handleClick}>
      <ItemImage src={image} alt={name} />
      <ItemName>{name}</ItemName>
    </ItemWrapper>
  );
}
