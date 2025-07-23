import axios from 'axios';

const storedUserInfo = sessionStorage.getItem('userInfo');
const token = storedUserInfo ? JSON.parse(storedUserInfo).authToken : '';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
  timeout: 3000,
});

export default authApi;
