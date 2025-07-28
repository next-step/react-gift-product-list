import styled from '@emotion/styled';
import { Navbar } from '@/components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useLoginForm } from '@/hooks/useLoginForm';
import useAuthStore from '@/stores/authStore';
import { useLogIn } from '@/services/login';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { login } = useAuthStore();
  const { request: logIn, isPending } = useLogIn();

  const { emailInput, passwordInput, isFormValid, handleSubmit } = useLoginForm();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    const response = await logIn({ email, password });
    if (response) {
      login(response.authToken, { email: response.email, name: response.name });
      navigate(from, { replace: true });
    } else {
      // 애초에 입력창 조건이 만족하지 않으면 로그인 버튼 자체가 비활성화되는건데, 현재 UI상에서 변화가 없어서 몰랐던 거였구나
      // TODO : 로그인 입력 유효성 검사 만족 못했을때 로그인 버튼 흐리게 표시
      toast.error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Logo>kakao</Logo>
        <Form onSubmit={e => handleSubmit(e, handleLogin)}>
          <Input type="email" placeholder="이메일" {...emailInput.bind} error={emailInput.error} />
          <Input
            type="password"
            placeholder="비밀번호"
            {...passwordInput.bind}
            error={passwordInput.error}
          />
          <LoginButton type="submit" disabled={!isFormValid || isPending}>
            로그인
          </LoginButton>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
`;

const Logo = styled.h1`
  font-size: 34px;
  font-family: 'Kakao', sans-serif;
  margin-bottom: 33px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 13px;
`;

const LoginButton = styled(Button)`
  margin-top: 33px;
`;
