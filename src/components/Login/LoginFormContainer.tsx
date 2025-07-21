import {
  StyeldLoginInput,
  StyledLoginButton,
  StyledLoginComponentDiv,
  StyledLoginKakoLogo,
} from '@src/components/Login/StyledLoginFormContainer';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useNavigate } from 'react-router-dom';
import { handleLoginLogic } from './handleLoginLogic';

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

  const handleLogin = () => {
    handleLoginLogic(id, pw, navigate);
  };

  return (
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
  );
};

export default LoginForm;
