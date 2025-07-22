import toast from 'react-hot-toast';
import apiClient from '@/api/apiClient';
import { useMutation } from '@/hooks/useMutation';

interface User {
  name: string;
  email: string;
  authToken: string;
}

function isValidUser(data: any): data is User {
  return (
    data &&
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.authToken === 'string'
  );
}

const getErrorMessage = (error: any): string => {
  if (error.response?.data?.message) return error.response.data.message;

  switch (error.response?.status) {
    case 400:
      return '잘못된 요청입니다. 이메일과 비밀번호를 확인해주세요.';
    case 401:
      return '이메일 또는 비밀번호가 잘못되었습니다.';
    case 404:
      return '존재하지 않는 계정입니다.';
    case 500:
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      if (error.message === 'Network Error') {
        return '네트워크 연결을 확인해주세요.';
      }
      return '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
  }
};

export const useLogin = () => {
  const { mutate, isLoading } = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const response = await apiClient.post<any>('/api/login', {
        email,
        password,
      });
      if (!isValidUser(response.data.data)) {
        throw new Error('Invalid user data');
      }
      return response.data.data as User;
    },
    {
      onSuccess: (user) => {
        sessionStorage.setItem(
          'userInfo',
          JSON.stringify({
            name: user.name,
            email: user.email,
            authToken: user.authToken,
          })
        );
        toast.success(`${user.name}님, 환영합니다!`);
      },
      onError: (error: any) => {
        const errorMessage = getErrorMessage(error);
        const stored = sessionStorage.getItem('userInfo');

        if (error.response?.status === 401 && stored) {
          toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
          sessionStorage.removeItem('userInfo');
        } else {
          toast.error(errorMessage);
        }
      },
    }
  );

  const login = async (email: string, password: string) => {
    return await mutate({ email, password });
  };

  return { login, isLoading };
};
