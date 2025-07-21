import API from './axiosInstance';

export const fetchProductSummary = async (productId: number) => {
  return API.get(`/api/products/${productId}`);
};