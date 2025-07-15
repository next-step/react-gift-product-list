import styled from '@emotion/styled';
import Loading from '@/components/common/Loading';
import { useCategoryThemes } from '@/hooks/useCategoryThemes';

const CategorySection = () => {
  const { themes, isLoading, isError } = useCategoryThemes();

  return (
    <Section>
      <TitleWrapper>
        <Title>선물 테마</Title>
      </TitleWrapper>

      {isLoading ? (
        <Grid>
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        </Grid>
      ) : isError ? (
        <EmptyText>테마를 불러오지 못했어요 😢</EmptyText>
      ) : themes.length === 0 ? (
        <EmptyText>테마가 없습니다.</EmptyText>
      ) : (
        <Grid>
          {themes.map(theme => (
            <Item key={theme.themeId}>
              <CategoryImage src={theme.image} alt={theme.name} />
              <CategoryText>{theme.name}</CategoryText>
            </Item>
          ))}
        </Grid>
      )}
    </Section>
  );
};

export default CategorySection;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const TitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[1]}`};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.title.title1Bold};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[1]}`};
  min-height: 250px;
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
  width: 50px;
  height: 50px;
  border-radius: 40%;
  object-fit: cover;
`;

const CategoryText = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};
`;
