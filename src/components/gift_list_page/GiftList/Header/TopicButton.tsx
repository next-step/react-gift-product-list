import type { TopicButtonType } from '@/types/button';
import styled from '@emotion/styled';

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.blue100};
`;

const Text = styled.div<{ isClicked: boolean }>`
  cursor: pointer;
  ${({ theme }) => theme.typography.label1Bold}
  color: ${({ theme, isClicked }) => (isClicked ? theme.colors.blue700 : theme.colors.blue400)};
  transition: color 0.3s;
`;

export const TopicButton = ({ topicType, isClicked, setRankType, ...props }: TopicButtonType) => {
  let text = '?';
  const texts = ['받고 싶어한', '많이 선물한', '위시로 받은'];

  if (topicType === 'MANY_WISH') {
    text = texts[0];
  } else if (topicType === 'MANY_RECEIVE') {
    text = texts[1];
  } else if (topicType === 'MANY_WISH_RECEIVE') {
    text = texts[2];
  }
  return (
    <Button
      onClick={() => {
        setRankType(topicType);
      }}
      {...props}
    >
      <Text isClicked={isClicked}>{text}</Text>
    </Button>
  );
};
