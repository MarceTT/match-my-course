"use server";

import { cookies } from "next/headers";
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
      const setCookieHeaders = res.headers.getSetCookie?.() || [];
  
      const refreshToken = setCookieHeaders
        .find((c) => c.startsWith("refreshToken="))
        ?.split(";")[0]
        ?.split("=")[1];
  
      if (!token || !refreshToken) {
        return {
          success: false,
          error: "No se pudieron obtener los tokens",
        };
      }
  
      const cookieStore = cookies();
  
      const isProduction = process.env.NODE_ENV === "production";
  
      (await cookieStore).set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
  
      (await cookieStore).set("isLoggedIn", "true", {
        httpOnly: false,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
  
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