import {
  StyeldLoginInput,
  StyledLoginButton,
  StyledLoginComponentDiv,
  StyledLoginKakoLogo,
} from '@src/components/Login/StyledLoginFormContainer';
import { useLoginForm } from '../../hooks/useLoginForm';
import { apiClient } from '@src/api/FetchData';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import { useNavigate } from 'react-router-dom';
import { URLS } from '@src/assets/urls';
import { SESSION_KEY_NAME } from '@src/assets/sessionKeyName';
import type { HttpsFailedResponseTypes } from '../../types/LoginFetchDataType';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    id,
    idError,
    handleIdBlur,
    handleIdChange,
    pw,
    pwError,
    handlePwBlur,
    handlePwChange,
    isLoginButtonEnabled,
  } = useLoginForm();

  const handleLogin = async () => {
    const formBody = {
      email: id,
      password: pw,
    };
    const fetchData = await apiClient('POST', BASIC_ENDPOINT.login, formBody, '');

    if ((fetchData as HttpsFailedResponseTypes) && fetchData.statusCode < 500) {
      toast(fetchData.message);
    } else {
      sessionStorage.setItem(SESSION_KEY_NAME.email, fetchData.email);
      sessionStorage.setItem(SESSION_KEY_NAME.username, fetchData.name);
      sessionStorage.setItem(SESSION_KEY_NAME.token, fetchData.authToken);

      const redirectProductId = sessionStorage.getItem('redirectProductId');
      if (redirectProductId) {
        sessionStorage.removeItem('redirectProductId');
        navigate(`${URLS.order}?productId=${redirectProductId}`);
      } else {
        navigate(URLS.home);
      }
    }
  };

  return (
    <>
      <StyledLoginComponentDiv>
        <StyledLoginKakoLogo>kakao</StyledLoginKakoLogo>
        <StyeldLoginInput
          type='text'
          value={id}
          onChange={handleIdChange}
          onBlur={handleIdBlur}
          id='loginid'
          isError={idError}
          placeholder='이메일'
        />
        {idError && <p>{idError}</p>}
        <StyeldLoginInput
          type='password'
          value={pw}
          onChange={handlePwChange}
          onBlur={handlePwBlur}
          id='passwd'
          isError={pwError}
          placeholder='비밀번호'
        />
        {pwError && <p>{pwError}</p>}
        <StyledLoginButton onClick={handleLogin} disabled={!isLoginButtonEnabled}>
          로그인
        </StyledLoginButton>
      </StyledLoginComponentDiv>
    </>
  );
};

export default LoginForm;
