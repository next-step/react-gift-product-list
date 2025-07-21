import { API_BASE_URL, apiClient } from '../apiClient';
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
  const response = await apiClient.post(`${API_BASE_URL}/api/login`, data, headers);
  return response.data.data;
};

export default fetchUserInfos;
