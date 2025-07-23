import styled from '@emotion/styled';

interface ColorProps {
  background?: string;
}

export const StyledThemesProductLabelItem = styled.div<ColorProps>`
  background-color: ${({ background }) => background};
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;

  p {
    margin: 3px 10px 0px 10px;
  }
`;

export const StyledThemesProductPaddingContainer = styled.div`
  width: 100%;
  padding: 4px 16px;
  background-color: white;
`;

export const StyledThemesProductGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 5px;
`;
