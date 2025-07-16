import { useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import Spacing from "@/components/Spacing";
import { useLoginForm } from "./useLoginForm";
import { css, type Theme } from "@emotion/react";
import { login } from "@/services/auth";
import { showErrorToast } from "@/styles/toast";
import type { AxiosError } from "node_modules/axios/index.d.cts";
// 현재 AxiosError를 import할 때,
// import type { AxiosError } from "node_modules/axios/index.d.cts"
// node_modules 경로로 직접 작성하는 방식은 위험할 거 같은데
// import { AxiosError } from "axios"로 작성하면
// "AxiosError has no exported member"라는 에러가 발생합니다.

// tsconfig도 확인하고 수정해보았지만 해결이 되지 않아 여쭤봅니다..
// 이런 경우 AxiosError를 안전하게 가져오거나,
// 혹은 대체할 수 있는 좋은 방법이 있을지 조언 부탁드립니다.

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";

  const {
    email,
    emailError,
    password,
    passwordError,
    changeEmail,
    notFocusEmail,
    changePassword,
    notFocusPassword,
    isFormValid,
  } = useLoginForm();

  const goToLogin = async () => {
    if (!isFormValid) return;

    if (!email.endsWith("@kakao.com")) {
      showErrorToast("@kakao.com 이메일 주소만 가능합니다.");
      return;
    }
    try {
      const response = await login({ email, password });

      const userInfo = {
        authToken: response.data.authToken,
        email: response.data.email,
        name: response.data.name,
      };

      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate(from, { replace: true });
    } catch (error: unknown) {
      // any 타입을 unknown 타입으로 수정
      const status = (error as AxiosError).response?.status;
      // unknown 타입 .response처럼 사용 불가 -> AxiosError로 타입 단언
      if (status && status >= 400 && status < 500) {
        showErrorToast("올바른 이메일 형식이 아닙니다.");
      }
    }
  };

  return (
    <Wrapper>
      <Form>
        <Logo src="/loginlogo.svg" alt="kakao logo" />
        <FormBox>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={changeEmail}
            onBlur={notFocusEmail}
            hasError={!!emailError}
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}
          <Spacing />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={changePassword}
            onBlur={notFocusPassword}
            hasError={!!passwordError}
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
          <Spacing height="48px" />
          <LoginButton onClick={goToLogin} disabled={!isFormValid}>
            로그인
          </LoginButton>
        </FormBox>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 56px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

const Form = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 5.5rem;
  margin-bottom: 2rem;
`;

const FormBox = styled.div`
  width: 100%;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  border: none;
  border-bottom: 1px solid
    ${({ hasError, theme }) =>
      hasError ? theme.colors.state.critical : theme.colors.gray[400]};
  padding: 8px 0;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  ${({ theme }) => theme.typography.body1Regular};
  &:focus {
    outline: none;
    border-color: black;
  }
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.state.critical};
  ${({ theme }) => theme.typography.label2Regular};
`;

const disabledStyles = ({ theme }: { theme: Theme }) => css`
  opacity: 0.5;
  cursor: not-allowed;
  background-color: ${theme.colors.kakao.yellow.default};
  &:hover,
  &:active {
    background-color: ${theme.colors.kakao.yellow.default};
  }
`;

const enabledStyles = ({ theme }: { theme: Theme }) => css`
  opacity: 1;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.kakao.yellow.hover};
  }
  &:active {
    background-color: ${theme.colors.kakao.yellow.pressed};
  }
`;

const LoginButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 2.75rem;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.kakao.yellow.default};
  color: ${({ theme }) => theme.colors.gray[900]};
  ${({ theme }) => theme.typography.body2Regular};
  transition: background-color 200ms;

  ${({ disabled }) => (disabled ? disabledStyles : enabledStyles)}
`;
