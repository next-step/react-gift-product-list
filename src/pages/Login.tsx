import useLoginForm from '@/hooks/useLoginForm';
import {
  LoginTitle,
  LoginButton,
  LoginContainer,
  Input,
  ErrorContainer,
  LoginForm,
} from '@/styles/Login.styles';
import {postLogin} from '@/apis/login';

type LoginProps = {
  onLogin: () => void;
};

function Login({ onLogin }: LoginProps) {
  const {
    id,
    pw,
    idError,
    pwError,
    isValid,
    handleIdChange,
    handlePwChange,
    handleIdBlur,
    handlePwBlur,
    isValidForm,
  } = useLoginForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault();
      if (!isValidForm()) return;

      const responseInfo = await postLogin({email: id, password: pw});
      localStorage.setItem('userInfo', JSON.stringify(responseInfo));
      onLogin();
    }
    catch (err){
      console.log(err);
    }
  }

  return (
    <LoginContainer>
      <LoginTitle>KAKAO</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        <Input placeholder="이메일" value={id} onChange={handleIdChange} onBlur={handleIdBlur} />
        {idError && <ErrorContainer>{idError}</ErrorContainer>}
        <Input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={handlePwChange}
          onBlur={handlePwBlur}
        />
        {pwError && <ErrorContainer>{pwError}</ErrorContainer>}
        <LoginButton type="submit" $active={isValid}>
          로그인
        </LoginButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
