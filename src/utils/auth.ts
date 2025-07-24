export const isLoggedIn = () => {
  const raw = localStorage.getItem('auth');
  if (!raw) return false;
  try {
    const { authToken } = JSON.parse(raw);
    return !!authToken;
  } catch {
    return false;
  }
};
