import styled from '@emotion/styled';

export const StyledPresentThemeDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: ${({ theme }) => theme.sementicPalette.backgroundDefault};
  width: 720px;

  a {
    text-decoration: none;
  }
`;

export const StyledPresentThemeItemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.spacing2};
`;

export const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 14px;
`;
export const StyledPresentThemeItemP = styled.p`
  ${({ theme }) => theme.typography.label2Regular}
  margin: 2px;
  color: black;
`;
