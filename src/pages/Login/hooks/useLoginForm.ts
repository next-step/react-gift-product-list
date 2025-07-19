import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserManagement } from '../contexts/UserManagement';
import { useEmailInput } from './useEmailInput';
import { usePasswordInput } from './usePasswordInput';
import { loginUser } from '../../../apis/auth';
import axios from 'axios';

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

    setLoading(true);

    try {
      const resJson = await loginUser({
        email: email.value,
        password: password.value,
      });

      const { email: userEmail, name, authToken } = resJson.data;

      login({ authToken, email: userEmail, name });
      navigate(redirectPath, { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.data?.message || '잘못된 요청입니다.';
        toast.error(errorMessage);
      } else if (err instanceof TypeError) {
        toast.error('네트워크 오류가 발생했습니다.');
      } else {
        toast.error('서버 오류가 발생했습니다.');
      }
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
