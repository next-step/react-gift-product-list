export * from './formUtils';
export * from './modalUtils';
export * from './phoneUtils';
export * from './rankingUtils';
export * from './recipientUtils';
export * from './validation';

export function setUserInfo(userInfo: {
  authToken: string;
  email: string;
  name: string;
}) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export function getUserInfo() {
  const data = localStorage.getItem('userInfo');
  return data ? JSON.parse(data) : null;
}
