import axios from "axios";

export async function getFromUrl(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

