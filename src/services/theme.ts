import baseHttp from "./baseHttp";

export const getThemeInfo = async (themeId: string) => {
  const { data } = await baseHttp.get(`/themes/${themeId}/info`);
  return data.data;
};

export const getThemeProduct = async (themeId: string) => {
  const product = await baseHttp.get(`/themes/${themeId}/products`);
  return product.data;
};
