import React, { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import type { UserInfo } from './AuthContext';
import { login as loginApi } from '@/lib/api';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const savedUserInfo = sessionStorage.getItem('kakaotech/userInfo');
    if (savedUserInfo) {
      try {
        return JSON.parse(savedUserInfo);
      } catch {
        sessionStorage.removeItem('kakaotech/userInfo');
        return null;
      }
    }
    return null;
  });

  const login = useCallback(async (email: string, password: string, onSuccess?: () => void) => {
    try {
      const response = await loginApi({ email, password });
      
      const newUserInfo: UserInfo = {
        email: response.email,
        name: response.name,
        authToken: response.authToken,
      };
      
      setUserInfo(newUserInfo);
      sessionStorage.setItem('kakaotech/userInfo', JSON.stringify(newUserInfo));

      if (onSuccess) {
        setTimeout(onSuccess, 0);
      }
    } catch (error: any) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        const errorMessage = error.response.data?.message || '로그인에 실패했습니다.';
        toast.error(errorMessage);
      } else {
        toast.error('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    sessionStorage.removeItem('kakaotech/userInfo');
  }, []);

  const isLoggedIn = !!userInfo;

  //리뷰 반영 : 의존성배열에 모두 추가
  const value = useMemo(() => ({ isLoggedIn, userInfo, login, logout }), [userInfo, isLoggedIn, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};