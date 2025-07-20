import { createContext } from 'react';
import type { LoginResponseDto } from '@/types/DTO/loginDTO';

export type LoginInfoContextType = {
  userInfo: LoginResponseDto;
  setLoginInfo: (value: LoginResponseDto) => void;
};

export const LoginInfoContext = createContext<LoginInfoContextType>({
  userInfo: {
    email: '',
    name: '',
    authToken: '',
  },
  setLoginInfo: () => {},
});
