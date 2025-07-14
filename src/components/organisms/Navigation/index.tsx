import { useNavigate} from 'react-router-dom';
import * as S from './styles';
import { IconButton } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, User } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleBack = () => {
    navigate(-1); 
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate(isLoggedIn ? '/mypage' : '/login');
  };

  return (
    <S.Nav>
      <IconButton onClick={handleBack}>
        <ChevronLeft />
      </IconButton>
      
      <S.Logo onClick={handleLogoClick}
        src="/카카오톡 선물하기.webp" 
        alt="카카오톡 선물하기" 
      />
      
      <IconButton onClick={handleLoginClick}>
        <User />
      </IconButton>
    </S.Nav>
  );
};

export default Navigation; 