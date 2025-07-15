import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// useLoginForm.ts 파일 상단에 추가
export const MIN_PASSWORD_LENGTH = 8;

interface UseLoginFormProps {
  onSuccess: () => void;
}
// 이메일 유효성 검사
const validateEmail = (value: string) => {
  if (!value) return 'ID를 입력해주세요.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'ID는 이메일 형식이어야 해요.';
  return '';
};

// 비밀번호 유효성 검사
const validatePassword = (value: string) => {
  if (!value) return 'PW를 입력해주세요.';
  if (value.length < MIN_PASSWORD_LENGTH)
    return `PW는 최소 ${MIN_PASSWORD_LENGTH}글자 이상이어야 합니다.`;
  return '';
};

function useLoginForm({ onSuccess }: UseLoginFormProps) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    emailError: '',
    pwError: '',
  });

  const { login } = useAuth();

  const isValidEmail = validateEmail(form.email) === '';
  const isValidPassword = validatePassword(form.password) === '';

  const isButtonActive =
    isValidEmail &&
    isValidPassword &&
    form.emailError === '' &&
    form.pwError === '' &&
    form.email.length > 0 &&
    form.password.length >= MIN_PASSWORD_LENGTH;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, email: value }));
    const error = validateEmail(value);
    setForm((prev) => ({ ...prev, emailError: error }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, password: value }));
    const error = validatePassword(value);
    setForm((prev) => ({ ...prev, pwError: error }));
  };

  const handleEmailBlur = () => {
    setForm((prev) => ({ ...prev, emailError: validateEmail(form.email) }));
  };
  const handlePasswordBlur = () => {
    setForm((prev) => ({ ...prev, pwError: validatePassword(form.password) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidEmail && isValidPassword) {
      const name = form.email.split('@')[0];
      login({ email: form.email, name });
      onSuccess();
    }
  };

  return {
    form,
    isButtonActive,
    handleEmailChange,
    handlePasswordChange,
    handleEmailBlur,
    handlePasswordBlur,
    handleSubmit,
  };
}

export default useLoginForm;
