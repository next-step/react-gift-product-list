import apiClient from '@/api/apiClient';
import toast from 'react-hot-toast';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  authToken: string;
  userName: string;
}

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials
    );

    const userInfo = {
      authToken: response.data.authToken,
      userName: response.data.userName,
    };
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || '로그인에 실패했습니다.');
    throw error;
  }
};
