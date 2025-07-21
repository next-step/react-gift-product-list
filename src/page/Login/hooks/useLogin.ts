import { requests } from '@/api/requests';
import { useUserInfo } from '@/contexts/UserInfoContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface UserInfoProps {
  username: { value: string };
  password: { value: string };
}

export interface UserInfoData {
  name: string;
  email: string;
  authToken: string;
}

const useLogin = () => {
  // TODO: const { login } = useUserInfo(); 이 코드를 LoginPage 에서 관리할지 useLogin.ts 에서 관리할지 고민중
  // TODO: state를 여기서 관리하지 않는다면 useLogin을 커스텀 훅이라고 할 수 있을까?
  const { login } = useUserInfo();

  const postUserInfo = async ({ username, password }: UserInfoProps): Promise<boolean> => {
    try {
      const data = await requests.fetchUserInfos({ username, password });
      const { name, email, authToken } = data;
      login(name, email, authToken);
      toast(email);
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.data?.data?.statusCode;
        toast(
          status && status >= 400 && status < 500
            ? error.response?.data?.data?.message
            : '기타 에러 발생(서버 에러, 네트워크 에러 등)'
        );
      }
      return false;
    }
  };

  return { postUserInfo };
};

export default useLogin;
