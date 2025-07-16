import baseHttp from "./baseHttp";

export const productSummary = async (productId: string) => {
  const response = await baseHttp.get(`/products/${productId}/summary`);
  return response.data;
};
