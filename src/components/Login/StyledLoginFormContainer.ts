import styled from '@emotion/styled';

export const StyledLoginKakoLogo = styled.div`
  ${({ theme }) => theme.typography.title2Bold}
  margin: ${({ theme }) => theme.spacing.spacing11};
  font-size: 30px;
`;
export const StyledLoginComponentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -50px;
  height: 100vh;
  width: 55%;
  p {
    color: ${({ theme }) => theme.palette.red600};
    ${({ theme }) => theme.typography.label2Regular}
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing.spacing3};
  }
`;
export const StyledLoginButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.spacing12};
  background-color: ${({ theme }) => theme.sementicPalette.kakaoYellow};
  border: 1px solid ${({ theme }) => theme.sementicPalette.kakaoYellow};
  border-radius: 4px;
  width: 100%;
  height: 40px;
  a {
    text-decoration: none;
  }
`;
interface StyledLoginInputProps {
  isError?: string;
}
export const StyeldLoginInput = styled.input<StyledLoginInputProps>`
  ${({ theme }) => theme.typography.body1Regular}
  border-style: solid;
  border-color: ${({ theme, isError }) => (isError ? theme.palette.red600 : theme.palette.gray400)};
  border-width: 0px 0px 1px;
  padding-top: ${({ theme }) => theme.spacing.spacing2};
  padding-bottom: ${({ theme }) => theme.spacing.spacing2};
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
  width: 100%;
  min-height: 20px;
`;
