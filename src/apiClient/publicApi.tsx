import axios from 'axios';

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  timeout: 3000,
});

export default publicApi;
