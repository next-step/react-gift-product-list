import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DefaultDiv, SimplePadding20,  } from '../styles/Common.styled';

const My = () => {
  const auth = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/Login');
    auth.logOut();
  };
  return (
    <DefaultDiv>
      
      <SimplePadding20>
      <h1>마이 페이지</h1>
      <p>{auth.user?.name} 님 안녕하세요!</p>
      <p>이메일 주소는 {auth.user?.email} 입니다</p>
      <button onClick={handleLogout}>로그아웃</button>
      </SimplePadding20>
    </DefaultDiv>
  );
};

export default My;
