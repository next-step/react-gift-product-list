import { UserInfoContext } from '@/contexts/UserInfoContext';
import { useEffect, useState, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import { authService } from '@/services/authService';

type UserInfo = {
  email: string;
  name: string;
  authToken: string;
};

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const storedUserInfo = sessionStorage.getItem('userInfo');
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState({
    email: storedUserInfo ? JSON.parse(storedUserInfo).email : '',
    password: '',
  });

  useEffect(() => {
    if (!user.email) return;

    if (JSON.parse(storedUserInfo!)?.authToken) return;

    const login = async () => {
      try {
        const userInfo: UserInfo = await authService(user);
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsValid(true);
      } catch (error) {
        console.log('⚠️ 로그인 요청 처리 중 오류가 발생했습니다.', error);
        toast.warn('로그인 요청 처리 중 오류가 발생했습니다.', {
          style: {
            width: '25rem',
          },
        });
        setIsValid(false);
      }
    };
    login();
  }, [storedUserInfo, user]);

  return (
    <UserInfoContext.Provider value={{ isValid, user, setUser }}>
      {children}
    </UserInfoContext.Provider>
  );
};
