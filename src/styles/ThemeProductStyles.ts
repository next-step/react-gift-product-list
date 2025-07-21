import styled from "@emotion/styled";

export const HeroSection = styled.section<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 24px 16px;
  border-radius: 5px;
`;

export const ThemeLabel = styled.p`
  ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.colors.gray00};
  margin-bottom: 8px;
`;

export const ThemeTitle = styled.h2`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.gray00};
  margin: 0 0 5px;
`;

export const ThemeDescription = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.gray00};
  margin: 0;
`;

export const Section = styled.section`
  margin-top: 5px;
`;

export const EmptyBox = styled.div`
  text-align: center;
  padding: 40px 0;
  color: ${({ theme }) => theme.colors.gray800};
  ${({ theme }) => theme.typography.body1Regular};
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;

export const ProductCard = styled.li`
  border-radius: 5px;
  padding: 15px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const ProductName = styled.p`
  ${({ theme }) => theme.typography.body2Bold};
  color: ${({ theme }) => theme.colors.textDefault};
  margin: 9px 0 4px;
`;

export const ProductBrand = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.textSub};
  margin: 0;
`;

export const ProductPrice = styled.p`
  ${({ theme }) => theme.typography.body1Bold};
  color: ${({ theme }) => theme.colors.textDefault};
  margin: 3px 0 0;
`;