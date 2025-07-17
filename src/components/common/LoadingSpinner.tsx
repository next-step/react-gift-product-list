import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  );
};

export default LoadingSpinner;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div(({ theme }) => ({
  width: theme.spacing.spacing10,
  height: theme.spacing.spacing10,
  border: `4px solid ${theme.colors.semantic.backgroundDefault}`,
  borderTopColor: theme.colors.brown.brown900,
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,
  margin: `2rem auto`,
}));

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
