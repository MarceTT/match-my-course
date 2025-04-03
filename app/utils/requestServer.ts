"use server";

import { cookies } from "next/headers";

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  if (!refreshToken) {
    console.warn("❌ No hay refreshToken en las cookies.");
    return null;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok || !data.data?.token) {
      console.warn("⚠️ Token no renovado. Eliminando cookies.");
      (await cookies()).delete("refreshToken");
      (await cookies()).delete("isLoggedIn");
      return null;
    }

    return data.data.token;
  } catch (err) {
    console.error("❌ Error al renovar token:", err);
    return null;
  }
}