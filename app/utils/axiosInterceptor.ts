import axios from "axios";

let accessToken: string | null = null;

// 🔁 Función para sincronizar token desde AuthContext
export const setAccessToken = (token: string) => {
  accessToken = token;
};

// Crear instancia de Axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // necesario para que envíe cookies (refreshToken)
});

// Interceptor de solicitud: agrega el accessToken actual si existe
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta: si da 401, intenta renovar el token con la cookie
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include", // envía la cookie refreshToken
        });

        const data = await refreshRes.json();

        if (!refreshRes.ok || !data.data?.token) {
          console.warn("❌ No se pudo renovar el token. Debes volver a iniciar sesión.");
          return Promise.reject(error);
        }

        accessToken = data.data.token;

        // Actualizar el token en la solicitud original y en futuras
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