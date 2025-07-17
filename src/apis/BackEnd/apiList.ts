import axios from "axios";
import { BE } from "./apiEndPoints";
import instance from "./axios/instance";

const ALIVEMESSAGE = "pong~!@#$%^&*()";

function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.data?.message
    };
  }

  throw {
    status: 500,
    message: "알 수 없는 오류입니다."
  };
}

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
    handleError(error);
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
    handleError(error);
  }
}

export const LOGIN_CODE = { WRONG_FORMAT: 400 };
export async function postLogin(email: string, password: string) {
  try {
    const response = await instance.post(BE.API.LOGIN.BASE, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export const PRODUCT_SUMMARY_CODE = { NO_PRODUCT: 404 };
export async function fetchProductSummary(id: string) {
  try {
    const response = await instance.get(BE.API.PRODUCT.SUMMARY(id));
    const body = response.data;
    return body.data;
  } catch (error) {
    handleError(error);
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

export const ORDER_CODE = { NOT_VALID: 400, LOGIN_REQUIRED: 401 };
export async function postOrder(orderInfo: OrderBody, authToken: string) {
  try {
    const response = await instance.post(BE.API.ORDER.BASE, orderInfo, {
      headers: {
        Authorization: `${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
