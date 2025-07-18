export interface User {
  email: string;
  name: string;
  authToken: string;
  // 필요시 더 추가 가능 (id 등)
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
