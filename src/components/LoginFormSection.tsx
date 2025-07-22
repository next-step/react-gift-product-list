import type { FormEvent } from 'react'
import styled from '@emotion/styled'
import useLoginForm from '@/hooks/useLoginForm'
import { colors } from '@/theme/color'
import { typography } from '@/theme/typography'
import { spacing } from '@/theme/spacing'
import { useAuth } from '@/contexts/AuthContext'
import { postLogin } from '@/api/auth'
import { toast } from 'react-toastify'
import { ErrorMessage, YellowButton } from '@/components/common'
import type { UserInfo } from '@/utils/storage'

interface LoginFormSectionProps {
  onSuccess?: (info: UserInfo) => void
}

const Form = styled.form`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  height: 48px;
  padding: 0 ${spacing.spacing2};
  margin-bottom: ${spacing.spacing1};
  border: 1px solid ${colors.border.default};
  border-radius: 4px;
  font-size: ${typography.body1Regular.fontSize};
  outline: none;

  &::placeholder {
    color: ${colors.text.placeholder};
  }
`

const Button = styled(YellowButton)`
  height: 48px;
`

export default function LoginFormSection({ onSuccess }: LoginFormSectionProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    handleEmailBlur,
    handlePasswordBlur,
    isValid,
  } = useLoginForm()
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    try {
      const info = await postLogin(email, password)
      login(info)
      onSuccess?.(info)
    } catch (err: any) {
      const code = err?.statusCode ?? 0
      if (code >= 400 && code < 500) {
        toast.error(err.message)
      } else {
        toast.error('로그인에 실패했습니다.')
      }
    }
  }

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                required
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
            <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                required
            />
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
            <Button type="submit" disabled={!isValid}>
                로그인
            </Button>
        </Form>
    )
}