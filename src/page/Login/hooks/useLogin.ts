import { API_BASE_URL } from '@/api/apiBaseUrl';
import { useUserInfo } from '@/contexts/UserInfoContext';
// import { useUserInfo } from '@/contexts/UserInfoContext';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface UserInfoProps {
  username: { value: string };
  password: { value: string };
}

const useLogin = () => {
  // TODO: const { login } = useUserInfo(); 이 코드를 LoginPage 에서 관리할지 useLogin.ts 에서 관리할지 고민중
  // TODO: state를 여기서 관리하지 않는다면 useLogin을 커스텀 훅이라고 할 수 있을까?
  const { login } = useUserInfo();
  // const [userInfos, setUserInfos] = useState({});
  const [error, setError] = useState<string | null>(null);

  const postUserInfo = async ({ username, password }: UserInfoProps) => {
    const data = {
      email: `${username.value}`,
      password: `${password.value}`,
    };
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios
      .post(`${API_BASE_URL}/api/login`, data, headers)
      .then(response => {
        const { name, email, token } = response.data.data;
        // setUserInfos({ name, email, token });
        login(name, email, token);
        toast(email);
      })
      .catch(error => {
        const status = error.response.data.data.statusCode;
        if (400 <= status && status < 500) {
          setError(error.response.data.data.message);
          toast(error.response.data.data.message);
        } else {
          setError('기타 에러 발생(서버 에러, 네트워크 에러 등)');
          toast('기타 에러 발생(서버 에러, 네트워크 에러 등)');
        }
      });
  };

  return { postUserInfo, error };
};

export default useLogin;
