import styled from "@emotion/styled";

export const LoadingSpinner = styled.div`
  width: ${({ theme }) => theme.spacing[8]};
  height: ${({ theme }) => theme.spacing[8]};
  border-top: ${({ theme }) => theme.spacing[1]} solid
    ${({ theme }) => theme.colors.gray[800]};
  border-bottom: ${({ theme }) => theme.spacing[1]} solid
    ${({ theme }) => theme.colors.gray[800]};
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
