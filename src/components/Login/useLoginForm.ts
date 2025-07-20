import { apiClient } from '@src/api/FetchData';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import { URLS } from '@src/assets/urls';
import { useLoginEmailForm } from '@src/hooks/useLoginEmailForm';
import { useLoginPwForm } from '@src/hooks/useLoginPwForm';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
  const { id, idError, handleIdBlur, handleIdChange } = useLoginEmailForm();
  const { pw, pwError, handlePwBlur, handlePwChange } = useLoginPwForm();
  const navigate = useNavigate();

  //로그인 타입 검사
  const isVlaidLoginFetch = async (body: Record<string, string>) => {
    const loginFetchData = await apiClient('POST', BASIC_ENDPOINT.login, body, '');

    if(loginFetchData.statusCode)
  };

  const handelLogin = () => {
    const username = id.split('@')[0];

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('email', id);

    const redirectProductId = sessionStorage.getItem('redirectProductId');
    if (redirectProductId) {
      sessionStorage.removeItem('redirectProductItem');
      navigate(`${URLS.order}?productId=${redirectProductId}`);
    } else {
      navigate(URLS.home);
    }
  };

  const isLoginButtonEnabled = useMemo(() => {
    const isIdValid = !id || idError ? false : true;
    const isPasswordValid = !pw || pwError ? false : true;

    return isIdValid && isPasswordValid;
  }, [id, pw, idError, pwError]);

  return {
    id,
    idError,
    handleIdBlur,
    handleIdChange,
    pw,
    pwError,
    handlePwBlur,
    handlePwChange,
    isLoginButtonEnabled,
    handelLogin,
  };
};
