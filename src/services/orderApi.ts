import api from '@/lib/axiosInstance';

export const fetchProductSummary = (product_id: number) => {
  return api
    .get(`/products/${product_id}/summary`)
    .then((res) => res.data.data);
};

export const fetchOrder = async (body, token) => {
  return api
    .post(`/order`, body, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
};
