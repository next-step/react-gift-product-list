import * as S from './LoginForm.styles'
import KaKaoTitleIcon from '@/assets/icons/kakao-title.svg?react'
import MyButton from '@/component/Button/Button'
import { useLoginForm } from '../hooks/useLoginForm'
import { useLoginSubmit } from '../hooks/useLoginSubmit'

interface LoginFormProps {
  redirectPath: string
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectPath }) => {
  const methods = useLoginForm()
  const { submitLogin } = useLoginSubmit(redirectPath)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  const onSubmit = handleSubmit(submitLogin)

  return (
    <S.Container>
      <form onSubmit={onSubmit}>
        <S.FormContainer>
          <S.KakaoTitle>
            <KaKaoTitleIcon />
          </S.KakaoTitle>

          <S.InputForm
            placeholder="이메일"
            type="email"
            {...register('email')}
            isError={!!errors.email}
          />
          {errors.email && (
            <S.ErrorMessage isActive>{errors.email.message}</S.ErrorMessage>
          )}

          <S.InputForm
            placeholder="비밀번호"
            type="password"
            {...register('password')}
            isError={!!errors.password}
          />
          {errors.password && (
            <S.ErrorMessage isActive>{errors.password.message}</S.ErrorMessage>
          )}

          <MyButton
            type="submit"
            variant="primary"
            size="large"
            disabled={!isValid}
            fullWidth
            style={{ marginTop: '32px' }}
          >
            로그인
          </MyButton>
        </S.FormContainer>
      </form>
    </S.Container>
  )
}

export default LoginForm
