import axios from "axios";

let accessToken: string | null = null;
let refreshTokenPromise: Promise<string> | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        refreshTokenPromise = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
        })
          .then(async (res) => {
            const data = await res.json();
            if (!res.ok || !data.data?.token) {
              throw new Error("No se pudo renovar el token");
            }
            accessToken = data.data.token;
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            return data.data.token as string; // ✅ TypeScript se asegura que nunca sea null
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      try {
        const newToken = await refreshTokenPromise;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("❌ Error al renovar token:", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
