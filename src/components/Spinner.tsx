import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.spacing5};
`;

const SpinnerCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.color.gray.gray500};
  border-top-color: ${({ theme }) => theme.color.gray.gray700};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default function Spinner() {
    return (
        <SpinnerWrapper>
            <SpinnerCircle />
        </SpinnerWrapper>
    );
}