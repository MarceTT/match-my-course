"use server";

import { cookies } from "next/headers";
import { setAccessToken } from "../utils/axiosInterceptor";

export async function loginAction(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "omit", // 🚫 omitimos para no depender del backend
    });

    const data = await res.json();

    if (!res.ok || data.message !== "success") {
      return {
        success: false,
        error: data.message || "Credenciales incorrectas",
      };
    }

    const token = data.data?.token;
    const refreshToken = data.data?.refreshToken;

    if (!token || !refreshToken) {
      return {
        success: false,
        error: "No se pudieron obtener los tokens",
      };
    }

    const isProduction = process.env.NODE_ENV === "production";
    const cookieStore = cookies();

    // ✅ Setear manualmente la cookie
    (await cookieStore).set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    // ✅ Establece el token en el interceptor
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
