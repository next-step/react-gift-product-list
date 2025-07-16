import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import LoginButton from "@/components/common/BaseButton";
import KakaoLogo from "@/components/common/KakaoLogo";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/validator";
import type { LoginFormValues } from "@/utils/validator";
import { useApiRequest } from "@/hooks/useApiRequest";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/my";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { refetch } = useApiRequest<{
    email: string;
    name: string;
    authToken: string;
  }>({
    url: "/api/login",
    method: "post",
    manual: true,
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await refetch({ data });

      if (result?.data) {
        const { email, name, authToken } = result.data;

        if (email && name && authToken) {
          login({ email, name, authToken });
          navigate(redirectTo);
        }
      }
    } catch (err: any) {
      const statusCode = err?.response?.status;
      const errorMessage = err?.response?.data?.data?.message;

      if (statusCode >= 400 && statusCode < 500) {
        if (errorMessage?.includes("@kakao.com")) {
          toast.error("@kakao.com 이메일 주소만 가능합니다.");
        } else if (errorMessage) {
          toast.error(errorMessage);
        }
      }
    }
  };

  return (
    <Wrapper>
      <Logo>
        <KakaoLogo />
      </Logo>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" placeholder="이메일" {...register("email")} />
        {errors.email?.message && <ErrorText>{errors.email.message}</ErrorText>}

        <Input
          type="password"
          placeholder="비밀번호"
          {...register("password")}
        />
        {errors.password?.message && (
          <ErrorText>{errors.password.message}</ErrorText>
        )}

        <LoginButton
          color="yellow"
          type="submit"
          label="로그인"
          size="large"
          disabled={!isValid}
        />
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 400px;
  margin: 80px auto 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.colors.default};
  border-radius: 16px;
`;

const Logo = styled.div`
  margin-bottom: 20px;

  svg {
    width: 100px;
    height: 100px;
    display: flex;
    margin: 0 auto 12px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray600};
  padding: 12px 8px;
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  outline: none;
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin-top: -10px;
  margin-bottom: 10px;
`;

export default LoginPage;
