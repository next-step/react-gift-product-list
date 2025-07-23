import { UserInfoContext } from '@/contexts/UserInfoContext';
import { useEffect, useState, type ReactNode } from 'react';
import apiClient from '@/api/apiClient';
import { Bounce, toast } from 'react-toastify';

type UserInfo = {
  email: string;
  name: string;
  authToken: string;
};

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const storedUserInfo = sessionStorage.getItem('userInfo');
  const [user, setUser] = useState({
    email: storedUserInfo ? JSON.parse(storedUserInfo).email : '',
    password: '',
  });

  useEffect(() => {
    if (!user.email) return;

    if (JSON.parse(storedUserInfo!)?.authToken) return;

    const login = async () => {
      try {
        const response = await apiClient.post('/api/login', user);
        const userInfo: UserInfo = {
          email: response.data.data.email,
          name: response.data.data.name,
          authToken: response.data.data.authToken,
        };
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      } catch (error) {
        console.log('⚠️ 로그인 요청 처리 중 오류가 발생했습니다.', error);
        toast.warn('⚠️ 로그인 요청 처리 중 오류가 발생했습니다.', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
          style: {
            width: '25rem',
            color: 'black',
            backgroundColor: 'white',
          },
        });
      }
    };
    login();
  }, [storedUserInfo, user]);

  return <UserInfoContext.Provider value={{ user, setUser }}>{children}</UserInfoContext.Provider>;
};
