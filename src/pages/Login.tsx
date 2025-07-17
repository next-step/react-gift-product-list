import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/common/NavigationBar';
import Input from '@/common/Input';
import LoginButton from '@/components/login/LoginButton';
import { useLoginForm } from '@/hooks/useLoginForm';
import { useAuth } from '@/context/AuthContext';
import type { LoginFormInputs } from '@/hooks/useLoginForm';

const LoginForm = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useLoginForm();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (data: LoginFormInputs) => {
    console.log('로그인 요청:', data);
    await login(data.id, data.password);
  };

  return (
    <Layout>
      <NavigationBar />
      <Logo>kakao</Logo>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Input
            {...register('id')}
            type="email"
            placeholder="이메일"
            hasError={!!errors.id}
          />
          {errors.id && <ErrorText>{errors.id.message}</ErrorText>}
        </InputWrapper>

        <InputWrapper>
          <Input
            {...register('password')}
            type="password"
            placeholder="비밀번호"
            hasError={!!errors.password}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </InputWrapper>

        <LoginButton type="submit" disabled={!isValid} />
      </FormWrapper>
    </Layout>
  );
};

export default LoginForm;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: ${({ theme }) => theme.spacing.spacing2};
`;

const Logo = styled.div`
  font-size: 40px;
  margin-bottom: 40px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 388px;
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.red700};
  font-size: ${({ theme }) => theme.typography.fontSizes.label2};
  margin-top: 4px;
  padding-left: 4px;
`;
