import axios from 'axios';
import { BASE_API_URL } from './index';

export const fetchThemes = async () => {
  const res = await axios.get(`${BASE_API_URL}/api/themes`);
  return res.data;
};
