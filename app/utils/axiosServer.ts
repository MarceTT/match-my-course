import axios from "axios";
import { cookies } from "next/headers";

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: false,
});

axiosServer.interceptors.request.use(async (config) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("next-auth.session-token")?.value;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default axiosServer;
