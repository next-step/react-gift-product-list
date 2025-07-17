import styled from '@emotion/styled';
import CategoryItem from './CategoryItem';
import { spinner } from './common/Spinner';
import useGiftTheme from '@/hooks/apihooks/useGiftTheme';

const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.spacing.spacing6};
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
  padding: ${({ theme }) => theme.spacing.spacing2};
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.title1Bold};
  padding: 0 8px 20px;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing1};
  cursor: pointer;
`;

const Loading = styled.p`
  padding: 0 8px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function GiftTheme() {
  const { themes, isLoading, hasError } = useGiftTheme();

  if (isLoading) {
    return (
      <Wrapper>
        <Title>선물 테마</Title>
        <Loading>{spinner}</Loading>
      </Wrapper>
    );
  }

  if (hasError || (themes ?? []).length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <Title>선물 테마</Title>
      <Grid>
        {(themes ?? []).map(({ themeId, name, image }) => (
          <CategoryItem key={themeId} name={name} image={image} />
        ))}
      </Grid>
    </Wrapper>
  );
}
