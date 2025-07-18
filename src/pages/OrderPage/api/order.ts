import axios from 'axios';

export const createOrder = async (data: any, authToken: string) => {
  try {
    const response = await axios.post('http://localhost:3000/api/order', data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};
