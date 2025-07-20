import axios, { AxiosError } from 'axios';

//requestName : 목적 대상 ex) login, themes 등
const getFetch = async (requestName: string, params: string) => {
  const res = await axios.get(import.meta.env.VITE_API_BASE_URL + requestName + params);
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
  }
};
