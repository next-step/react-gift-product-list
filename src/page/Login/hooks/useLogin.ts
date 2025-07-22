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

  const loginAndStoreSession = async ({ username, password }: UserInfoProps): Promise<boolean> => {
    try {
      const userInfoData = await requests.fetchUserInfos({ username, password });
      setLoginSession(userInfoData);
      toast(userInfoData.email);
      return true;
    } catch {
      return false;
    }
  };

<<<<<<< HEAD
  return { loginAndStoreSession };
=======
  return {  LoginAndStoreSession };
>>>>>>> c38a96a (fix: 함수 네이밍 구체화)
};

export default useLogin;
