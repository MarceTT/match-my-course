"use client";

import axios from "axios";

// Crear instancia completamente aislada para el cliente
const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: false,
});

// Variables para manejo de cola de requests
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: string) => void; reject: (reason: any) => void }> = [];

const processQueue = (error: any, token: string | null) => {
  const queue = [...failedQueue];
  failedQueue = [];
  queue.forEach(({ resolve, reject }) => {
    if (error || !token) reject(error || new Error("No token"));
    else resolve(token);
  });
};

// Request interceptor - solo para cliente
clientAxios.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined') return config;
  
  try {
    const response = await fetch('/api/auth/session');
    const session = await response.json();
    const token = session?.user?.accessToken;
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting session for request:', error);
  }
  
  return config;
});

// Response interceptor - manejo de tokens expirados
clientAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return clientAxios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      try {
        // Pedir la sesión: el callback JWT de NextAuth refrescará si venció
        const res = await fetch('/api/auth/session', { cache: 'no-store' });
        const data = await res.json();
        const newToken = data?.user?.accessToken as string | undefined;
        if (!newToken) throw new Error('No access token in session');
        processQueue(null, newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return clientAxios(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing via NextAuth session:', refreshError);
        processQueue(refreshError, null);
        if (typeof window !== 'undefined') {
          window.location.href = '/api/auth/signout?callbackUrl=/login';
        }
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default clientAxios;
