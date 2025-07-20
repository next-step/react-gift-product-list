import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

export const postLogin = (email: string, password: string) => {
  api.post('/api/login', { email, password });
};
