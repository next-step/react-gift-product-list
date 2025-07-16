import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/contexts/LoginContext';
import { PATH } from '@/constants/paths';
import { Button, Container, Msg, Title } from './styles';

const MyPage = () => {
    const { logout, userInfo } = useLogin();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(PATH.HOME, { replace: true });
    };

    const username = userInfo ? userInfo.email.split('@')[0] : '';

    return (
        <Container>
            <Title>마이페이지</Title>
            {userInfo && (
                <>
                    <Msg>{username}님 안녕하세요!</Msg>
                    <Msg>이메일 주소는 {userInfo.email} 입니다.</Msg>
                </>
            )}
            <Button onClick={handleLogout}>로그아웃</Button>
        </Container>
    );
};
export default MyPage;
