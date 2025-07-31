import apiClient from '@/api/apiClient';
import { createStorage } from '@/utils/creaateStorage';
import { withError } from '@/utils/withError';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  authToken: string;
  userName: string;
}

const userInfoStorage = createStorage<LoginResponse>('userInfo');

const rawLogin = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    '/auth/login',
    credentials
  );
  return response.data;
};

export const login = withError(rawLogin, {
  onSuccess: userInfoStorage.set,
  onError: (error) => {
    if ((error as any)?.response?.status === 401) {
      userInfoStorage.clear();
    }
  },
});
