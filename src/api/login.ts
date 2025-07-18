import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { User } from "@/types/user";

type PostLoginParams = {
  email: string;
  password: string;
};

type PostLoginResult = User;

export const postLogin = async (
  params: PostLoginParams,
): Promise<PostLoginResult> => {
  return await axiosInstance.post(API_PATHS.LOGIN, params);
};
