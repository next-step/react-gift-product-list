import styled from "@emotion/styled";
import theme from "@src/styles/kakaoTheme";

function PendingSpinner() {
  return (
    <PendingSpinnerWrapper>
      <Spinner />
    </PendingSpinnerWrapper>
  );
}

// formal spinner - border-top: 20px
const Spinner = styled.div`
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border: 20px solid rgba(163, 151, 198, 0.2);
  border-top: 10px solid ${theme.colors.yellow.yellow600};
  border-radius: 50%;

  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PendingSpinnerWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

export default PendingSpinner;
