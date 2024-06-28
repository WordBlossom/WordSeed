"use server"

import axios from "axios";
import { API_URL } from "@/config";
import { cookies } from "next/headers";


const params = { code: "4%2F0ATx3LY4oAoyPBlC9x2GVTJYYLZPFOyYjge8WEhG3hIwGyFFMf6abIT9FVTGgP0bhsRcoWg" }


const loginHandler = async () => {
  const response = await axios.get(`${API_URL}/account/login/google/callback`, { params })

  const refreshToken = await response.headers["refresh-token"]
  const accessToken = await response.headers["access-token"]

  cookies().set("refreshToken", refreshToken)
  cookies().set("accessToken", accessToken)

}
export default loginHandler