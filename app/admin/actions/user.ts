"use server";

import { User } from "@/app/types";
import { refreshAccessToken } from "@/app/utils/requestServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// export async function getInfoUser(): Promise<User | { error: string }> {
//     const token = (await cookies()).get("token")?.value;

//     if (!token) {
//         return { error: "No autorizado" }; // Si no hay cookie, devolver error
//     }

//     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-auth`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Cookie": `token=${token}`,
//         },
//         credentials: "include",
//     });

//     const responseData = await res.json();

//     if (!res.ok || !responseData.data?.user) {
//         return { error: responseData.data?.message || "Error en la autenticación" };
//     }

//     return responseData.data.user || null;

// }

export async function getInfoUser(): Promise<{ user: any; token: string } | { error: string }> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
  
    if (!refreshToken) {
      return { error: "No refresh token found" };
    }
  
    // 👇 Hacemos la petición para renovar el accessToken
    const resRefresh = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      credentials: "include",
    });
  
    const refreshData = await resRefresh.json();
  
    if (!resRefresh.ok || !refreshData.data?.token) {
      return { error: "Token refresh failed" };
    }
  
    const token = refreshData.data.token;
  
    // 👇 Ahora usamos ese token para obtener info del usuario
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-auth`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    });
  
    const responseData = await res.json();
  
    if (!res.ok || !responseData.data?.user) {
      return { error: "Error al verificar usuario" };
    }
  
    return {
      user: responseData.data.user,
      token, // ✅ incluimos el token
    };
  }

export async function logoutAction(): Promise<
  { success: boolean } | { error: string }
> {
  const token = (await cookies()).get("refreshToken")?.value;

  if (!token) {
    return { error: "No autorizado" }; // Si no hay cookie, devolver error
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${token}`,
      },
      credentials: "include",
    }
  );

  const responseData = await res.json();
//   console.log("📥 Respuesta del backend:", responseData);
  const cookieStore = await cookies();
  cookieStore.delete("refreshToken");
  return { success: true };
}
