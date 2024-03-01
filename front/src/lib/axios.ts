import Axios from "axios";
import { API_URL } from "@/config";

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // 임시로 1로 설정함
    Authorization: `Bearer 1`,
  },
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
