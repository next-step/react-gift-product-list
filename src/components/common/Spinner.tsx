import styled from '@emotion/styled';

const SpinnerWrapper = styled.div`
  width: 28px;
  height: 28px;
  border: 3px solid #fff;
  border-top-color: ${({ theme }) => theme.colors.semantic.kakaoBrown};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function Spinner() {
  return <SpinnerWrapper />;
}
