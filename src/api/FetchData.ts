import axios, { AxiosError } from 'axios';

//object : 목적 대상 ex) login, themes 등
const getFetch = async (object: string, params: string) => {
  const res = await axios.get(import.meta.env.VITE_API_BASE_URL + object + params);
  const data = res.data;
  return data;
};

const postFetch = async (object: string, body: Record<string, string> | null) => {
  //console.log(`postFetch process : object : ${object} , body : ${body && body.toString()}`);
  try {
    const res = await axios.post(import.meta.env.VITE_API_BASE_URL + object, body);
    const data = res.data.data;
    return data;
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      return error.response?.data.data;
    } else {
      return error;
    }
  }
};
type HttpTypes = 'GET' | 'POST';

export const apiClient = async (
  methods: HttpTypes,
  object: string,
  body: Record<string, string> | null,
  params: string
) => {
  if (methods == 'GET') {
    return getFetch(object, params);
  } else if (methods == 'POST') {
    return postFetch(object, body);
  }
};
