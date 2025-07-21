import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  timeout: 3000,
});

export default apiClient;
