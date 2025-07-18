import styled from '@emotion/styled';

export const StyledSelectFriendOuterContainer = styled.div`
  width: 720px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSelectFriendBtn = styled.div`
  background-color: ${({ theme }) => theme.sementicPalette.backgroundDefault};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  margin: ${({ theme }) => theme.spacing.spacing4};
`;
export const StyledSelectFriendBtnPlus = styled.div`
  background-color: ${({ theme }) => theme.sementicPalette.kakaoYellow};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 50px;
  border-radius: 15px;
  margin: ${({ theme }) => theme.spacing.spacing3};
  ${({ theme }) => theme.typography.title1Bold};
`;

export const StyledSelectFriendP = styled.p`
  width: 100%;
  ${({ theme }) => theme.typography.title2Bold}
`;
