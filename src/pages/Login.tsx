import { Navigation } from "@/components/header/Navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { LoginForm } from "@/components/login/LoginForm";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const redirectPath = location.state?.from?.pathname || "/";

  const handleLoginSuccess = (email: string) => {
    login({ id: email, email });
    navigate(redirectPath, { replace: true });
  };

  return (
    <PageContainer>
      <Navigation />
      <Container>
        <Logo src="/assets/kakao_logo.svg" alt="카카오 로고" />
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          pauseOnHover
          closeOnClick
        />
      </Container>
    </PageContainer>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 9rem;
  margin-bottom: ${({ theme }) => theme.spacing.spacing7};
`;
