export const PROTOCOL = "http";
export const ENDPOINT = import.meta.env.VITE_REACT_GIFT_MOCK_SERVER_ENDPOINT;

const API_SECTIONS = {
  LOGIN: `api/login`,
  THEME: `api/themes`,
  PRODUCT: `api/products`,
  ORDER: `api/order`
};

const LOGIN_ENTRIES = (() => {
  const BASE = `${PROTOCOL}://${ENDPOINT}/${API_SECTIONS.LOGIN}`;
  return {
    BASE
  };
})();

const THEME_ENTRIES = (() => {
  const BASE = `${PROTOCOL}://${ENDPOINT}/${API_SECTIONS.THEME}`;
  return {
    BASE,
    DETAIL: (themeId: string) => `${BASE}/${themeId}`,
    INFO: (themeId: string) => `${BASE}/${themeId}/info`,
    PRODUCTS: (themeId: string) => `${BASE}/${themeId}/products`
  };
})();

const PRODUCT_ENTRIES = (() => {
  const BASE = `${PROTOCOL}://${ENDPOINT}/${API_SECTIONS.PRODUCT}`;
  return {
    BASE,
    INFO: {
      GENERAL: (productId: string) => `${BASE}/${productId}`,
      DETAIL: (productId: string) => `${BASE}/${productId}/detail`
    },
    WISH: (productId: string) => `${BASE}/${productId}/wish`,
    HIGHLIGHT_REVIEW: (productId: string) =>
      `${BASE}/${productId}/highlight-review`,
    SUMMARY: (productId: string) => `${BASE}/${productId}/summary`,
    RANKING: `${BASE}/ranking`
  };
})();

const ORDER_ENTRIES = (() => {
  const BASE = `${PROTOCOL}://${ENDPOINT}/${API_SECTIONS.ORDER}`;
  return {
    BASE
  };
})();

//Back-End api entries
export const BE = {
  PING: `${PROTOCOL}://${ENDPOINT}/ping`,
  API: {
    LOGIN: LOGIN_ENTRIES,
    THEME: THEME_ENTRIES,
    PRODUCT: PRODUCT_ENTRIES,
    ORDER: ORDER_ENTRIES
  }
};
