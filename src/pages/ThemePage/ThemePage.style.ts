import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeroSection = styled.section<{ bgColor: string }>`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.spacing2};
`;

export const ThemeLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray00};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  margin: ${({ theme }) => theme.spacing.spacing2}
    ${({ theme }) => theme.spacing.spacing2};
`;

export const ThemeTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray00};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  margin: ${({ theme }) => theme.spacing.spacing3}
    ${({ theme }) => theme.spacing.spacing2} 0;
`;

export const ThemeDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray00};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: ${({ theme }) => theme.spacing.spacing5};
`;

export const EmptyBox = styled.div`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray1000};
  text-align: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing5};
`;
