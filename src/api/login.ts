import apiClient from '@/api/apiClient';

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
    if (error?.response?.status === 401) {
      sessionStorage.removeItem('userInfo');
    }
    throw error;
  }
};
