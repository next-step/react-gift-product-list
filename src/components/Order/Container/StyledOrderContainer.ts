import styled from '@emotion/styled';

export const StyledItemInfoContainer = styled.div`
  width: 100%;
  min-height: 150px;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .item-info-text {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 10px;
    border: 1px solid black;
    padding: 6px 10px;
    border-radius: 10px;
  }

  .item-info-img {
    width: 70px;
    height: 70px;
    border: 1px solid #eee;
  }
  p {
    margin: 5px 10px;
  }
`;
export const StyledOrderButton = styled.button`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  border: none;
  background-color: ${({ theme }) => theme.sementicPalette.kakaoYellow};
  color: black;
  font-weight: bold;
  font-size: 18px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 720px;
`;
export const StyledReceivePersonContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 10px;
    gap: 14px;
  }
  .basic-label {
    width: 80px;
  }
`;
export const StyledRecipientsModalContainer = styled.div`
  width: 100%;
  margin: 20px 0px 20px 0px;
  padding: 6px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const StyledSendPersonContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;

  input {
    padding: 3px 8px;
    margin: 5px 10px;
    height: 30px;
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
  }
  textarea {
    width: 95%;
    padding: 4px 12px;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
  }
  p {
    margin-top: 6px;
    width: 95%;
  }
`;
export const SyltedOrderInput = styled.input`
  padding: 6px 12px;
  width: 95%;
  &:focus {
    outline: none;
  }
`;
