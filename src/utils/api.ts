import { BaseUrl } from '@/constant/api';
import axios from 'axios';

const AUTH_KEY = 'login_user';

const api = axios.create({
  baseURL: BaseUrl, 
});

api.interceptors.request.use(
  (config) => {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) {
      try {
        const user = JSON.parse(saved);
        const token = user.authToken;
        config.headers['Authorization'] = token;
      } catch (e) {
        console.error('토큰 가져오기 실패', e);
        localStorage.removeItem('login_user');
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;