"use server";

import { cookies } from "next/headers";


export async function refreshAccessToken(): Promise<string | null> {
    const token = (await cookies()).get("refreshToken")?.value;

    if (!token) {
        console.error("❌ No hay refreshToken en las cookies.");
        (await cookies()).delete("refreshToken");
        return null;
    }
    console.log("🔥 Token de refresh:", token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Cookie": `refreshToken=${token}` },
        credentials: "include", // Para enviar las cookies de sesión
    });

    const responseData = await res.json();

    if (!res.ok || !responseData.data) {
        console.warn("⚠️ Refresh token expirado. Eliminando sesión y redirigiendo...");
        (await cookies()).delete("refreshToken"); // 🔥 Eliminar cookie
        return null; // 🔥 Forzar logout
    }

    return responseData.data.token;
}