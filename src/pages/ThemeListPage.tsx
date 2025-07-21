import styled from '@emotion/styled';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MobileLayout from '@/layouts/MobileLayout';
import NavBar from '@/components/NavBar';
import ThemeHero from '@/components/theme/ThemeHero';
import ThemeList from '@/components/theme/ThemeList';
import useThemeInfo from '@/hooks/useThemeInfo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: #fff;
`;

export default function ThemeListPage() {
  const { themeId } = useParams();
  const parsedId = Number(themeId);
  const navigate = useNavigate();

  const { data: themeInfo, isLoading, hasError } = useThemeInfo(parsedId);

  useEffect(() => {
    if (hasError) {
      navigate('/');
    }
  }, [hasError, navigate]);

  if (isLoading) return <p>loading</p>;
  if (!themeInfo) return null;

  return (
    <MobileLayout>
      <Wrapper>
        <NavBar />

        <ThemeHero
          name={themeInfo.name}
          title={themeInfo.title}
          description={themeInfo.description}
          backgroundColor={themeInfo.backgroundColor}
        />

        <ThemeList />
      </Wrapper>
    </MobileLayout>
  );
}
