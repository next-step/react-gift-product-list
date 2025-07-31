import Text from '@/common/Text';
import styled from '@emotion/styled';

type LoginButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  Loading?: boolean;
};

const LoginButton = ({
  type = 'button',
  disabled = false,
  Loading = false,
}: LoginButtonProps) => {
  return (
    <StyledButton type={type} disabled={disabled || Loading}>
      {Loading ? (
        <LoadingWrapper>
          <LoadingSpinner />
          <Text size="label2" weight="regular">
            로그인 중...
          </Text>
        </LoadingWrapper>
      ) : (
        <Text size="label2" weight="regular">
          로그인
        </Text>
      )}
    </StyledButton>
  );
};

export default LoginButton;

const StyledButton = styled.button`
  margin-top: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.kakaoYellow};
  width: 100%;
  height: 44px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.kakaoYellow};
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
