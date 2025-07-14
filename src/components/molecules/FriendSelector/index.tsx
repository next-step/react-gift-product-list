import { useAuth } from '@/contexts/AuthContext';
import * as S from './styles';
import { Plus } from 'lucide-react';

const FriendSelector = () => {
  const { userInfo } = useAuth();

  const getUserName = (email: string) => {
    return email.split('@')[0];
  };

  const getMessage = () => {
    if (userInfo?.email) {
      const userName = getUserName(userInfo.email);
      return `${userName}님! 선물할 친구를 선택해 주세요.`;
    }
    return '선물할 친구를 선택해 주세요.';
  };

  return (
    <S.Section>
      <S.Button>
        <S.IconContainer>
          <Plus />
        </S.IconContainer>
        <S.Text>{getMessage()}</S.Text>
      </S.Button>
    </S.Section>
  );
};

export default FriendSelector; 