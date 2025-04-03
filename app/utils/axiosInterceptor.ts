import axios from "axios";

let accessToken: string | null = null;

// 👉 Esta función la puedes llamar desde el login o refresco manual
export const setAccessToken = (token: string) => {
  accessToken = token;
};

// Crear instancia de axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // 🔐 Necesario para enviar cookies (refreshToken)
});

// Interceptor de solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta (manejo automático de renovación)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Solo intenta renovar si es 401 y no lo ha intentado antes
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`,
          {
            method: "POST",
            credentials: "include", // 🔐 Necesario para enviar la cookie
          }
        );

        const data = await refreshResponse.json();

        if (!refreshResponse.ok || !data.data?.token) {
          console.warn("❌ No se pudo renovar el token. Vuelve a iniciar sesión.");
          return Promise.reject(error);
        }

        // ✅ Guardamos nuevo accessToken en memoria
        accessToken = data.data.token;
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