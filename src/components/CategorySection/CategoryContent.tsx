import styled from '@emotion/styled';
import { loading } from '@/components/common/Loading';
import { ERROR_MESSAGES } from '@/constants/validation';
import type { Category } from '@/types/category';

interface Props {
  themes: {
    data: Category[] | null;
    pending: boolean;
    error: boolean;
  };
}

const GRID_MIN_HEIGHT = 250;
const CATEGORY_IMAGE_SIZE = 50;

const CategoryContent = ({ themes }: Props) => {
  if (themes.pending) {
    return (
      <Grid>
        <LoadingWrapper>{loading}</LoadingWrapper>
      </Grid>
    );
  }

  if (themes.error) {
    return <EmptyText>{ERROR_MESSAGES.FAILED_TO_LOAD_THEMES}</EmptyText>;
  }

  if (!themes.data || themes.data.length === 0) {
    return <EmptyText>{ERROR_MESSAGES.NO_THEMES_AVAILABLE}</EmptyText>;
  }

  return (
    <Grid>
      {themes.data.map(theme => (
        <Item key={theme.themeId}>
          <CategoryImage src={theme.image} alt={theme.name} />
          <CategoryText>{theme.name}</CategoryText>
        </Item>
      ))}
    </Grid>
  );
};

export default CategoryContent;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[1]}`};
  min-height: ${GRID_MIN_HEIGHT}px;
`;

const LoadingWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[6]};
`;

const EmptyText = styled.p`
  ${({ theme }) => theme.typography.body.body2Regular};
  color: ${({ theme }) => theme.color.gray[500]};
  text-align: center;
  padding: ${({ theme }) => theme.spacing[6]};
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1]};
  cursor: pointer;
`;

const CategoryImage = styled.img`
  width: ${CATEGORY_IMAGE_SIZE}px;
  height: ${CATEGORY_IMAGE_SIZE}px;
  border-radius: 40%;
  object-fit: cover;
`;

const CategoryText = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};
`;
