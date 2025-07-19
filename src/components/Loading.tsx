import styled from '@emotion/styled';

const Loading = () => (
  <LoadingWrapper>
    <Spinner />
    <LoadingText>로딩 중...</LoadingText>
  </LoadingWrapper>
);

export default Loading;

const LoadingWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.semantic.text.sub};
  font-size: 1.1rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.colorScale.gray[200]};
  border-top: 4px solid ${({ theme }) => theme.colors.colorScale.blue[600]};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
