import styled from '@emotion/styled';

const HeroWrapper = styled.section<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  color: #fff;
  padding: 26px 16px 22px;
  gap: 4px;
`;

const HeroName = styled.h1`
  ${({ theme }) => theme.typography.label1Bold};
  margin-bottom: 8px;
`;

const HeroTitle = styled.h1`
  ${({ theme }) => theme.typography.title1Bold};
`;

const HeroDescription = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  margin-top: 4px;
`;

interface ThemeHeroProps {
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export default function ThemeHero({ name, title, description, backgroundColor }: ThemeHeroProps) {
  return (
    <HeroWrapper bg={backgroundColor}>
      <HeroName>{name}</HeroName>
      <HeroTitle>{title}</HeroTitle>
      <HeroDescription>{description}</HeroDescription>
    </HeroWrapper>
  );
}
