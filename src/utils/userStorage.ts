export interface UserInfo {
  authToken: string;
  email: string;
  name: string;
}

const KEY = 'userInfo';

export const userStorage = {
  set: (userInfo: UserInfo) => {
    localStorage.setItem(KEY, JSON.stringify(userInfo));
  },

  get: (): UserInfo | null => {
    const data = localStorage.getItem(KEY);
    if (!data) return null;

    try {
      return JSON.parse(data) as UserInfo;
    } catch (e) {
      console.error('userStorage: JSON 파싱 에러입니다.', e);
      return null;
    }
  },

  clear: () => {
    localStorage.removeItem(KEY);
  },

  exists: (): boolean => {
    return !!localStorage.getItem(KEY);
  },
};