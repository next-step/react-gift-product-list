import axios from 'axios';

const getFetch = async (object: string) => {
  const res = await axios.get(import.meta.env.VITE_API_BASE_URL + object);
  const data = res.data;
  return data;
};

const postFetch = async (object: string, body: Record<string, string> | null) => {
  const res = await axios.post(process.env.VITE_API_BASE_URL + object, body);
  const data = res.data;
  return data;
};
type HTTP_TYPES = 'GET' | 'POST';

export const ApiClient = async (
  methods: HTTP_TYPES,
  object: string,
  body: Record<string, string> | null
) => {
  if (methods == 'GET') {
    return getFetch(object);
  } else if (methods == 'POST') {
    return postFetch(object, body);
  }
};
