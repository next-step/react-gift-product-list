export const USER_INFO_KEY = 'userInfo';

export interface UserInfo {
  email: string;
  name: string;
  authToken: string;
}

export function saveUserInfo(info: UserInfo) {
  sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(info));
}

export function loadUserInfo(): UserInfo | null {
  const stored = sessionStorage.getItem(USER_INFO_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as UserInfo;
  } catch {
    return null;
  }
}

export function clearUserInfo() {
  sessionStorage.removeItem(USER_INFO_KEY);
}
