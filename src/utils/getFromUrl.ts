import axios from "axios";

export async function getFromUrl<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    throw new Error(`${url} 접근 실패,  ${(error as Error).message}`);
  }
}

