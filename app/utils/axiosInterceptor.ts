import axios from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // Necesario para enviar el refreshToken
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

      try {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include", // Enviar cookie refreshToken
        });

        const data = await refreshRes.json();

        if (!refreshRes.ok || !data.data?.token) {
          console.warn("❌ No se pudo renovar el token. Debes volver a iniciar sesión.");
          return Promise.reject(error);
        }

        accessToken = data.data.token;

        // Aplica el nuevo token a la petición original y a futuras
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

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
