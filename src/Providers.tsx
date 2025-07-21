import { LoginInfoContext } from '@/contexts/LoginInfoContext';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/ResetStyles';
import { useState, useEffect, type ReactNode } from 'react';
import type { LoginResponseDto } from '@/types/DTO/loginDTO';

export function Providers({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<LoginResponseDto>({
    email: '',
    name: '',
    authToken: '',
  });
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return (
    <LoginInfoContext.Provider value={{ userInfo, setLoginInfo: setUserInfo }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </LoginInfoContext.Provider>
  );
}
