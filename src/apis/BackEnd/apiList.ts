import { BE } from "./apiEndPoints";

const ALIVEMESSAGE = "pong~!@#$%^&*()";

export async function fetchServerAlive() {
  console.log(BE.PING);
  const response = await fetch(BE.PING);

  if (!response.ok) {
    return false;
  }

  const body = await response.json();
  return body.data === ALIVEMESSAGE;
}
