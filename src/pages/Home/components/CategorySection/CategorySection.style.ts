import styled from "@emotion/styled";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`;
export const Title = styled.h1`
  ${({ theme }) => `
    color: ${theme.colors.textDefault};
    font-size: ${theme.typography.title1Bold.fontSize};
    font-weight: ${theme.typography.title1Bold.fontWeight};
    line-height: ${theme.typography.title1Bold.lineHeight};
  `}
  align-self: flex-start;
  margin-left: ${({ theme }) => theme.spacing.spacing5};
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing2}
    ${({ theme }) => theme.spacing.spacing10};
`;
export const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const CategoryImage = styled.img`
  width: 60%;
  border-radius: ${({ theme }) => theme.spacing.spacing2};
`;
export const Text = styled.p`
  margin: ${({ theme }) => theme.spacing.spacing4};
  font-size: ${({ theme }) => theme.typography.body2Regular};
`;
