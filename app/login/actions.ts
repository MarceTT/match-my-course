"use server";

import { cookies } from "next/headers";

export async function loginAction(email: string, password: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok || data.message !== "success") {
      return {
        success: false,
        error: data.message || "Credenciales incorrectas",
      };
    }

    const token = data.data?.token;
    const refreshToken = res.headers
      .get("set-cookie")
      ?.match(/refreshToken=([^;]+)/)?.[1];

    if (!token || !refreshToken) {
      return {
        success: false,
        error: "No se pudieron obtener los tokens",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // cambia a true en producción
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 días
    });

    cookieStore.set("isLoggedIn", "true", {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

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
