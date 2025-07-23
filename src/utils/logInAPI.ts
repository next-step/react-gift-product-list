import { loginUrl } from '@/constant/api';
import type { UserInfo } from '@/type/GiftAPI/user';
import axios from 'axios';


export async function logInAPI( email:string, password:string) : Promise<UserInfo> {
  try {
    const response = await axios.post<{ data: UserInfo }>(loginUrl, {
      email,
      password
    });
    return response.data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.data?.message);
    } else {
      throw new Error(`알수없는 에러`);
    }
  }
};