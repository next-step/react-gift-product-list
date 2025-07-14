import { LoginForm } from '@/components';
import * as S from './styles';

const Login = () => {
  return (
    <S.Main>
      <S.Logo src="/logo.png" alt="카카오 공식 로고"/>   
      <LoginForm />
    </S.Main>
  );
};

export default Login; 