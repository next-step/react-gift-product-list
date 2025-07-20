import styled from "@emotion/styled";

const HeroSection = () => {
  return (
    <Container>
      <ThemesTitle>선물</ThemesTitle>
      <Title>감동을 높여줄 생일 선물 리스트</Title>
      <Description>예산에 쏙쏙 맞춰 AI가 자동으로 추천드려요!</Description>
    </Container>
  );
};

export default HeroSection;

const Container = styled.section`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: green;
  color: ${({ theme }) => theme.color.gray100};
`;
const ThemesTitle = styled.p`
  font: ${({ theme }) => theme.typography.label1Bold};
`;
const Title = styled.h3`
  font: ${({ theme }) => theme.typography.title1Bold};
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
`;
const Description = styled.p`
  font: ${({ theme }) => theme.typography.body1Regular};
`;
