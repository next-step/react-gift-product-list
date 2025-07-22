import styled from '@emotion/styled';

export const ThemeInfoWrapper = styled.div``;

export const ThemeInfoHeader = styled.div<{ background: string }>`
  background-color: ${({ background, theme }) => background || theme.colors.gray00};
  color: ${({ theme }) => theme.colors.gray00};
  padding: 30px 20px;

  h2 {
    padding: 10px 0;
  }
`;
