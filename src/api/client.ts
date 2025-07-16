const BASE_URL = 'http://localhost:3000';

export const fetcher = async (
  endpoint: string,
  errorMessage: string
) => {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(errorMessage);
  }
  return res.json();
};
