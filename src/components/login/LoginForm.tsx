import { ROUTE_PATH } from "@/routes/paths";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router";
import useFormInput from "@/hooks/useFormInput";
import { checkEmailError, checkPasswordError } from "@/utils/validation";
import ErrorMessage from "../common/ErrorMessage";
import { useUserInfo } from "@/contexts/UserInfoContext";
import { postLogin } from "@/api/login";
import useApiRequest from "@/hooks/useApiRequest";
import type { User } from "@/types/user";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInput = useFormInput(checkEmailError);
  const passwordInput = useFormInput(checkPasswordError);
  const user = useUserInfo();

  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch: postLoginRequest,
  } = useApiRequest<User, [string, string]>({
    requestFn: postLogin,
    immediate: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postLoginRequest(emailInput.value, passwordInput.value);
  };

  useEffect(() => {
    if (userData && !isLoading && !isError && !user?.email) {
      user?.setUserInfo({
        email: userData.email,
        name: userData.name,
        authToken: userData.authToken,
      });

      const redirectPath = new URLSearchParams(location.search).get("redirect");
      navigate(redirectPath || ROUTE_PATH.HOME);
    }
  }, [userData, isLoading, isError, user, location.search, navigate]);

  useEffect(() => {
    if (isError && !isLoading) {
      toast.error(error);
    }
  }, [isError, isLoading, error]);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        error={!!emailInput.error}
        type="text"
        value={emailInput.value}
        placeholder="이메일"
        onChange={emailInput.onChange}
        onBlur={emailInput.onBlur}
      />
      {emailInput.error && <ErrorMessage message={emailInput.error} />}
      <Input
        error={!!passwordInput.error}
        type="password"
        placeholder="비밀번호"
        value={passwordInput.value}
        onChange={passwordInput.onChange}
        onBlur={passwordInput.onBlur}
      />
      {passwordInput.error && <ErrorMessage message={passwordInput.error} />}
      <Button
        type="submit"
        disabled={
          isLoading ||
          !!checkEmailError(emailInput.value) ||
          !!checkPasswordError(passwordInput.value)
        }
      >
        로그인
      </Button>
    </Form>
  );
};

export default LoginForm;

const Form = styled.form`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const Input = styled.input<{ error: boolean }>`
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: ${({ theme }) => `${theme.spacing.spacing4} 0 0`};
  padding: ${({ theme }) => theme.spacing.spacing2};
  border-bottom: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.red.red700 : theme.colors.gray.gray400};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};

  &::placeholder {
    color: ${({ theme }) => theme.colors.semantic.text.placeholder};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.semantic.text.default};
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  margin-top: ${({ theme }) => theme.spacing.spacing12};
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
