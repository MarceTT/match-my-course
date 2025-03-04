"use server";

import { User } from "@/app/types";
import { cookies } from "next/headers";

export async function getInfoUser(): Promise<User | { error: string }> { 
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-auth`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${token}`,
        },
        credentials: "include",
    });

    const responseData = await res.json();

    if (!res.ok || !responseData.data?.user) {
        return { error: responseData.data?.message || "Error en la autenticación" };
    }

    return responseData.data.user || null;
    
}




export async function logoutAction(): Promise<{ success: boolean } | { error: string }> {

    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return { error: "No autorizado" }; // Si no hay cookie, devolver error
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${token}`,
        },
        credentials: "include",
    });

    const responseData = await res.json();
    console.log("📥 Respuesta del backend:", responseData);
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return { success: true };
}