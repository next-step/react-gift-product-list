import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { User } from "@/types/user";

export const postLogin = async (
  email: string,
  password: string,
): Promise<User> => {
  return await axiosInstance.post(API_PATHS.LOGIN, {
    email,
    password,
  });
};
