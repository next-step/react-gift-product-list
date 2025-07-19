import styled from "@emotion/styled";

export const HeroSection = styled.section<{ backgroundColor: string }>`
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ theme }) => theme.spacing[7]};
  box-sizing: border-box;

  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-direction: column;
`;

export const HeroName = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const HeroDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  color: ${({ theme }) => theme.colors.gray[0]};
`;
