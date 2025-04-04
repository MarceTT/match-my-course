import { auth } from "@/auth";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.user?.accessToken;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = await getSession();
        const refreshToken = session?.user?.refreshToken;

        if (!refreshToken) {
          await signOut({ callbackUrl: "/login" });
          return Promise.reject(error);
        }

        // Usamos la función de refresh de NextAuth para mantener consistencia
        const newSession = await auth();
        
        if (newSession?.error === "RefreshAccessTokenError") {
          await signOut({ callbackUrl: "/login" });
          return Promise.reject(error);
        }

        const newToken = newSession?.user?.accessToken;
        
        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        await signOut({ callbackUrl: "/login" });
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;