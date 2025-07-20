import styled from "@emotion/styled";

interface ThemeHeroSectionProps {
    name: string;
    title: string;
    description: string;
    backgroundColor: string;
}

const Hero = styled.section<{ backgroundColor: string }>`
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ theme }) => theme.spacing.spacing7} ${({ theme }) => theme.spacing.spacing4};
  text-align: left;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ThemeName = styled.span`
  ${({ theme }) => theme.typography.label.label1Bold};
  color: ${({ theme }) => theme.color.gray.gray00};
`;

const HeroTitle = styled.h1`
  ${({ theme }) => theme.typography.title.title1Bold};
  color: ${({ theme }) => theme.color.gray.gray00};
`;

const HeroDescription = styled.p`
  ${({ theme }) => theme.typography.body.body1Regular};
  color: ${({ theme }) => theme.color.gray.gray00};
`;

export default function ThemeHeroSection({
    name,
    title,
    description,
    backgroundColor,
}: ThemeHeroSectionProps) {
    return (
        <Hero backgroundColor={backgroundColor}>
            <ThemeName>{name}</ThemeName>
            <HeroTitle>{title}</HeroTitle>
            <HeroDescription>{description}</HeroDescription>
        </Hero>
    );
}
