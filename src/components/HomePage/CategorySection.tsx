import axiosInstance from '@apis/axiosInstance';
import LoadingSpinner from '@components/common/LoadingSpinner';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
interface GiftTheme {
  themeId: number;
  name: string;
  image: string;
}

const CategorySection = () => {
  const [themes, setThemes] = useState<GiftTheme[]>([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const res = await axiosInstance.get('/themes');
        const data = res.data;
        setThemes(data.data);
      } catch (error) {
        console.error('테마를 불러오는 중 오류 발생: ', error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    loadThemes();
  }, []);

  return (
    <Section>
      <SectionTitle>선물 테마</SectionTitle>
      {loading && (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      )}

      {!loading && !hasError && themes.length > 0 && (
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
