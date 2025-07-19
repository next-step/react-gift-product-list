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
import { toast } from 'react-toastify';
import { EMAIL_POSSIBLE, ERROR_OCCURRED_MESSAGE } from './constants';
import useApi from '@/apis/useApi';
import { type LoginResponse } from './types';
import { isAxiosError } from 'axios';

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

  const { execute: loginApi } = useApi<LoginResponse, { email: string; password: string }>(
    'post',
    '/login',
    {
      onSuccess: (data) => {
        const { email: userEmail, name, authToken } = data.data;
        login({ email: userEmail, name, authToken });
        navigate(PATH.HOME, { replace: true });
      },

      onError: (error: Error) => {
        if (isAxiosError(error) && error.response) {
          if (error.response.status >= 400 && error.response.status < 500) {
            toast.error(error.response.data.message || EMAIL_POSSIBLE);
          } else {
            toast.error(ERROR_OCCURRED_MESSAGE);
          }
        } else {
          toast.error(ERROR_OCCURRED_MESSAGE);
        }
      },
    },
  );

  const handleLogin = () => {
    if (isValid) {
      loginApi({ email, password: pw });
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
        <LoginButton
          disabled={!(isValid && emailTouched && pwTouched)}
          onClick={handleLogin}
        >
          로그인
        </LoginButton>
      </Container>
    </>
  );
};

export default LoginPage;
