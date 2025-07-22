import styled from '@emotion/styled';
import KakaoLogo from '@/assets/kakao.webp';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOCATION_STATE_KEYS } from '@/constants/navigationState';
import { ROUTES } from '@/constants/routes';
import useLoginForm from '@/hooks/useLoginForm';
import InputField from '@/components/common/InputField';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '@/constants/validation';
import { hasErrorMessage } from '@/utils/error';

type FromState = {
  pathname: string;
  search?: string;
};

const LoginFormSection = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromState = location.state?.[LOCATION_STATE_KEYS.FROM] as
    | FromState
    | undefined;
  const redirectTo = fromState
    ? fromState.pathname + (fromState.search ?? '')
    : ROUTES.HOME;

  const { email, password, isValid } = useLoginForm();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidEmail = email.validate();
    const isValidPassword = password.validate();
    if (!isValidEmail || !isValidPassword) return;

    try {
      await login({ email: email.value, password: password.value });
      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
      const message = hasErrorMessage(err)
        ? err.response!.data!.message!
        : ERROR_MESSAGES.INVALID_LOGIN_DOMAIN;
      toast.error(message);
    }
  };

  return (
    <Wrapper>
      <Logo src={KakaoLogo} alt="카카오 로고" />
      <FormWrapper onSubmit={handleLogin}>
        <InputWrapper>
          <InputField
            {...email.register}
            name="email"
            type="email"
            value={email.value}
            onBlur={email.validate}
            error={email.error}
            placeholder="이메일"
          />
          <InputField
            {...password.register}
            name="password"
            type="password"
            value={password.value}
            onBlur={password.validate}
            error={password.error}
            placeholder="비밀번호"
          />
        </InputWrapper>
        <LoginButton disabled={!isValid}>로그인</LoginButton>
      </FormWrapper>
    </Wrapper>
  );
};

export default LoginFormSection;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[6]};
`;

const Logo = styled.img`
  width: 70px;
  height: auto;
  margin: ${({ theme }) => theme.spacing[8]} 0;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const LoginButton = styled.button`
  width: 100%;
  max-width: 360px;
  padding: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.color.semantic.kakaoYellow};
  ${({ theme }) => theme.typography.body.body2Regular};
  border: none;
  border-radius: 6px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
