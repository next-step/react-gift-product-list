import { BE } from "./apiEndPoints";
import axios from "./axios/instance";

const ALIVEMESSAGE = "pong~!@#$%^&*()";

const GETRequest = async (url: string) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error("GET Request failed, ", error);
    return null;
  }
};

export async function fetchServerAlive() {
  const response = await GETRequest(BE.PING);
  if (!response || response.status !== 200) {
    return false;
  }

  const body = response.data;
  return body.data === ALIVEMESSAGE;
}

export async function fetchThemes() {
  const response = await GETRequest(BE.API.THEME.BASE);

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
}

export async function fetchRealTimeRankings(
  targetType: string,
  rankType: string
) {
  const response = await GETRequest(
    BE.API.PRODUCT.RANKING + `?targetType=${targetType}&rankType=${rankType}`
  );

  if (!response || response.status !== 200) {
    return null;
  }

  const body = response.data;

  return body.data;
}
