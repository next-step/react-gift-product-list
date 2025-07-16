import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserManagement } from '../contexts/UserManagement';
import { useEmailInput } from './useEmailInput';
import { usePasswordInput } from './usePasswordInput';

export const useLoginForm = () => {
  const email = useEmailInput();
  const password = usePasswordInput();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = UserManagement();
  const [loading, setLoading] = useState(false);

  const isValid = email.isValid && password.isValid;
  const redirectPath = searchParams.get('redirect') || '/my';

  const goToLogin = async () => {
    if (!isValid || loading) return;

    if (!email.value.endsWith('@kakao.com')) {
      toast.error('@kakao.com 이메일 주소만 가능합니다.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      const resJson = await response.json();

      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          const errorMessage = resJson?.data?.message || '잘못된 요청입니다.';
          toast.error(errorMessage);
        } else {
          toast.error('서버 오류가 발생했습니다.');
        }
        return;
      }

      const { email: userEmail, name, authToken } = resJson.data;

      login({
        authToken,
        email: userEmail,
        name,
      });

      navigate(redirectPath, { replace: true });
    } catch {
      toast.error('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    isValid,
    loading,
    goToLogin,
  };
};
