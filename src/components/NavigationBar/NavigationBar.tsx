import { ChevronLeft, UserRound } from 'lucide-react';
import * as S from './NavigationBar.styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PATH } from '@/constants/paths';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const goToBack = () => {
    navigate(-1);
  };

  const goToLogin = () => {
    if (userInfo) {
      navigate(PATH.MY_PAGE); // 로그인됨
    } else {
      navigate(PATH.LOGIN); // 로그인안됨
    }
  };

  return (
    <S.Wrapper>
      <ChevronLeft size={28} onClick={goToBack} style={{ cursor: 'pointer' }} />
      <S.Title>선물하기</S.Title>
      <UserRound size={25} onClick={goToLogin} style={{ cursor: 'pointer' }} />
    </S.Wrapper>
  );
};

export default NavigationBar;
