import styled from '@emotion/styled';

const Spinner = styled.div`
  border: 4px solid #e0e0e0;
  border-top: 4px solid #4f46e5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => <Spinner />;

export default LoadingSpinner;
