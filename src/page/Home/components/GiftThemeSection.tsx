import styled from '@emotion/styled';
// import { giftDatas } from '@/data/giftDatas';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/api';
import Loading from '@/components/Loading';

interface ThemeInfo {
  themeId: number;
  name: string;
  image: string;
}

interface ThemesResponse {
  data: ThemeInfo[];
}

const GiftThemeSection = () => {
  const [themes, setThemes] = useState<ThemeInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ThemesResponse>(`${API_BASE_URL}/api/themes`);
        const { data } = response;
        setThemes(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // if (loading) return <Loading />;

  return (
    <section>
      <TitleContainer>
        <Title>선물 테마</Title>
      </TitleContainer>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {themes.map(theme => (
            <Theme key={theme.themeId}>
              <Image alt={theme.name} src={theme.image} />
              <Text>{theme.name}</Text>
            </Theme>
          ))}
        </Container>
      )}
    </section>
  );
};

export default GiftThemeSection;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing4};
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const Theme = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.spacing2};
  cursor: pointer;
`;

const Image = styled.img`
  max-width: 3.125rem;
  max-height: 3.125rem;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: 0px;
  text-align: left;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: 0px;
  width: 100%;
  text-align: left;
`;

const TitleContainer = styled.div`
  padding: 20px 20px;
`;
