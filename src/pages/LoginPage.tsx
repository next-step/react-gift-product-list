import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import MobileLayout from '@/layouts/MobileLayout';
import NavBar from '@/components/NavBar';
import logo from '@/assets/logo.svg';
import KakaoButton from '@/components/common/KakaoButton';

import { emailRegex, MIN_PASSWORD_LENGTH } from '@/utils/validation';
import useLoginForm from '@/hooks/useLoginForm';
import { useAuth } from '@/hooks/useAuth';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: #fff;
`;

const Content = styled.main`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 470px;
`;

const LogoImg = styled.img`
  width: 88px;
  height: 88px;
`;

const Form = styled.form`
  width: 390px;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Input = styled.input<{ error?: boolean }>`
  border: 0;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.colors.red[700] : theme.colors.gray[400])};
  height: 30px;
  padding: 8px 0;
  margin-bottom: 4px;
  ${({ theme }) => theme.typography.body1Regular};
  &::placeholder {
    ${({ theme }) => theme.typography.body1Regular};
    color: ${({ theme }) => theme.colors.gray[600]};
  }
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const ErrorMsg = styled.span`
  ${({ theme }) => theme.typography.label2Regular};
  color: ${({ theme }) => theme.colors.red[700]};
  margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  margin-top: 32px;
`;

export default function LoginPage() {
  const { register, handleSubmit, errors, isValid, values } = useLoginForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = (state as { from?: string })?.from || '/';

  if (user) return <Navigate to="/my" replace />;

  const onSubmit = async () => {
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <MobileLayout>
      <Wrapper>
        <NavBar />
        <Content>
          <LogoImg src={logo} alt="kakao 로고" />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="이메일"
              type="email"
              {...register('email', {
                required: 'ID를 입력해주세요.',
                pattern: {
                  value: emailRegex,
                  message: 'ID는 이메일 형식으로 입력해주세요.',
                },
              })}
              error={!!errors.email}
            />
            {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}

            <Input
              placeholder="비밀번호"
              type="password"
              {...register('password', {
                required: 'PW를 입력해주세요.',
                minLength: {
                  value: 8,
                  message: `PW는 최소 ${MIN_PASSWORD_LENGTH}글자 이상이어야 합니다.`,
                },
              })}
              error={!!errors.password}
            />
            {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}

            <ButtonWrapper>
              <KakaoButton type="submit" fullWidth disabled={!isValid}>
                로그인
              </KakaoButton>
            </ButtonWrapper>
          </Form>
        </Content>
      </Wrapper>
    </MobileLayout>
  );
}
