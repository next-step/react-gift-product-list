import styled from "@emotion/styled";

const LoadingSpinner = styled.div`
  width: ${({ theme }) => theme.spacing[7]};
  height: ${({ theme }) => theme.spacing[7]};
  border-top: ${({ theme }) => theme.spacing[1]} solid
    ${({ theme }) => theme.colors.gray[700]};
  border-bottom: ${({ theme }) => theme.spacing[1]} solid
    ${({ theme }) => theme.colors.gray[700]};
  border-left: ${({ theme }) => theme.spacing[1]} solid
    ${({ theme }) => theme.colors.gray[0]};
  border-right: ${({ theme }) => theme.spacing[1]} solid
    ${({ theme }) => theme.colors.gray[0]};
  border-radius: 50%;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 124px;
  margin-bottom: 124px;
`;

export function Loading() {
  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
}
