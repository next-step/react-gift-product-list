import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Navigation } from "@/components/header/Navigation";
import { Spinner } from "@/components/common/Spinner";
import { fetchThemeInfo } from "@/api/theme"; 
import { PATH } from "@/constants/path";


interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const ThemeProductsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const loadThemeInfo = useCallback(async () => {
    try {
      const data = await fetchThemeInfo(Number(id));
      setTheme(data);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        navigate(PATH.HOME, { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadThemeInfo();
  }, [loadThemeInfo]);

  if (loading) 
    return <Spinner size={48} withWrapper />;

  return (
    <PageLayout>
      <PageContainer>
        <Navigation />
        {theme && (
          <HeroSection bgColor={theme.backgroundColor}>
            <ThemeLabel>{theme.name}</ThemeLabel>
            <ThemeTitle>{theme.title}</ThemeTitle>
            <ThemeDescription>{theme.description}</ThemeDescription>
          </HeroSection>
        )}
      </PageContainer>
    </PageLayout>
  );
};

export default ThemeProductsPage;

const HeroSection = styled.section<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 25px 20px;
  border-radius: 8px;
`;

const ThemeLabel = styled.p`
  ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.colors.textDefault};
  margin-bottom: 10px;
`;

const ThemeTitle = styled.h2`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.textDefault};
  margin: 0 0 5px;
`;

const ThemeDescription = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.textDefault};
  margin: 0;
`;