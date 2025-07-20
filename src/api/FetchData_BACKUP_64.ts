<<<<<<< HEAD
import axios, { AxiosError } from 'axios';

//requestName : 목적 대상 ex) login, themes 등
const getFetch = async (requestName: string, params: string) => {
  const res = await axios.get(import.meta.env.VITE_API_BASE_URL + requestName + params);
=======
import axios from 'axios';

const getFetch = async (object: string, params: string) => {
  const res = await axios.get(import.meta.env.VITE_API_BASE_URL + object + params);
>>>>>>> 96a15ab3bb8bb80b0a856717d7ac39bba9f24343
  const data = res.data;
  return data;
};

<<<<<<< HEAD
const postFetch = async <T extends object>(
  requestName: string,
  body: T,
  headers: { Authorization: string } | null
) => {
  try {
    const res =
      headers === null
        ? await axios.post(import.meta.env.VITE_API_BASE_URL + requestName, body)
        : await axios.post(import.meta.env.VITE_API_BASE_URL + requestName, body, { headers });
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

export const apiClient = async <T extends object>(
  methods: HttpTypes,
  requestName: string,
  body: T,
  params: string,
  headers: { Authorization: string } | null
) => {
  if (methods == 'GET') {
    return getFetch(requestName, params);
  } else if (methods == 'POST') {
    return postFetch(requestName, body, headers);
=======
const postFetch = async (object: string, body: Record<string, string> | null) => {
  const res = await axios.post(process.env.VITE_API_BASE_URL + object, body);
  const data = res.data;
  return data;
};
type httpTypes = 'GET' | 'POST';

export const ApiClient = async (
  methods: httpTypes,
  object: string,
  body: Record<string, string> | null,
  params: string
) => {
  if (methods == 'GET') {
    return getFetch(object, params);
  } else if (methods == 'POST') {
    return postFetch(object, body);
>>>>>>> 96a15ab3bb8bb80b0a856717d7ac39bba9f24343
  }
};
