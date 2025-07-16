import { useNavigate } from 'react-router-dom';
import {
  Container,
  Logo,
  Input,
  LoginButton,
  ErrorMessage,
  InputWrapper,
} from './styles';
import LogoIcon from '@/assets/logo.svg';
import { useLoginForm } from './useLoginForm';
import { PATH } from '@/constants/paths';
import { useLogin } from '@/contexts/LoginContext';
import axios from 'axios';
import { useState } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useLogin();
  const {
    email,
    pw,
    emailError,
    pwError,
    emailTouched,
    pwTouched,
    isValid,
    handleEmailChange,
    handlePwChange,
  } = useLoginForm();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (isValid) {
      try {
        const response = await axios.post('/api/login', {
          email: email,
          password: pw,
        });
        const { email: userEmail, name, authToken } = response.data.data;
        login({ email: userEmail, name, authToken });
        navigate(PATH.HOME, { replace: true });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setLoginError(error.response.data.message || '로그인 실패');
        } else {
          setLoginError('알 수 없는 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <>
      <Container>
        <Logo src={LogoIcon} alt="kakao logo" />
        <InputWrapper>
          <Input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => handleEmailChange(e.currentTarget.value)}
            isError={Boolean(emailError)}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => handlePwChange(e.currentTarget.value)}
            isError={Boolean(pwError)}
          />
          {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
        </InputWrapper>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
        <LoginButton disabled={!(isValid && emailTouched && pwTouched)} onClick={handleLogin}>로그인</LoginButton>
      </Container>
    </>
  );
};

export default LoginPage;
