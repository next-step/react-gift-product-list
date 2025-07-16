import axios from "axios";
import { BE } from "./apiEndPoints";
import instance from "./axios/instance";

const ALIVEMESSAGE = "pong~!@#$%^&*()";

export async function fetchServerAlive() {
  try {
    const response = await instance.get(BE.PING);
    if (!response || response.status !== 200) {
      return false;
    }

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

    if (!response || response.status !== 200) {
      return null;
    }

    const body = response.data;
    if (body.data.length <= 0) {
      return null;
    }
    console.log(body.data);
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

    if (!response || response.status !== 200) {
      return null;
    }

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
