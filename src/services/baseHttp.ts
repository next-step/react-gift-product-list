import axios from "axios";

const baseHttp = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default baseHttp;
