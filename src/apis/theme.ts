import axios from 'axios';
import { BASE_API_URL } from './index';

export type Category = {
  themeId: number;
  name: string;
  image: string;
};

export const fetchThemes = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/themes`);

    const responseData = response.data;

    if (Array.isArray(responseData)) {
      return responseData;
    }

    if (responseData && Array.isArray(responseData.data)) {
      return responseData.data;
    }

    console.error('Unexpected API response structure:', responseData);
    return [];
  } catch (error) {
    console.error('API 호출 실패:', error);
    return [];
  }
};
