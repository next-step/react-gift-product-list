import { loginApi } from '@/api/services/auth'
import { Button, PageContainer, typographyMixin } from '@/components/ui'
import { useAuth } from '@/contexts/auth'
import { LOGIN_CONTENT, loginSchema, type LoginFormData } from '@/features/user'
import { ROUTE_PATH } from '@/Router'
import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

// * 로그인 화면
export const Login = () => {
  // * 인증 컨텍스트 사용
  const { login } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: string })?.from || ROUTE_PATH.HOME

  // * React Hook Form 설정
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched', // * 첫 blur 이후 실시간 유효성 검사 (기존 useInput 동작과 동일)
  })

  // * 로그인 폼 제출 핸들러
  const onSubmit = async (data: LoginFormData) => {
    const { email, name } = await loginApi({
      email: data.email,
      password: data.password,
    })

    // * 로그인 정보 저장 (쿠키에 암호화되어 저장)
    // TODO: 이 부분은 이전에 context api를 활용하여 안전하게 쿠키에 저장 시에 사용하던 로직으로
    // TODO: 이번에는 남겨두고(일단 이번 미션에 집중) api 쪽 코드에 추후 적용할 예정
    login({
      email,
      name,
    })
    // * 로그인 시 이전 페이지로 리다이렉트
    navigate(from, { replace: true }) // * replace로 히스토리 정리
  }

  return (
    <PageContainer>
      <LogoImg alt="카카오 공식 로고" src={LOGIN_CONTENT.logoImgSrc}></LogoImg>

      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} type="email" placeholder="이메일" hasError={!!errors.email} />
          )}
        />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input {...field} type="password" placeholder="비밀번호" hasError={!!errors.password} />
          )}
        />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

        <SpacingDiv />
        <Button type="submit" variant="kakao" size="medium" disabled={!isValid}>
          로그인
        </Button>
      </LoginForm>
    </PageContainer>
  )
}

// * 로고 이미지
const LogoImg = styled.img`
  width: 88px;
  height: 88px;

  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`

// * 로그인 폼
const LoginForm = styled.form`
  width: 100%;
  max-width: 388px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// * 입력 란
const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;

  margin-top: ${({ theme }) => theme.spacing.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
  padding: ${({ theme }) => theme.spacing.spacing2} 0;

  ${typographyMixin('subtitle1Regular')}

  border-bottom: 1px solid
    ${({ theme, hasError }) =>
    hasError ? theme.semanticColors.status.critical : theme.colors.gray.gray400};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray600};
  }

  &:focus {
    border-bottom: 1px solid
      ${({ theme, hasError }) =>
        hasError ? theme.semanticColors.status.critical : theme.colors.gray.gray800};
  }

  transition: border-bottom 0.2s ease-in-out;
`

// * 에러 텍스트
const ErrorText = styled.p`
  ${typographyMixin('label2Regular')}

  text-align: left;
  width: 100%;

  color: ${({ theme }) => theme.semanticColors.status.critical};
`

// * 버튼 위 여백
const SpacingDiv = styled.div`
  height: ${({ theme }) => theme.spacing.spacing12};
`

export default Login
