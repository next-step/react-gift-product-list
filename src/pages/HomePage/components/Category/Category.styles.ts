import styled from "@emotion/styled";

export const GiftThemeSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  box-sizing: border-box;

  padding-left: ${({ theme }) => theme.spacing[4]};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
`;

export const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.layout.grid.columns.fixed5};
  gap: ${({ theme }) => theme.layout.grid.gaps.sm};

  margin-top: ${({ theme }) => theme.spacing[5]};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 124px;
  margin-bottom: 124px;
`;

export const LoadingSpinner = styled.div`
  width: ${({ theme }) => theme.spacing[10]};
  height: ${({ theme }) => theme.spacing[10]};
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

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 124px;
  margin-bottom: 124px;
`;

export const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
`;
