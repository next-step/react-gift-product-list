/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  FormSection,
  InputWrapper,
  Input,
  ErrorMessage,
  LoginButton,
} from "./LoginFormStyles";
import { login } from "@/api/auth";
import { userStorage } from "@/utils/userStorage";
import { toast } from "react-toastify";

type Props = {
  onLoginSuccess: (email: string, token: string) => void; 
};

export const LoginForm = ({ onLoginSuccess }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const getValidateEmail = (email: string) => {
    if (!email) return "ID를 입력해주세요.";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "ID는 이메일 형식으로 입력해주세요.";
    return "";
  };

  const isKakaoEmail = (email: string) => {
    return email.endsWith("@kakao.com");
  };

  const validatePassword = (password: string) => {
    if (!password) return "PW를 입력해주세요.";
    if (password.length < 8) return "PW는 최소 8글자 이상이어야 합니다.";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      if (emailError) setEmailError("");
    } else if (name === "password") {
      setPassword(value);
      if (passwordError) setPasswordError("");
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmailError(getValidateEmail(value));
    if (name === "password") setPasswordError(validatePassword(value));
  };

  const handleSubmit = async () => {
    const emailErr = getValidateEmail(email);
    const pwErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(pwErr);

    if (emailErr || pwErr) return;

    if (!isKakaoEmail(email)) {
      toast.error("@kakao.com 이메일 주소만 가능합니다.");
      return;
    }

    try {
      const data = await login({ email, password });
      userStorage.set(data);
      toast.success("로그인 성공!");

      onLoginSuccess(data.email, data.authToken);
    } catch (err: any) {
      const message =
        err?.response?.data?.data?.message || "로그인에 실패했습니다.";
      toast.error(message);
    }
  };

  const disabled = !email || !password || !!emailError || !!passwordError;

  return (
    <FormSection>
      <InputWrapper>
        <Input
          type="text"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          isError={!!emailError}
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      </InputWrapper>

      <InputWrapper>
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          isError={!!passwordError}
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      </InputWrapper>

      <LoginButton onClick={handleSubmit} disabled={disabled}>
        로그인
      </LoginButton>
    </FormSection>
  );
};
