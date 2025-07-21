import styled from "@emotion/styled";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useThemeInfo } from "@/hooks/useThemeInfo";
import { ThemeHero } from "@/pages/themes/components/ThemeHero";

type Props = {
  themeId: number;
};

export const ThemeHeroSection = ({ themeId }: Props) => {
  const { themeInfo, loading, error } = useThemeInfo(themeId);

  if (error) return null;

  if (loading) {
    return <Placeholder>{ERROR_MESSAGES.PRODUCT.LOAD}</Placeholder>;
  }

  if (!themeInfo) {
    return <Placeholder>{ERROR_MESSAGES.THEME.NONE}</Placeholder>;
  }

  return <ThemeHero info={themeInfo} />;
};

const Placeholder = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.semantic.text.disabled};
`;
