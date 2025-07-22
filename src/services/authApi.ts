import api from '@/lib/axiosInstance';

export const FetchLogin = (body, token) => {
  return api.post('/login', body).then((res) => res.data);
};
