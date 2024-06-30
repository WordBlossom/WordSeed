"use client"
import Axios from "axios";
import { API_URL } from "@/config";

export const axiosClient = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const auth_header = config.headers["x-auth-not-required"];
  if (auth_header) return config;

  const token = document.cookie.split('accessToken=')[1].split(';')[0];
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
