import styled from "@emotion/styled";
import TheHeader from "@/components/layout/TheHeader";
import LoginForm from "@/components/login/LoginForm";
import KakaoLogo from "@/components/UI/KakaoLogo";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  return (
    <>
      <TheHeader />
      <Main>
        <KakaoLogo size={"88px"} />
        <LoginForm />
        <ToastContainer position="bottom-center" autoClose={3000} />
      </Main>
    </>
  );
};

export default LoginPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 44px);
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;
