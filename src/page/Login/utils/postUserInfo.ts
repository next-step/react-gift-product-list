import { API_BASE_URL } from '@/api/apiBaseUrl';
import { useUserInfo } from '@/contexts/UserInfoContext';
import axios from 'axios';

interface UserInfoProps {
  username: { value: string };
  password: { value: string };
}

const useLogin = () => {
  const { login } = useUserInfo();

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
        login(name, email, token);
      })
      .catch(error => {
        console.log(error.response.data.data.message);
        console.log(error.response.data.data.statusCode);
      });
  };
  return { postUserInfo };
};

export default useLogin;
