import styled from '@emotion/styled';

export const StyledPresentThemeCommonP = styled.p`
  ${({ theme }) => theme.typography.title1Bold};
  margin: ${({ theme }) => theme.spacing.spacing3};
`;
