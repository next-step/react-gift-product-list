import axios from './axiosInstance';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    email: string;
    name: string;
    authToken: string;
  };
}

export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>('/api/login', loginData);
  return response.data;
};