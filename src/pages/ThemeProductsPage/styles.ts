import styled from '@emotion/styled';

export const Frame = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
`;
export const ThemeInfoBanner = styled.div<{ backgroundColor: string }>`
  padding-top: 26px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 22px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: white;
`;
export const Theme = styled.h1`
  font: ${({ theme }) => theme.typography.body2Bold};
  padding-bottom: 8px;
`;
export const Title = styled.h2`
  font: ${({ theme }) => theme.typography.title1Bold};
  padding-bottom: 4px;
`;
export const Description = styled.p`
  font-size: 1rem;
`;
export const Box = styled.div`
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  padding: 4px;
`;
export const Noitem = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
