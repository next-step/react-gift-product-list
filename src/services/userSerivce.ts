import axios from 'axios';

export const fetchData = async (word: string) => {
  const url = process.env.$VITE_API_BASE_URL + word;

  //TODO
  const response = await axios.get<unknown>(url);

  return response.data;
};
