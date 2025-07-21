import useLoginForm from '@/hooks/useLoginForm';
import {
  LoginTitle,
  LoginButton,
  LoginContainer,
  Input,
  ErrorContainer,
  LoginForm,
} from '@/styles/Login.styles';
import { postLogin } from '@/apis/login';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';
import { setAccessToken } from '@/apis/apiClient';

type LoginProps = {
  onLogin: () => void;
};

function Login({ onLogin }: LoginProps) {
  const {
    id,
    pw,
    idError,
    pwError,
    isValid,
    handleIdChange,
    handlePwChange,
    handleIdBlur,
    handlePwBlur,
    isValidForm,
  } = useLoginForm();
  const { setLoginInfo } = useContext(LoginInfoContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!isValidForm()) return;

      const responseInfo = await postLogin({ email: id, password: pw });
      setAccessToken(responseInfo.authToken);
      setLoginInfo(responseInfo);
      onLogin();
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        toast.error(
          (error.response.data as { message?: string })?.message ||
            '클라이언트 에러가 발생했습니다.',
        );
      } else {
        toast.error('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>KAKAO</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        <Input placeholder="이메일" value={id} onChange={handleIdChange} onBlur={handleIdBlur} />
        {idError && <ErrorContainer>{idError}</ErrorContainer>}
        <Input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={handlePwChange}
          onBlur={handlePwBlur}
        />
        {pwError && <ErrorContainer>{pwError}</ErrorContainer>}
        <LoginButton type="submit" $active={isValid}>
          로그인
        </LoginButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
