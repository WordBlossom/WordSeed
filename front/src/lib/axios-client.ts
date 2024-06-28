
import Axios from "axios";
import { API_URL } from "@/config";
import { cookies } from "next/headers";


export const axiosClient = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // 임시로 1로 설정함
  },
});

axiosClient.interceptors.request.use((config) => {
  const auth_header = config.headers["x-auth-not-required"];
  if (auth_header) return config;

  const token = cookies().get("accessToken")?.value;
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
})

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
