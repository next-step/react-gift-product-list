import styled from '@emotion/styled';
import LogoImg from '@/Assets/icons/logo.png';
import LoginButton from '@/components/login/LoginButton';

import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useLoginForm } from '@/hooks/useLoginForm';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '@/api/loginApi';
import { toast } from 'react-toastify';

const Container = styled.div`
  width: 100%;
  height: calc(-2.75rem + 100vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.img`
  width: 5.5rem;
  color: rgb(42, 48, 56);
`;

const EmailInput = styled.input`
  width: 60%;
  height: 2.5rem;
  border: none;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.semantic.border.default};
  font-size: 1rem;
`;

const PwInput = styled.input`
  width: 60%;
  height: 2.5rem;
  border: none;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.semantic.border.default};
  font-size: 1rem;
`;
const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.color.red.red700};
  font-size: 0.875rem;
`;

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    isValid,
    handleEmailBlur,
    handlePasswordBlur,
  } = useLoginForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { login: setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const res = await login({ email, password });
      const { authToken, email: userEmail } = res.data;

      const extractedName = userEmail.split('@')[0];

      const userInfo = {
        email: userEmail,
        name: extractedName,
      };

      setUser(userInfo);
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ authToken, email: userEmail, name: extractedName })
      );

      navigate(from, { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          '로그인에 실패했습니다. 이메일 형식이 kakao.com으로 끝나는지 확인해주세요.';
        toast.error(message);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Container>
      <Logo src={LogoImg} alt="로고" />
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <EmailInput
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          autoComplete="off"
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <PwInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          autoComplete="off"
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

        <LoginButton disabled={!isValid} />
      </form>
    </Container>
  );
};

export default LoginForm;
