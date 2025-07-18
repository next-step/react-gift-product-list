import { API_BASE_URL } from '@/api/apiBaseUrl';
import { useUserInfo } from '@/contexts/UserInfoContext';
// import { useUserInfo } from '@/contexts/UserInfoContext';
import axios from 'axios';
import { useState } from 'react';

interface UserInfoProps {
  username: { value: string };
  password: { value: string };
}

const useLogin = () => {
  // TODO: const { login } = useUserInfo(); 이 코드를 LoginPage 에서 관리할지 useLogin.ts 에서 관리할지 고민중
  // TODO: state를 여기서 관리하지 않는다면 useLogin을 커스텀 훅이라고 할 수 있을까?
  const { login } = useUserInfo();
  // const [userInfos, setUserInfos] = useState({});
  const [error, setError] = useState(false);

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
        const name = response.data.data.name;
        const email = response.data.data.email;
        const token = response.data.data.authToken;
        // setUserInfos({ name, email, token });
        login(name, email, token);
      })
      .catch(error => {
        setError(true);
        console.log(error.response.data.data.message);
        console.log(error.response.data.data.statusCode);
      });
  };
  return { postUserInfo, error };
};

export default useLogin;
