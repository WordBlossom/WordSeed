import { axiosClient } from "./axios-client"
import { axiosServer } from "./axios-server"

export const axios = () => {
  if (typeof window === "undefined") {
    return axiosServer
  } else {
    return axiosClient
  }
}