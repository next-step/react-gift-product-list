export interface UserInfo {
  name: string;
  email: string;
  authToken: string;
}

export const getUserInfo = (): UserInfo | null => {
  try {
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      if (parsed.name && parsed.email && parsed.authToken) {
        return parsed;
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to get user info:', error);
    return null;
  }
};

export const getAuthToken = (): string | null => {
  const userInfo = getUserInfo();
  return userInfo?.authToken || null;
};

export const clearUserInfo = (): void => {
  sessionStorage.removeItem('userInfo');
};

export const isLoggedIn = (): boolean => {
  return getUserInfo() !== null;
};
