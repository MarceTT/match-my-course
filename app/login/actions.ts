"use server";

import { setAccessToken } from "../utils/axiosInterceptor";

export async function loginAction(email: string, password: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
  
      const data = await res.json();
  
      if (!res.ok || data.message !== "success") {
        return {
          success: false,
          error: data.message || "Credenciales incorrectas",
        };
      }
  
      const token = data.data?.token;
  
      if (!token) {
        return {
          success: false,
          error: "No se pudo obtener el token",
        };
      }
  
      // Sincronizar token con interceptor
      setAccessToken(token);
  
      return {
        success: true,
        user: data.data.user || null,
        error: null,
      };
    } catch (error) {
      console.error("❌ Error al hacer login:", error);
      return {
        success: false,
        error: "Ocurrió un error al iniciar sesión",
      };
    }
  }