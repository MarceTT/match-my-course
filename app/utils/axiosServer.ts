import axios from "axios";
import { cookies } from "next/headers";

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: false,
});

axiosServer.interceptors.request.use(async (config) => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("next-auth.session-token")?.value;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    // cookies() not available in this context (e.g., during prefetch or static generation)
    // Continue without authentication token - this is safe for public endpoints
    console.log('[axiosServer] Cookies not available in this context, continuing without auth token');
  }

  return config;
});

export default axiosServer;
