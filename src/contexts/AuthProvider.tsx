import React, { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import type { UserInfo } from './AuthContext';
import { login as loginApi } from '@/lib/api/login';
import type { AxiosErrorResponse } from '@/types/api';
import { STORAGE_KEYS } from '@/data/storageKeys';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const savedUserInfo = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (savedUserInfo) {
      try {
        return JSON.parse(savedUserInfo);
      } catch {
        sessionStorage.removeItem(STORAGE_KEYS.USER_INFO);
        return null;
      }
    }
    return null;
  });

  const login = useCallback(async (email: string, password: string, onSuccess?: () => void) => {
    try {
      const response = await loginApi({ email, password });
      
      const newUserInfo: UserInfo = response;
      
      setUserInfo(newUserInfo);
      sessionStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(newUserInfo));
      onSuccess?.();

    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse;
      
      if (axiosError?.response) {
        const status = axiosError.response.status;
        const message = axiosError.response.data?.data?.message;

        switch (status) {
          case 400:
            toast.error(message || '로그인에 실패했습니다.');
            return;
          default:
            toast.error('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
            return;
        }
      } else {
        toast.error('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    sessionStorage.removeItem(STORAGE_KEYS.USER_INFO);
  }, []);

  const isLoggedIn = !!userInfo;

  //리뷰 반영 : 의존성배열에 모두 추가
  const value = useMemo(() => ({ isLoggedIn, userInfo, login, logout }), [userInfo, isLoggedIn, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};