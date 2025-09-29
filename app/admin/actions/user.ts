"use server";

import { auth } from "@/auth";

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
  const session = await auth();
  const user = (session as any)?.user;
  if (!user?.accessToken) return { error: "No autorizado" };
  return { user, token: user.accessToken };
}

// Nota: el logout se realiza desde el cliente con signOut({ callbackUrl: "/login" })
