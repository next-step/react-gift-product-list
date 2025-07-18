import axios from 'axios';
import { API_BASE_URL } from '../apiBaseUrl';
import type { UserInfoProps } from '@/page/Login/hooks/useLogin';

const fetchUserInfos = async ({ username, password }: UserInfoProps) => {
  const data = {
    email: `${username.value}`,
    password: `${password.value}`,
  };
  const headers = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(`${API_BASE_URL}/api/login`, data, headers);
  return response.data.data;
};

export default fetchUserInfos;
