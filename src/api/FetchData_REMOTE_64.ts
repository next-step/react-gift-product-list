import axios from 'axios';

const getFetch = async (object: string, params: string) => {
  const res = await axios.get(import.meta.env.VITE_API_BASE_URL + object + params);
  const data = res.data;
  return data;
};

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
  }
};
