import styled from '@emotion/styled';

export const ThemeHeroContainer = styled.section<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#6366f1'};
  padding: ${({ theme }) => `${theme.spacing.spacing6} ${theme.spacing.spacing4}`};
  color: white;
  position: relative;
`;

export const ThemeName = styled.p`
  ${({ theme }) => theme.typography.label1Bold};
  margin: 0 0 ${({ theme }) => theme.spacing.spacing2} 0;
`;

export const ThemeTitle = styled.h5`
  ${({ theme }) => theme.typography.title1Bold};
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`;

export const ThemeDescription = styled.p`
  ${({ theme }) => theme.typography.subtitle1Regular};
`;
