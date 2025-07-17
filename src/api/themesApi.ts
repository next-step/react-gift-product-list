import API from './axiosInstance';

export const fetchThemes = () => API.get('/api/themes');