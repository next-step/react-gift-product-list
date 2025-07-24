import publicApi from '@/apiClient/publicApi';

type UserInfo = {
  email: string;
  name: string;
  authToken: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

export const authService = async (payload: LoginPayload): Promise<UserInfo> => {
  const response = await publicApi.post('/api/login', payload);
  return {
    email: response.data.data.email,
    name: response.data.data.name,
    authToken: response.data.data.authToken,
  };
};
