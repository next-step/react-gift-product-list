import axios from "axios";
import { BE } from "./apiEndPoints";
import instance from "./axios/instance";

const ALIVEMESSAGE = "pong~!@#$%^&*()";

export async function fetchServerAlive() {
  try {
    const response = await instance.get(BE.PING);
    const body = response.data;
    return body.data === ALIVEMESSAGE;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function fetchThemes() {
  try {
    const response = await instance.get(BE.API.THEME.BASE);
    const body = response.data;
    if (body.data.length <= 0) {
      return null;
    }
    // function delay(ms: number) {
    //   return new Promise((resolve) => setTimeout(resolve, ms));
    // }
    // await delay(1000); // For testing pending state rendering... remove on production

    return body.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchRealTimeRankings(
  targetType: string,
  rankType: string
) {
  try {
    const response = await instance.get(
      BE.API.PRODUCT.RANKING + `?targetType=${targetType}&rankType=${rankType}`
    );
    const body = response.data;
    return body.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchLogin(email: string, password: string) {
  try {
    const response = await instance.post(BE.API.LOGIN.BASE, {
      email,
      password
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response ?? null;
    } else {
      console.error(error);
    }
    return null;
  }
}

export async function fetchProductSummary(id: string) {
  try {
    const response = await instance.get(BE.API.PRODUCT.SUMMARY(id));
    const body = response.data;
    return body.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response ?? null;
    } else {
      console.error(error);
    }
    return null;
  }
}

export type OrderBody = {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
};

export async function fetchOrder(orderInfo: OrderBody, authToken: string) {
  try {
    const response = await instance.post(BE.API.ORDER.BASE, orderInfo, {
      headers: {
        Authorization: `${authToken}`
      }
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response ?? null;
    } else {
      console.error(error);
    }
    return null;
  }
}

export async function fetchThemeInfo(themeId: string) {
  try {
    const response = await instance.get(BE.API.THEME.INFO(themeId));
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response ?? null;
    } else {
      console.error(error);
    }
    return null;
  }
}

export async function fetchThemeProducts(
  themeId: string,
  cursor: number = 0,
  limit: number = 10
) {
  try {
    const response = await instance.get(
      BE.API.THEME.PRODUCTS(themeId) + `?cursor=${cursor}&limit=${limit}`
    );

    function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await delay(1000);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response ?? null;
    } else {
      console.error(error);
    }
    return null;
  }
}
