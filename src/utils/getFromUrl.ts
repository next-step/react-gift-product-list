import axios from "axios";

export async function getFromUrl(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`${url} 접근 실패,  ${(error as Error).message}`);
  }
}

