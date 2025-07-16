import styled from "@emotion/styled";

type LoadingSpinnerProps = {
  height: string;
};

const LoadingSpinner = ({ height }: LoadingSpinnerProps) => {
  return (
    <SpinnerDiv height={height}>
      <Spinner />
    </SpinnerDiv>
  );
};

const SpinnerDiv = styled.div<{ height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  width: 100%;
`;

const Spinner = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.semantic.background.default};
  border-top: 3px solid ${({ theme }) => theme.colors.semantic.text.default};
  border-radius: 50%;
  width: 35px;
  height: 35px;
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

export default LoadingSpinner;
