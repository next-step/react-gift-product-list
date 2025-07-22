import LoadingSpinner from '@components/common/LoadingSpinner';
import styled from '@emotion/styled';
import useFetch from '@hooks/useFetch';
interface GiftTheme {
  themeId: number;
  name: string;
  image: string;
}

const CategorySection = () => {
  const { data: themes, loading, hasError } = useFetch<GiftTheme[]>('/themes');

  return (
    <Section>
      <SectionTitle>선물 테마</SectionTitle>
      {loading && <LoadingSpinner />}

      {!loading && !hasError && themes && themes.length > 0 && (
        <Grid>
          {themes.map((theme: GiftTheme) => (
            <Item key={theme.themeId}>
              <Image src={theme.image} alt={theme.name} />
              <Label>{theme.name}</Label>
            </Item>
          ))}
        </Grid>
      )}
    </Section>
  );
};

export default CategorySection;

const Section = styled.section`
  height: 16.6875rem;
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing3};
`;

const Item = styled.div`
  text-align: center;
`;

const Image = styled.img`
  width: 56px;
  height: 56px;
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray800};
`;
const SectionTitle = styled.div(({ theme }) => ({
  ...theme.typography.label1Bold,
  marginBottom: theme.spacing.spacing3,
}));
