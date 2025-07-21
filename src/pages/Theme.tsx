import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchThemeInfo } from '@/api/themesApi';
import { useApi } from '@/hooks/useApi';
import {HeroSection, Name, Title, Description, Gap,LoadingWrapper} from '@/components/theme/TopBanner.style';
import Layout from '@/components/layout/Layout';
import NavigationBar from '@/components/navigation-bar/NavigationBar';
import { FadeLoader } from 'react-spinners';
import type { ThemeInfo } from '@/types/themeInfo';



const Theme = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const {
    data: themeInfo,
    isLoading,
    hasError,
  } = useApi<ThemeInfo>(() => fetchThemeInfo(Number(themeId)));

  useEffect(() => {
    if (hasError) {
      navigate('/');
    }
  }, [hasError, navigate]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <FadeLoader color="#333" />
      </LoadingWrapper>
    );
  }

  if (!themeInfo) return null;

  return (
    <Layout>
      <NavigationBar />
      <HeroSection bgColor={themeInfo.backgroundColor}>
        <Name>{themeInfo.name}</Name>
        <Gap />
        <Title>{themeInfo.title}</Title>
        <Gap />
        <Description>{themeInfo.description}</Description>
      </HeroSection>

    </Layout>
  );
};

export default Theme;
