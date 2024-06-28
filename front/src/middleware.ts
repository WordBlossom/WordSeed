import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { axios } from './lib/axios'

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")
  axios.interceptors.request.use((config) => {
    const auth_header = config.headers["x-auth-not-required"];
    if (auth_header) return config;

    const token = cookies().get("accessToken")?.value;
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  })

  // if (!token) {
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/login'
  //   return NextResponse.rewrite(url)
  // }
  // console.log("middleware")
}