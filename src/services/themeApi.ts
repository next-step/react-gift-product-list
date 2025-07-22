import api from '@/lib/axiosInstance';

export const fetchCategories = async () => {
  return await api.get('/themes').then((res) => res.data.data);
};
