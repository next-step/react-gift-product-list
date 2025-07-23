import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/theme/theme';
import { useEffect, useState } from 'react';

import { api } from '@/Api/api';
import LoadingSpinner from './common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Container = styled.section`
  padding: 8px;
`;

const TitleContainer = styled.div`
  padding: 0px 8px 20px;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.6875rem;
  color: ${(props) => props.theme.colorScale.gray900};
  margin: 0px;
  width: 100%;
  text-align: left;
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 4px;
`;

const Category = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  cursor: pointer;
`;

const PresentImage = styled.img`
  max-width: 3.125rem;
  max-height: 3.125rem;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`;

const PresentName = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: ${(props) => props.theme.colorScale.gray900};
  margin: 0px;
  text-align: left;
`;

const LoadingContainer = styled(CategoryContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
`;

interface ThemeItem {
  themeId: number;
  name: string;
  image: string;
}

interface ThemeResponse {
  data: ThemeItem[];
}

const PresentTheme = () => {
  const navigate = useNavigate();
  const [themeList, setThemeList] = useState<ThemeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await api.get<ThemeResponse>('/api/themes');
        setThemeList(res.data.data);
      } catch (error) {
        console.error('테마 불러오기 실패', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchThemes();
  }, []);

  if (!isLoading && (hasError || themeList.length === 0)) {
    return null;
  }

  const handleClick = (id: number) => {
    navigate(`/themes/${id}/products`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TitleContainer>
          <Title>선물 테마</Title>
        </TitleContainer>
        {isLoading ? (
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        ) : (
          <CategoryContainer>
            {themeList.map((t) => (
              <Category key={t.themeId} onClick={() => handleClick(t.themeId)}>
                <PresentImage src={t.image} alt={t.name} />
                <PresentName>{t.name}</PresentName>
              </Category>
            ))}
          </CategoryContainer>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default PresentTheme;
