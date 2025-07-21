import {
  MypageContainer,
  MypageTitle,
  MypageContent,
  MypageLogoutBtn,
} from '@/styles/Mypage.styles';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';
import { useContext } from 'react';
import useLoginForm from '@/hooks/useLoginForm';
import { setAccessToken } from '@/apis/apiClient';

type MyPageProps = {
  onLogin: () => void;
};

function Mypage({ onLogin }: MyPageProps) {
  const { logOut } = useLoginForm();
  const { userInfo, setLoginInfo } = useContext(LoginInfoContext);

  function logout() {
    setLoginInfo({
      email: '',
      name: '',
      authToken: '',
    });
    logOut();
    setAccessToken(null);
    onLogin();
  }

  return (
    <MypageContainer>
      <MypageTitle>마이페이지</MypageTitle>
      <MypageContent>{userInfo.name}님 안녕하세요!</MypageContent>
      <MypageContent>이메일 주소는 {userInfo.email}입니다.</MypageContent>
      <MypageLogoutBtn onClick={logout}>로그아웃</MypageLogoutBtn>
    </MypageContainer>
  );
}

export default Mypage;
