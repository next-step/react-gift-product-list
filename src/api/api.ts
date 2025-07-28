import axios from 'axios';
import { clearUserInfo } from '@/utils/userInfo';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000', 
  // 필요하다면 withCredentials, headers 등 추가 설정
});
api.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status;
    const msg = err.response?.data?.message || err.message;

    if (status === 401) {
      clearUserInfo();
      // 리다이렉트는 window.location으로
      window.location.replace('/login');
      return Promise.reject(err);
    }

    if (status >= 400 && status < 500) {
      toast.error(msg);
    }

    return Promise.reject(err);
  }
);

export default api;
