/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import type { ThemeInfo } from '../../types/GiftTheme';

const HeroWrapper = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 1.625rem 1rem 1.375rem;
  box-sizing: border-box;
  color: white;
  background-repeat: no-repeat;
`;

const HeroName = styled.p`
  font-size: ${({ theme }) =>
    theme.typography.subtitle2Bold.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.subtitle2Bold.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.subtitle2Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray100};
`;

const HeroTitle = styled.h5`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.title1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray00};
  margin-top: 8px;
`;

const HeroDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray200};
  margin-top: 4px;
`;

export const HeroSection = ({
  themeInfo,
}: {
  themeInfo: ThemeInfo;
}) => {
  return (
    <HeroWrapper
      style={{ backgroundColor: themeInfo.backgroundColor }}
    >
      <HeroName>{themeInfo.name}</HeroName>
      <HeroTitle>{themeInfo.title}</HeroTitle>
      <HeroDescription>{themeInfo.description}</HeroDescription>
    </HeroWrapper>
  );
};
