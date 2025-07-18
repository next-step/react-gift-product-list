import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import { login as loginApi } from '@/api/index';

export const MIN_PASSWORD_LENGTH = 8;

interface UseLoginFormProps {
  onSuccess: () => void;
}

const validateEmail = (value: string) => {
  if (!value) return 'ID를 입력해주세요.';
  const emailRegex = /^[^\s@]+@kakao\.com$/;
  if (!emailRegex.test(value)) return '@kakao.com 이메일 주소만 가능합니다.';
  return '';
};

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidEmail && isValidPassword) {
      try {
        const res = await loginApi({
          email: form.email,
          password: form.password,
        });
        console.log('로그인 응답: ', res);
        // 실제 데이터는 res.data에 있음!
        const { email, name, authToken } = res.data;
        login({ email, name, authToken });
        onSuccess();
      } catch (error) {
        toast.error('네트워크 오류가 발생했습니다.');
      }
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
