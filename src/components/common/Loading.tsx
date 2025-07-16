import styled from '@emotion/styled';

const Loading = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 4px solid ${({ theme }) => theme.color.gray[300]};
  border-top: 4px solid ${({ theme }) => theme.color.gray[600]};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
