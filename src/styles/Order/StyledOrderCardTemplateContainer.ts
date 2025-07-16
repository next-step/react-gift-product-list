import styled from '@emotion/styled';

export const StyledOrderCardSideScrollConntainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 4px;

  img {
    width: 80px;
    height: 50px;
    margin: 3px;
    border: 3px solid transparent;
    border-radius: 10px;
    cursor: pointer; // 클릭 가능하게
    &.selected {
      border-color: ${({ theme }) => theme.palette.blue500}; // 선택된 템플릿 테두리
    }
  }
  .first-card {
    margin-left: 4px;
  }
`;
export const StyledOrderCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin: 10px 0px 20px 0px;
    width: 400px;
    height: 230px;
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
  }
  p {
    margin-top: 6px;
    width: 95%;
  }
  textarea {
    width: 95%;
    padding: 4px 12px;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
  }
`;

export const StyledOrderTemplateContainer = styled.div`
  width: 100%;
`;
