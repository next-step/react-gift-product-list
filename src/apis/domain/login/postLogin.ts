import { apiInstance } from '@/apis/instance';
import { API_LOGIN_PATH } from './path';
import type { AxiosResponse } from 'axios';
import type { UserInfo } from './type';

type PostLoginParams = {
  email: string;
  password: string;
};

export const postLogin = async (
  params: PostLoginParams,
): Promise<AxiosResponse<{ data: UserInfo }>> => {
  return await apiInstance.post<{ data: UserInfo }>(API_LOGIN_PATH.base, params);
};
