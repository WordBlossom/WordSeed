"use server"
import Axios from "axios";
import { API_URL } from "@/config";
import { cookies } from "next/headers";

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const auth_header = config.headers["x-auth-not-required"];
  if (auth_header) return config;

  const token = cookies().get("accessToken")?.value;
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
})

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
