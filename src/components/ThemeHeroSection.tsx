import styled from '@emotion/styled';
import type { ThemeInfo } from '@/types/theme';

const HeroSection = styled.section<{ bgColor: string }>`
  background: ${({ bgColor }) => bgColor || '#eee'};
  padding: 70px 0 24px 20px;
  text-align: left;
  color: #fff;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Desc = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`;

function ThemeHeroSection({ theme }: { theme: ThemeInfo }) {
  return (
    <HeroSection bgColor={theme.backgroundColor}>
      <Name>{theme.name}</Name>
      <Title>{theme.title}</Title>
      <Desc>{theme.description}</Desc>
    </HeroSection>
  );
}

export default ThemeHeroSection;
