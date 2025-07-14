import styled from "@emotion/styled";

export default function LoadingSpinner() {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Spinner = styled.div`
  margin: 40px auto;
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-top-color: #888;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
