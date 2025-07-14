import { BE } from "./apiEndPoints";

const ALIVEMESSAGE = "pong~!@#$%^&*()";

export async function fetchServerAlive() {
  const response = await fetch(BE.PING);
  if (!response.ok) {
    return false;
  }

  const body = await response.json();
  return body.data === ALIVEMESSAGE;
}

export async function fetchThemes() {
  const response = await fetch(BE.API.THEME.BASE);
  if (!response.ok) {
    return null;
  }

  const body = await response.json();
  if (body.data.length <= 0) {
    return null;
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await delay(1000);

  return body.data;
}
