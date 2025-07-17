import axios from 'axios';

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await axios.post('/api/login', { email, password });

  return response.data;
}

export async function fetchProductSummary(productId: number) {
  return axios.get(`/api/products/${productId}/summary`);
}
