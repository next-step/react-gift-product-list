import axiosInstance from './axiosInstance';

export const fetchThemes = async () => {
  const res = await axiosInstance.get('/themes');
  return res.data;
};
