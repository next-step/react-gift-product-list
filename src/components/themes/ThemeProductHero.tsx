import { useGetThemeDetail } from "@/hooks/themes/useGetThemeDetail";
import styled from "@emotion/styled";

const ThemeProductContainer = styled.div<{ backgroundColor?: string }>(
  ({ theme, backgroundColor }) => ({
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing6} ${theme.spacing4} ${theme.spacing5}`,
    height: "128px",
    backgroundColor: backgroundColor || theme.color.gray[0],
  }),
);

const ThemeProductName = styled.p(({ theme }) => ({
  fontSize: `${theme.typography.title2Bold.fontSize}`,
  fontWeight: `${theme.typography.title2Bold.fontWeight}`,
  lineHeight: `${theme.typography.title2Bold.lineHeight}`,
  color: `${theme.color.gray[0]}`,
}));

const ThemeProductTitle = styled.h5(({ theme }) => ({
  fontSize: `${theme.typography.title1Bold.fontSize}`,
  fontWeight: `${theme.typography.title1Bold.fontWeight}`,
  lineHeight: `${theme.typography.title1Bold.lineHeight}`,
  color: `${theme.color.gray[0]}`,
}));

const ThemeProductDescription = styled.p(({ theme }) => ({
  fontSize: `${theme.typography.body1Regular.fontSize}`,
  fontWeight: `${theme.typography.body1Regular.fontWeight}`,
  lineHeight: `${theme.typography.body1Regular.lineHeight}`,
  color: `${theme.color.gray[0]}`,
}));

interface ThemeProductHeroProps {
  themeId: number;
}

export const ThemeProductHero = ({ themeId }: ThemeProductHeroProps) => {
  const { data: themeInfo } = useGetThemeDetail(themeId);

  return (
    <ThemeProductContainer backgroundColor={themeInfo?.backgroundColor}>
      <ThemeProductName>{themeInfo?.name}</ThemeProductName>
      <ThemeProductTitle>{themeInfo?.title}</ThemeProductTitle>
      <ThemeProductDescription>
        {themeInfo?.description}
      </ThemeProductDescription>
    </ThemeProductContainer>
  );
};
