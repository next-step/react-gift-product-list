import axios, { AxiosError } from 'axios';
import type { HttpTypes } from './HttpType';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
//requestName : 목적 대상 ex) login, themes 등
const getFetch = async (requestName: string, params: string) => {
  const res = await axios.get(BASE_URL + requestName + params);
  const data = res.data;
  return data;
};

const postFetch = async <T extends object>(
  requestName: string,
  body: T,
  headers: { Authorization: string } | null
) => {
  try {
    const res =
      headers === null
        ? await axios.post(BASE_URL + requestName, body)
        : await axios.post(BASE_URL + requestName, body, { headers });
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

type ApiParameters = {
  methods: HttpTypes;
  requestName: string;
  body: object;
  params: string;
  headers: { Authorization: string } | null;
};

export const apiClient = async (parameters: ApiParameters) => {
  if (parameters.methods == 'GET') {
    return getFetch(parameters.requestName, parameters.params);
  } else if (parameters.methods == 'POST') {
    return postFetch(parameters.requestName, parameters.body, parameters.headers);
  }
};
