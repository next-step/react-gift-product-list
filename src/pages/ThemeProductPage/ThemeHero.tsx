import { PATH } from '@/constants/paths';
import { useFetch } from '@/hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string | null;
  backgroundColor: string;
}

const ThemeHero = ({ themeId }: { themeId: string }) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch<ThemeInfo>(
    `http://localhost:3000/api/themes/${themeId}/info`
  );

  if (error) {
    if (error.includes('존재하지 않는 리소스입니다.')) {
      navigate(PATH.ROOT);
      return null;
    }
    return <div>에러가 발생했습니다: {error}</div>;
  }

  if (isLoading || !data) return <div>로딩 중...</div>;

  const theme = data;

  return (
    <StyledSection backgroundColor={theme.backgroundColor || '#aaaaaa'}>
      <h2>{theme.name}</h2>
      <h3>{theme.title}</h3>
      {theme.description && <p>{theme.description}</p>}
    </StyledSection>
  );
};

export default ThemeHero;

const StyledSection = styled.section<{ backgroundColor: string }>`
  padding: 20px;
  text-align: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 8px;
`;
