import { getThemeInfo, getThemeList } from '@/Api/api';
import type { TypographyType } from '@/theme/tokens';
import type { ThemeInfo } from '@/types/types';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        setLoading(true);
        const id =
          themeId ??
          (await getThemeList()).filter((t) => t.themeId !== undefined).map((t) => t.themeId)[0];

        if (id === undefined) {
          console.warn('테마 목록이 비어 있습니다.');
          setTheme(null);
          return;
        }

        const info = await getThemeInfo(id);
        setTheme(info);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [themeId]);

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
