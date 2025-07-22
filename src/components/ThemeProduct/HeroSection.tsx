import type { TypographyType } from '@/theme/tokens';
import styled from '@emotion/styled';

const Wrapper = styled.section`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: rgb(75, 77, 80);
`;

const Margin = styled.div<{ height: string }>(({ height }) => ({
  width: '100%',
  height: height,
  backgroundColor: 'transparent',
}));

const Text = styled.p<{ variant: keyof TypographyType }>(({ theme, variant }) => {
  const { size, weight, lineHeight } = theme.typography[variant];
  return {
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    color: theme.colorScale.gray100,
    margin: '0px',
    textAlign: 'left',
  };
});

const Title = styled.h5<{ variant: keyof TypographyType }>(({ theme, variant }) => {
  const { size, weight, lineHeight } = theme.typography[variant];
  return {
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    color: theme.colorScale.gray00,
    margin: '0px',
    textAlign: 'left',
  };
});

const HeroSection = () => {
  return (
    <>
      <Wrapper>
        <Text variant="subtitle2Bold">가벼운 선물</Text>
        <Margin height="8px" />
        <Title variant="title1Bold">예산은 가볍게, 감동은 무겁게❤️</Title>
        <Margin height="4px" />
        <Text variant="body1Regular">당신의 센스를 뽐내줄 부담 없는 선물</Text>
      </Wrapper>
    </>
  );
};

export default HeroSection;
