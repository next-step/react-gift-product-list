import ErrorText from '@components/common/ErrorText';
import { useAuth } from '@contexts/AuthContext';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginFormData } from '@schemas/loginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface LoginButtonProps {
  disabled: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormData) => {
    if (await login(data)) {
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate('/');
      }
    } else {
      setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
      console.log(loginError); //useAuth의 login에서 toast로 처리하고 있긴 하지만 임시로 사용하였습니다.
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Title>kakao</Title>
      <Input
        type="email"
        placeholder="이메일"
        {...register('email')}
        error={!!errors.email}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <Input
        type="password"
        placeholder="비밀번호"
        {...register('password')}
        error={!!errors.password}
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

      <Button type="submit" disabled={!isValid}>
        로그인
      </Button>
    </Container>
  );
};

export default Login;

const Container = styled.form(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  padding: theme.spacing.spacing4,
  backgroundColor: theme.colors.semantic.backgroundDefault,
}));

const Title = styled.h1(({ theme }) => ({
  fontSize: theme.typography.title1Regular.fontSize,
  fontWeight: theme.typography.title1Regular.fontWeight,
  lineHeight: theme.typography.title1Regular.lineHeight,
  marginBottom: theme.spacing.spacing10,
  color: theme.colors.semantic.textDefault,
}));

const Input = styled.input<{ error?: boolean }>(({ theme, error }) => ({
  width: '100%',
  maxWidth: '320px',
  padding: `${theme.spacing.spacing3} 0`,
  marginBottom: theme.spacing.spacing2,
  border: 'none',
  borderBottom: `1px solid ${
    error ? theme.colors.semantic.critical : theme.colors.semantic.borderDefault
  }`,
  fontSize: theme.typography.body1Regular.fontSize,
  fontWeight: theme.typography.body1Regular.fontWeight,
  color: theme.colors.semantic.textDefault,
  backgroundColor: 'transparent',
  outline: 'none',

  '::placeholder': {
    color: theme.colors.semantic.textPlaceholder,
  },
}));

const loginButtonYellowDisabled = '#fff584';

const Button = styled.button<LoginButtonProps>(({ theme, disabled }) => ({
  width: '100%',
  maxWidth: '320px',
  padding: `${theme.spacing.spacing3} 0`,
  marginTop: theme.spacing.spacing3,
  backgroundColor: disabled
    ? loginButtonYellowDisabled
    : theme.colors.semantic.kakaoYellow,
  color: disabled
    ? theme.colors.gray.gray600
    : theme.colors.semantic.textDefault,
  fontWeight: theme.typography.body1Bold.fontWeight,
  fontSize: theme.typography.body1Bold.fontSize,
  lineHeight: theme.typography.body1Bold.lineHeight,
  border: 'none',
  borderRadius: '6px',
  cursor: disabled ? 'not-allowed' : 'pointer',

  '&:hover': {
    backgroundColor: disabled
      ? loginButtonYellowDisabled
      : theme.colors.semantic.kakaoYellowHover,
  },

  '&:active': {
    backgroundColor: disabled
      ? loginButtonYellowDisabled
      : theme.colors.semantic.kakaoYellowActive,
  },
}));
