import axios from "axios";

let accessToken: string | null = null;

// ✅ Esta función se llama desde el loginAction para sincronizar el token inicial
export const setAccessToken = (token: string) => {
  accessToken = token;
};

// Creamos una instancia personalizada de Axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // 🔐 necesario para enviar cookies como refreshToken
});

// Interceptor de solicitud: agrega el accessToken si existe
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta: intenta renovar el token si da 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include", // ✅ envía la cookie refreshToken
        });

        const data = await refreshRes.json();

        if (!refreshRes.ok || !data.data?.token) {
          console.warn("❌ No se pudo renovar el token. Debes volver a iniciar sesión.");
          accessToken = null;
          return Promise.reject(error);
        }

        // 🔁 Actualizamos el token en memoria
        accessToken = data.data.token;

        // 🔁 Lo inyectamos en el header y reintentamos
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
