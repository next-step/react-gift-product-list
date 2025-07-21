import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateId, validatePw } from '@/utils/validation';
import { useAuth } from '@/contexts/AuthContext';
import { login as loginService } from '@/api/services';
import { toastError } from '@/utils/toast';
import axios from 'axios';

export const useLoginForm = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  const [touched, setTouched] = useState({ id: false, pw: false });
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/';

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  //유효성 검사
  const onBlurId = () => {
    setTouched((prev) => ({ ...prev, id: true }));
    setIdError(validateId(id) ?? '');
  };

  const onBlurPw = () => {
    setTouched((prev) => ({ ...prev, pw: true }));
    setPwError(validatePw(pw) ?? '');
  };

  const isValid = !!(id && !!pw && !idError && !pwError);

  const onSubmit = async () => {
    if (!isValid) return;
    try {
      const { email, name, authToken } = await loginService(id, pw);
      login({ email, name }, authToken);
      navigate(from, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toastError(error.response.data.data.message || '로그인에 실패했습니다.');
      } else {
        toastError('알 수 없는 오류가 발생했습니다.');
        console.error(error);
      }
    }
  };

  return {
    id, pw,
    idError, pwError,
    touched,
    onChangeId, onChangePw,
    onBlurId, onBlurPw,
    onSubmit,
    isValid,
  };
};
