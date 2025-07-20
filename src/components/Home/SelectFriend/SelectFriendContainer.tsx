import { SESSION_KEY_NAME } from '@src/assets/sessionId';
import {
  StyledSelectFriendBtn,
  StyledSelectFriendBtnPlus,
  StyledSelectFriendOuterContainer,
  StyledSelectFriendP,
} from '@src/components/Home/SelectFriend/StyledSelectFriendContainer';

const SelectFriendContainer = () => {
  const makeSelectFrinedMessage = () => {
    const msg = '선물할 친구를 선택해 주세요';
    const username = sessionStorage.getItem(SESSION_KEY_NAME.username);
    if (username) {
      return username + '님! ' + msg;
    } else {
      return msg;
    }
  };

  return (
    <StyledSelectFriendOuterContainer>
      <StyledSelectFriendBtn>
        <StyledSelectFriendBtnPlus>+</StyledSelectFriendBtnPlus>
        <StyledSelectFriendP>{makeSelectFrinedMessage()}</StyledSelectFriendP>
      </StyledSelectFriendBtn>
    </StyledSelectFriendOuterContainer>
  );
};

export default SelectFriendContainer;
