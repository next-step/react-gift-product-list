export const setCookieValue = (key: string, value: string, expiresHours: number = 1) => {
  if (typeof document === "undefined") return null;
  const expires = new Date();
  expires.setTime(expires.getTime() + expiresHours * 60 * 60 * 1000);
  document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
};

export const getCookieValue = (key: string) => {
  if (typeof document === "undefined") return null;
  const decodedCookie = decodeURIComponent(document.cookie);
  const matchValue = decodedCookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
  return matchValue ? matchValue[2] : null;
};

export const clearCookieValue = (key: string) => {
  if (typeof document === "undefined") return null;
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};
