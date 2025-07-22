import styled from "@emotion/styled";
import Spacing from "@/components/Spacing";
import type { ThemeInfo } from "@/types/theme";

type ThemeHeaderProps = {
  theme: ThemeInfo;
};

export default function ThemeHeader({ theme }: ThemeHeaderProps) {
  return (
    <HeaderWrapper backgroundColor={theme.backgroundColor}>
      <Name>{theme.name}</Name>
      <Spacing height="8px" />
      <Title>{theme.title}</Title>
      <Spacing height="4px" />
      <Description>{theme.description}</Description>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.section<{ backgroundColor: string }>`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Name = styled.p`
  ${({ theme }) => theme.typography.label1Bold};
  color: ${({ theme }) => theme.colors.gray[100]};
  margin: 0px;
  text-align: left;
`;

const Title = styled.h5`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.gray.white};
  margin: 0px;
  text-align: left;
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.gray[200]};
  margin: 0px;
  text-align: left;
`;
