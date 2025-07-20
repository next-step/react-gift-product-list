import { LoginInfoContext } from '@/contexts/LoginInfoContext';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/ResetStyles';
import { useState, useEffect, type ReactNode } from 'react';
import type { LoginResponseDto } from '@/types/DTO/loginDTO';

export function Providers({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<LoginResponseDto>(() => {
    const saved = localStorage.getItem('userInfo');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { email: '', name: '', authToken: '' };
      }
    }
    return { email: '', name: '', authToken: '' };
  });

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <LoginInfoContext.Provider value={{ userInfo, setLoginInfo: setUserInfo }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </LoginInfoContext.Provider>
  );
}
