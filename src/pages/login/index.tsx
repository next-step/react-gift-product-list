import styled from "@emotion/styled";
import LoginFormSection from "@/pages/login/components/LoginFormSection";

export default function LoginPage() {
  return (
    <Wrapper>
      <Title>kakao</Title>
      <LoginFormSection />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px 80px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 48px;
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;
