import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { api } from '@/services/api';
import { useHTTP } from '@/hooks/useHTTP';

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponseBody = {
  email: string;
  name: string;
  authToken: string;
};

export async function logIn(body?: LoginRequestBody) {
  const { data: response } = await api.post<BaseResponse<LoginResponseBody>>('/login', body);
  return response.data;
}

export const useLogIn = () => {
  return useHTTP<LoginRequestBody, LoginResponseBody>({
    apiFunction: logIn,
    onError: error => {
      if (!isAxiosError(error)) throw error;
      switch (error.response?.status) {
        case 400:
          toast.error('잘못된 요청입니다. 입력한 정보를 확인해주세요.');
          break;
        default:
          toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
          break;
      }
    },
  });
};
