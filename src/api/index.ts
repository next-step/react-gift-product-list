import axios from 'axios';

// 환경 변수에서 기본 URL을 가져옴
const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    // 응답 데이터 가공이 필요하면 여기서 처리
    return response;
  },
  (error) => {
    // 에러 처리
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export async function loginApi(email: string, password: string) {
  const response = await axios.post('http://localhost:3000/api/login', {
    email,
    password,
  });
  return response.data.data;
}

export async function postOrder(orderData: any, authToken: string) {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const response = await axios.post(`${baseURL}/api/order`, orderData, {
    headers: {
      Authorization: authToken,
    },
  });
  return response.data.data;
}

export default apiClient;
