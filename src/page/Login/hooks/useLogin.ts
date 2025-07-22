import { requests } from '@/api/requests';
import { useUserInfo } from '@/contexts/UserInfoContext';
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
  const { setLoginSession } = useUserInfo();

  const LoginAndStoreSession = async ({ username, password }: UserInfoProps): Promise<boolean> => {
    try {
      const userInfoData = await requests.fetchUserInfos({ username, password });
      setLoginSession(userInfoData);
      toast(userInfoData.email);
      return true;
    } catch {
      return false;
    }
  };

  return { LoginAndStoreSession };
};

export default useLogin;
