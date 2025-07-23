import styled from '@emotion/styled';
import type { ThemeIdInfoData } from '..';

interface CardSectionProps {
  themeIdInfo?: ThemeIdInfoData;
}

const CardSection = ({ themeIdInfo }: CardSectionProps) => {
  if (!themeIdInfo) return null;
  return (
    <Section key={themeIdInfo.themeId} bg={themeIdInfo.backgroundColor}>
      <Subtitle2Bold>{themeIdInfo.name}</Subtitle2Bold>
      <Title1Bold>{themeIdInfo.title}</Title1Bold>
      <Body1Regular>{themeIdInfo.description}</Body1Regular>
    </Section>
  );
};

export default CardSection;

const Section = styled.section<{ bg: string }>`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: ${({ bg }) => bg};
`;

const Subtitle2Bold = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Bold.lineHeight};
  color: rgb(247, 248, 249);
  margin: 0;
  text-align: left;
`;

const Body1Regular = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
  color: rgb(243, 244, 245);
  margin: 0px;
  text-align: left;
`;

const Title1Bold = styled.h5`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
  color: rgb(255, 255, 255);
  margin: 0px;
  text-align: left;
`;
