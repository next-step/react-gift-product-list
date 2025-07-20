import styled from '@emotion/styled';

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.gray200};
  border-top: 4px solid ${({ theme }) => theme.colors.default};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 40px auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => <Spinner />;

export default LoadingSpinner;
