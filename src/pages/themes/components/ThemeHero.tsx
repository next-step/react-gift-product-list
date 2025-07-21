import styled from "@emotion/styled";
import { type ThemeInfo } from "@/api/theme";

type Props = {
  info: ThemeInfo;
};

export const ThemeHero = ({ info }: Props) => {
  return (
    <HeroWrapper style={{ backgroundColor: info.backgroundColor }}>
      <Name>{info.name}</Name>
      <Title>{info.title}</Title>
      <Description>{info.description}</Description>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.section`
  padding: 32px 20px 24px;
  color: #ffffff;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.4;
`;
