import styled from '@emotion/styled';

export const ThemeContainerWrapper = styled.div`
  width: 720px;
  min-width: 720px;
  margin-top: 50px;
  background-color: white;
  border-radius: 8px;
`;

export const ThemeInfoContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  padding: 20px;
  color: white;
`;

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 32px 0;
`;

export const ProductCard = styled.div`
  width: 240px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export const ProductImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
`;

export const ProductName = styled.span`
  ${({ theme }) => `
    font-size: ${theme.typography.subtitle1Regular.fontSize};
    font-weight: ${theme.typography.subtitle1Regular.fontWeight};
    color: ${theme.colors.default};
    margin-bottom: 4px;
  `}
`;
export const ProductBrand = styled.span`
  ${({ theme }) => `
    font-size: ${theme.typography.subtitle1Regular.fontSize};
    color: ${theme.colors.sub};
    margin-bottom: 2px;
  `}
`;

export const ProductPrice = styled.span`
  ${({ theme }) => `
    font-size: ${theme.typography.subtitle1Regular.fontSize};
    font-weight: 700;
    coloe: black;
  `}
`;
