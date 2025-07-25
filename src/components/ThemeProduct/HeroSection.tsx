import { getThemeInfo, getThemeList } from '@/Api/api';
import { ROUTE_PATH } from '@/routes/Routes';
import type { TypographyType } from '@/theme/tokens';
import type { ThemeInfo } from '@/types/types';
import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.section`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: rgb(75, 77, 80);
`;

const Margin = styled.div<{ height: string }>(({ height }) => ({
  width: '100%',
  height: height,
  backgroundColor: 'transparent',
}));

const Text = styled.p<{ variant: keyof TypographyType }>(({ theme, variant }) => {
  const { size, weight, lineHeight } = theme.typography[variant];
  return {
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    color: theme.colorScale.gray100,
    margin: '0px',
    textAlign: 'left',
  };
});

const Title = styled.h5<{ variant: keyof TypographyType }>(({ theme, variant }) => {
  const { size, weight, lineHeight } = theme.typography[variant];
  return {
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    color: theme.colorScale.gray00,
    margin: '0px',
    textAlign: 'left',
  };
});

interface Props {
  themeId?: number;
}

const HeroSection = ({ themeId }: Props) => {
  const [theme, setTheme] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        setLoading(true);
        const id = themeId ?? (await getThemeList())[0]?.themeId;

        if (id === undefined) {
          navigate(ROUTE_PATH.HOME, { replace: true });
          return;
        }

        const info = await getThemeInfo(id);
        setTheme(info);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          navigate(ROUTE_PATH.HOME, { replace: true });
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [themeId, navigate]);

  if (loading || !theme) return null;

  return (
    <>
      <Wrapper style={{ backgroundColor: theme.backgroundColor }}>
        <Text variant="subtitle2Bold">{theme.name}</Text>
        <Margin height="8px" />
        <Title variant="title1Bold">{theme.title}</Title>
        <Margin height="4px" />
        <Text variant="body1Regular">{theme.description}</Text>
      </Wrapper>
    </>
  );
};

export default HeroSection;
