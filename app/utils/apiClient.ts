"use client";

import axios from "axios";

// Crear instancia completamente aislada para el cliente
const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: false,
});

// Variables para manejo de cola de requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
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
        }).then(token => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return clientAxios(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const sessionResponse = await fetch('/api/auth/session');
        const session = await sessionResponse.json();
        const refreshToken = session?.user?.refreshToken;

        if (!refreshToken) {
          processQueue(error, null);
          if (typeof window !== 'undefined') {
            window.location.href = '/api/auth/signout?callbackUrl=/login';
          }
          return Promise.reject(error);
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-refresh-token": refreshToken,
          },
        });

        const result = await response.json();

        if (!response.ok || !result.data?.accessToken) {
          throw new Error("Token refresh failed");
        }

        const newAccessToken = result.data.accessToken;
        processQueue(null, newAccessToken);
        
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return clientAxios(originalRequest);

      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
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