import styled from '@emotion/styled';
import { Header } from '../components/common/Header';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const InfoP = styled.p`
  padding: 5px;
`;

const LogoutButton = styled.button`
  border-radius: 2px;
  border: none;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.gray300};
`;

function MyPage() {
  const { userInfo, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Header></Header>
          <br />
          <h1>마이페이지</h1>
          <br />
          <InfoP>{userInfo?.name}님 안녕하세요!</InfoP>
          <InfoP>이메일 주소는 {userInfo?.email}입니다!</InfoP>
          <br />
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
}

export default MyPage;
